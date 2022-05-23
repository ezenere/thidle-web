import { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { AdditionalOption, OptionsContainer } from ".";
import { UserContext } from "../../contexts/user";
import { ProfileURL, stopPropagation } from "../../workers/commons";

export default function NewThought(props){
    const userInfo = useContext(UserContext);
    const [active, setActive] = useState(false);
    const textareaReference = useRef();
    const [thoughtText, setThoughtText] = useState("");

    const textareaInput = (e) => {
        setThoughtText(e.target.innerHTML);
    }

    return (
        <Container>
            <TextInputContainer>
                <UserIconContainer>
                    <UserImage alt="Submit New Thought Logged User" src={ProfileURL(userInfo.values.userImage)}/>
                </UserIconContainer>
                <InputContainer onClick={() => textareaReference.current.focus()}>
                    <TextareaBox>
                        <Textarea ref={textareaReference} onInput={textareaInput} onFocus={()=>setActive(true)} onBlur={()=>setActive(false)} contentEditable={true} isActive={active} data-placeholder="Share a Thought..."></Textarea>
                    </TextareaBox>
                </InputContainer>
            </TextInputContainer>
            <OptionsContainer onMouseDown={stopPropagation} onClick={stopPropagation} onMouseUp={stopPropagation} onBlur={stopPropagation} onFocus={stopPropagation}>
                <AdditionalOption noSpacers={true} icon="perm_media" title="Video/Picture"/>
                <AdditionalOption noSpacers={true} icon="graphic_eq" title="Audio"/>
                <AdditionalOption noSpacers={true} icon="poll" title="Survey"/>
                <AdditionalOption noSpacers={true} icon="gif_box" title="GIF"/>
            </OptionsContainer>
            {active ? <FinalOptionsContainer onMouseDown={stopPropagation} onClick={stopPropagation} onMouseUp={stopPropagation} onBlur={stopPropagation} onFocus={stopPropagation}>
                <OptionsContainer style={{backgroundColor: '#1A2830', marginTop: '15px', flex: '1 0 auto'}}>
                    <AdditionalOption style={{padding: '4px'}} activeBackground="#26323A" isActive={true} title="Public"/>
                    <AdditionalOption style={{padding: '4px'}} activeBackground="#26323A" title="Private"/>
                    <AdditionalOption style={{padding: '4px'}} activeBackground="#26323A" title="Friends"/>
                    <AdditionalOption style={{padding: '4px'}} activeBackground="#26323A" title="Anonymous"/>
                </OptionsContainer>
                <SubmitThinkButton>
                    <SubmitThinkButtonText>Share</SubmitThinkButtonText>
                    <SubmitThinkButtonIcon>send</SubmitThinkButtonIcon>
                </SubmitThinkButton>
            </FinalOptionsContainer> : ''}
        </Container>
    )
}


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
`

const TextareaBox = styled.div`
    background-color: #1A2830;
    padding: 10px 15px;
    box-sizing: border-box;
    border-radius: 16px;
    cursor: text;
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

