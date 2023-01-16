import { HTTPRequest } from "./commons";

export class Uploader{
    file = null;
    total = 0;
    sent = 0;
    key = null;
    endCallbackHolder = null;
    errorCallbackHolder = null;
    errors = 0;
    chunkLength = 10485760;
    resolve = null;
    reject = null;
    putPath = '';
    putData = null;

    constructor(file, path = '', data = null){
        this.file = file.file || file;
        this.total = this.file.size;
        this.putData = data;
        this.putPath = path;
    }

    async upload(endCallback, errorCallback){
        console.log(this.file)
        const _self = this;

        this.endCallbackHolder = endCallback;
        this.errorCallbackHolder = errorCallback;

        HTTPRequest("POST", "/v0/upload", {
            "name": this.file.name,
            "type": this.file.type,
            "size": this.file.size,
        }).then((result) => {
            if(result.success){
                _self.key = result.data.key;
                _self._stream();
            } else _self._handleError(result.errno, result.error);
        });

        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }

    _stream(){
        const fd = new FormData();
        fd.append('chunk', this.file.slice(this.sent, this.sent+this.chunkLength));
        HTTPRequest("POST", `/v0/upload/${this.key}`, fd).then((result) => {
            if(result.success){
                this.sent += this.chunkLength;

                if(this.sent < this.total){
                    this.upload.progress = this.sent;
                    this._stream();
                } else {
                    this.sent = this.total;
                    this._finish();
                }
            } else {
                this.errors++;
                if(this.errors < 5){
                    console.log("There was an error while uploading part file");
                    this.errors++;
                    this._stream();
                } else {
                    this._handleError("ERR_UP", "There was an error uploading the file!");
                    this.reject();
                }
            }
        })
    }

    _handleError(errno, error){
        if(typeof this.errorCallbackHolder === 'function') this.errorCallbackHolder(errno, error);
        this.reject(errno, error);
    }

    _finish(){
        HTTPRequest("PUT", `/v0/upload/${this.key}${this.putPath ? `/${this.putPath}` : ''}`, this.putData).then((result) => {
            if(result.success){
                if(typeof this.endCallbackHolder == "function") this.endCallbackHolder(result.data);
                this.resolve(result.data);
            } else this._handleError(result.errno, result.error);
        });
    }
}