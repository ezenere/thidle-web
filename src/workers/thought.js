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

        this.uploadedFiles = []

        this.endCallback = endCallback;
        this.errorCallback = errorCallback;
    }

    create(){
        const _self = this;
        HTTPRequest("POST", "/api/v0/action/create/thought/initialize").then((result) => {
            if(result.success) _self.upload();
            else _self.handleError(result);
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
        HTTPRequest("POST", "/api/v0/action/create/thought/finish", {
            text: this.text,
            audio: this.audio,
            survey: this.survey,
            gif: this.gif,
            parent: this.parent,
            privacy: this.privacy,
            commentPrivacy: this.commentPrivacy,
            date: this.date,
        }).then((result) => {
            console.log(result)
            _self.endCallback();
        });
    }

    handleError(error){
        this.errorCallback(error);
    }
}