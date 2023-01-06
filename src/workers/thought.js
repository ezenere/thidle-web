import { asyncFor, HTTPRequest } from "./commons";
import { Uploader } from "./upload";

export class ThoughtCreator {
    constructor({text, pictures, video, audio, survey, gif, parent, privacy, commentPrivacy, date}, endCallback, errorCallback){
        this.text = text;
        this.pictures = pictures;
        this.video = video;
        this.audio = audio;
        this.survey = survey;
        this.gif = gif;
        this.parent = parent;
        this.privacy = privacy;
        this.commentPrivacy = commentPrivacy;
        this.date = date;
        this.id = null;

        this.uploadedFiles = []

        this.endCallback = endCallback;
        this.errorCallback = errorCallback;
    }

    create(){
        const _self = this;
        HTTPRequest("POST", "/v0/thought", {
            "text": this.text,
            "privacy": this.privacy,
            "commentPrivacy": this.commentPrivacy,
            "parent": this.parent,
            "embeed": null
        }).then((result) => {
            if(result.status === 201) {
                _self.id = result.data.id;
                _self.upload();
            } else _self.handleError(result);
        });
    }

    upload(){
        console.log('uploading')
        const _self = this;
        asyncFor(this.pictures, function(current, values, index, next){
            const uploader = new Uploader(current);
            uploader.upload(function(id, hash){
                _self.uploadedFiles.push({id, hash})
                next();
            }, function(err){
                _self.handleError(err);
            });
        }, function(){
            _self.finish()
        })
    }

    finish(){
        const _self = this;
        HTTPRequest("PUT", `/v0/thought/${this.id}`).then((result) => {
            console.log(result)
            _self.endCallback();
        });
    }

    handleError(error){
        this.errorCallback(error);
    }
}