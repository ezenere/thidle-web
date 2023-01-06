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

    constructor(file){
        this.file = file.file;
        this.total = this.file.size;
    }

    upload(endCallback, errorCallback){
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
                _self.stream();
            } else _self.handleError(result.errno, result.error);
        });
    }

    stream(){
        let _self = this;
        console.log('stream')

        const fd = new FormData();
        fd.append('chunk', this.file.slice(this.sent, this.sent+this.chunkLength));
        HTTPRequest("POST", `/v0/upload/${this.key}`, fd).then((result) => {
            if(result.success){
                _self.sent += _self.chunkLength;

                if(_self.sent < _self.total){
                    _self.upload.progress = _self.sent;
                    _self.stream();
                } else {
                    _self.sent = _self.total;
                    _self.finish();
                }
            } else {
                _self.errors++;
                if(_self.errors < 5){
                    console.log("There was an error while uploading part file");
                    _self.errors++;
                    _self.stream();
                } else {
                    console.log("There was an error uploading the file!");
                    if(typeof _self.errorCallbackHolder == "function") _self.errorCallbackHolder();
                }
            }
        })
    }

    handleError(errno, error){
        this.errorCallbackHolder(errno, error);
    }

    finish(){
        const _self = this;
        HTTPRequest("PUT", `/v0/upload/${this.key}`).then((result) => {
            if(result.success){
                if(typeof _self.endCallbackHolder == "function") _self.endCallbackHolder();
            } else _self.handleError(result.errno, result.error);
        });
    }
}