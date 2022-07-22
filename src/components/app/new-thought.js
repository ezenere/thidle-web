import { useContext, useReducer, useRef, useState } from "react";
import styled from "styled-components";
import { AdditionalOption, OptionsContainer } from ".";
import { useModals } from "../../contexts/modals";
import { UserContext } from "../../contexts/user";
import { ProfileURL, stopPropagation } from "../../workers/commons";
import { ThoughtCreator } from "../../workers/thought";


function fileReducer(state, action){
    if(action.do === 'add') {
        const id = state.currentId;
        return {
            currentId: state.currentId+1, 
            files: [...state.files, {...action.file, id }] 
        };
    } else if(action.do === 'remove'){
        return {
            currentId: state.currentId,
            files: state.files.filter((i) => i.id !== action.id)
        }
    }
}

export default function NewThought(props){
    const modals = useModals();
    const userInfo = useContext(UserContext);
    const [active, setActive] = useState(false);
    const textareaReference = useRef();
    const [thoughtText, setThoughtText] = useState("");
    const [{files}, setFiles] = useReducer(fileReducer, {currentId: 0, files: []});
    const fileInputRef = useRef();
    const [privacy, setPrivacy] = useState("P");
    const [completePercentage, setCompletePercentage] = useState(0);
    const [posting, setPosting] = useState(false);

    const textareaInput = (e) => {
        setThoughtText(e.target.innerHTML);
    }

    const onFileChange = (e) => {
        if(e.target.files.length + files.length > 10) modals.open('alert', {title: 'Maximo de Imagens', text: 'Máximo de 10 imagens.'});
        else {
            for(const file of e.target.files){
                const fr = new FileReader();
                fr.readAsArrayBuffer(file);
                fr.onload = function() {
                    // you can keep blob or save blob to another position
                    const blob = new Blob([fr.result])

                    // url for download
                    const url = URL.createObjectURL(blob, {type: file.type});
                    setFiles({
                        do: 'add',
                        file: {file, url, fileReader: fr}
                    })
                }
            }
        }
    }

    const openFileModal = () => {
        if(files.length < 10) fileInputRef.current.click();
        else modals.open('alert', {title: 'Maximo de Imagens', text: 'Máximo de 10 imagens.'});
    }

    const sendNewThought = (e) => {
        var date = new Date();

        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        const creator = new ThoughtCreator({
            text: thoughtText, 
            pictures: files, 
            video: '', 
            audio: '', 
            survey: '', 
            gif: '', 
            parent: 0, 
            privacy: privacy, 
            commentPrivacy: 'P', 
            date: year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
        }, function(){
            console.log('ok');
            setPosting(false);
            setThoughtText("");
            setFiles([]);
            setPrivacy("P");
            textareaReference.current.blur();
        }, function(err){
            console.log(err);
            setPosting(false);
        });
        creator.create();

        setPosting(true);
    }

    return (
        <Container>
            {posting && <SendingPostProgressContainer>
                <SendingPostProgress/>
            </SendingPostProgressContainer>}
            <div style={posting ? {opacity: 0.5, pointerEvents: 'none'} : {}}>
                <TextInputContainer>
                    <UserIconContainer>
                        <UserImage alt="Submit New Thought Logged User" src={ProfileURL(userInfo.values.userImage)}/>
                    </UserIconContainer>
                    <InputContainer onClick={() => textareaReference.current.focus()}>
                        <TextareaBox>
                            <Textarea ref={textareaReference} onInput={textareaInput} onFocus={()=>setActive(true)} onBlur={()=>setActive(false)} contentEditable={true} isActive={active} data-placeholder="Share a Thought..."></Textarea>
                        </TextareaBox>
                        {(active || files.length > 0) && <NewThinkImagesContainer onMouseDown={stopPropagation} onClick={stopPropagation} onMouseUp={stopPropagation} onBlur={stopPropagation} onFocus={stopPropagation}>
                            {files.map((i) => <NewThoughtImage removeAction={() => { setFiles({do: 'remove', id: i.id}) }} key={i.id} src={i.url}/>)}
                        </NewThinkImagesContainer>}
                    </InputContainer>
                </TextInputContainer>
                <OptionsContainer onMouseDown={stopPropagation} onClick={stopPropagation} onMouseUp={stopPropagation} onBlur={stopPropagation} onFocus={stopPropagation}>
                    <AdditionalOption onClick={openFileModal} noSpacers={true} icon="perm_media" title="Video/Picture"/>
                    <AdditionalOption noSpacers={true} icon="graphic_eq" title="Audio"/>
                    <AdditionalOption noSpacers={true} icon="poll" title="Survey"/>
                    <AdditionalOption noSpacers={true} icon="gif_box" title="GIF"/>
                </OptionsContainer>
                {(active || files.length > 0) ? <FinalOptionsContainer onMouseDown={stopPropagation} onClick={stopPropagation} onMouseUp={stopPropagation} onBlur={stopPropagation} onFocus={stopPropagation}>
                    <OptionsContainer style={{backgroundColor: '#1A2830', marginTop: '15px', flex: '1 0 auto'}}>
                        <AdditionalOption style={{padding: '4px'}} activeBackground="#26323A" isActive={"P" === privacy} onClick={() => setPrivacy("P")} title="Public"/>
                        <AdditionalOption style={{padding: '4px'}} activeBackground="#26323A" isActive={"F" === privacy} onClick={() => setPrivacy("F")} title="Friends"/>
                        <AdditionalOption style={{padding: '4px'}} activeBackground="#26323A" isActive={"S" === privacy} onClick={() => setPrivacy("S")} title="Selected People"/>
                        <AdditionalOption style={{padding: '4px'}} activeBackground="#26323A" isActive={"A" === privacy} onClick={() => setPrivacy("A")} title="Anonymous"/>
                    </OptionsContainer>
                    <SubmitThinkButton onClick={sendNewThought}>
                        <SubmitThinkButtonText>Share</SubmitThinkButtonText>
                        <SubmitThinkButtonIcon>send</SubmitThinkButtonIcon>
                    </SubmitThinkButton>
                </FinalOptionsContainer> : ''}
                <input ref={fileInputRef} multiple={true} onChange={onFileChange} style={{display:"none"}} type="file" accept="image/png,image/jpeg,image/gif,video/mp4,video/mpeg,video/webm"/>
            </div>
        </Container>
    )
}

