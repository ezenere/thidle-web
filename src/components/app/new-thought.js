import { useContext } from "react";
import styled from "styled-components";
import { AdditionalOption, OptionsContainer } from ".";
import { UserContext } from "../../contexts/user";

export default function NewThought(props){
    const userInfo = useContext(UserContext);

    return (
        <Container>
            <TextInputContainer>
                <UserIconContainer>
                    <UserImage alt="Submit New Thought Logged User" src={userInfo.values.profile}/>
                </UserIconContainer>
                <InputContainer>
                    <TextareaBox>
                        <Textarea contentEditable={true} data-placeholder="Share a Thought..."></Textarea>
                    </TextareaBox>
                </InputContainer>
            </TextInputContainer>
            <OptionsContainer>
                <AdditionalOption icon="perm_media" title="Video/Picture"/>
                <AdditionalOption icon="graphic_eq" title="Audio"/>
                <AdditionalOption icon="poll" title="Survey"/>
                <AdditionalOption icon="gif_box" title="GIF"/>
            </OptionsContainer>
        </Container>
    )
}





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
    height: 13px;
    :empty::before {
        content: attr(data-placeholder);
        color: #535E64;
    }
`

