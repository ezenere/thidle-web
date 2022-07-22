import { HTTPRequest } from "./commons";

export class Uploader{
    file = null;
    total = 0;
    sent = 0;
    id = null;
    hash = null;
    endCallbackHolder = null;
    errorCallbackHolder = null;
    errors = 0;
    chunkLength = 10485760;

    constructor(file){
        this.file = file.file;
        this.total = this.file.size;
    }

    upload(endCallback, errorCallback){
        const _self = this;

        this.endCallbackHolder = endCallback;
        this.errorCallbackHolder = errorCallback;

        HTTPRequest("POST", "/api/v0/upload/start", {
            "name": this.file.name
        }).then((result) => {
            if(result.success){
                _self.id = result.id;
                _self.hash = result.hash;
                _self.stream();
            } else _self.handleError(result.errno, result.error);
        });
    }

    stream(){
        let _self = this;
        console.log('stream')

        HTTPRequest("POST", "/api/v0/upload/upload", {
            id: _self.id,
            hash: _self.hash,
            file: this.file.slice(this.sent, this.sent+this.chunkLength)
        }).then((result) => {
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
        HTTPRequest("POST", "/api/v0/upload/finish", {
            id: _self.id,
            hash: _self.hash
        }).then((result) => {
            if(result.success){
                if(typeof _self.endCallbackHolder == "function") _self.endCallbackHolder();
            } else _self.handleError(result.errno, result.error);
        });
    }
}