function NewThoughtImage({src, removeAction}){
    return (
        <NewThinkImageItem>
            <NewThinkImage src={src}/>
            <NewThinkImageRemoveIcon onClick={removeAction}>close</NewThinkImageRemoveIcon>
        </NewThinkImageItem>
    )
}

const SendingPostProgressContainer = styled.div`
    width: 100%;
    height: 5px;
    background-color: rgba(255,255,255,0.2);
`
const SendingPostProgress = styled.div`
    height: 100%;
    background-color: #C55A11;
`

const NewThinkImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
`

const NewThinkImageRemoveIcon = styled.div.attrs({
    className: 'material-icons-round'
})`
    padding: 2px;
    font-size: 13px;
    width: 17px;
    height: 17px;
    position: absolute;
    top: 3px;
    right: 3px;
    border-radius: 50%;
    cursor: pointer;
    background-color: rgba(255,255,255,0.75);
    box-sizing: border-box;
    text-align: center;
    opacity: 0;
    color: rgba(0,0,0,0.5);
    transition: opacity 0.2s;
    :hover{
        opacity: 1;
    }
`

const NewThinkImagesContainer = styled.div`
    :not(:empty){
        background-color: rgba(255,255,255,0.1);
        width: 100%;
        padding: 10px;
        font-size: 0px;
        white-space: nowrap;
        cursor: default;
        overflow: auto;
        box-sizing: border-box;
    }
`

const NewThinkImageItem = styled.div`
    height: 75px;
    width: 75px;
    border: 1px solid #22303E;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    background-color: rgba(255,255,255,0.1);
    display: inline-block;
    :not(:first-child){
        margin-left: 10px;
    }
    &:hover ${NewThinkImageRemoveIcon}{
        opacity: 0.5;
    }
    & ${NewThinkImageRemoveIcon}:hover{
        opacity: 1;
    }
`

const FinalOptionsContainer = styled.div`
    display: flex;
`
const SubmitThinkButtonText = styled.span`
    vertical-align: middle;
    margin-right: 10px;
    font-size: 11px;
    font-family: 'Montserrat';
    font-weight: 100;
`
const SubmitThinkButtonIcon = styled.span.attrs({
    className: 'material-icons-round'
})`
    font-size: 20px;
    vertical-align: middle;
`
const SubmitThinkButton = styled.div`
    flex: 0 1 auto;
    background-color: #C55A11;
    text-align: center;
    padding: 6px 10px;
    vertical-align: middle;
    height: 18px;
    margin-top: 15px;
    margin-left: 30px;
    color: white;
    border-radius: 5px;
    cursor: pointer;
`


const Container = styled.div`
    width: 100%;
    box-sizing: border-box;
    background-color: #0E1C25;
    padding: 15px;
    border-radius: 15px;
    font-size: 0px;
`

const TextInputContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: flex-start;
    align-items: flex-start;
`

const UserIconContainer = styled.div`
    width: 33px;
    border-radius: 50%;
    overflow: hidden;
    height: 33px;
    margin-right: 10px;
    padding: 0px;
    flex: 1 0 auto;
    box-sizing: border-box;
    border: 1px solid white;
    user-select: none;
`

const UserImage = styled.img`
    width: 100%;
    height: 100%;
`

const InputContainer = styled.div`
    width: 100%;
    flex: 1 1 auto;
    box-sizing: border-box;
    cursor: text;
    border-radius: 16px;
    overflow: hidden;
`

const TextareaBox = styled.div`
    background-color: #1A2830;
    padding: 10px 15px;
`

const Textarea = styled.div`
    font-size: 9pt;
    font-family: 'Ubuntu', sans-serif;
    font-weight: 400;
    color: white;
    outline: 0;
    height: ${props => props.isActive ? '5em' : '1em'};
    overflow: ${props => props.isActive ? 'auto' : 'hidden'};
    :empty::before {
        content: attr(data-placeholder);
        color: #535E64;
    }
`

