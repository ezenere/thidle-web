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
        HTTPRequest("POST", "/v0/thought", {
            "text": this.text,
            "privacy": this.privacy,
            "commentPrivacy": this.commentPrivacy,
            "parent": this.parent,
            "embeed": null
        }).then((result) => {
            if(result.status === 201) {
                this.id = result.data.id;
                this.upload();
            } else this.handleError(result);
        });
    }

    upload(){
        console.log('uploading')
        asyncFor(this.pictures, (current, values, index, next) => {
            const uploader = new Uploader(current, 'thought', { id: this.id });
            uploader.upload((id, hash) => {
                this.uploadedFiles.push({id, hash})
                next();
            }, (err) => {
                this.handleError(err);
            });
        }, () => {
            this.finish()
        })
    }

    finish(){
        HTTPRequest("PUT", `/v0/thought/${this.id}`).then((result) => {
            console.log(result)
            this.endCallback(result);
        });
    }

    handleError(error){
        this.errorCallback(error);
    }
}