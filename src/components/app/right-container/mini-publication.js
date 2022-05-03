import styled from "styled-components";
import { BlockDiv, DefaultSpan } from "..";
import { ThidleThinkTopInfoContainer, ThidleThinkUserPicture, ThidleThinkUserContentMainContainer, ThidleThinkOptionButton, ThidleThinkOptionButtonIcon, ThidleThinkOptionButtonText } from "../thoughts-components"

export default function ThidleThinkMiniPublication(props){
    return (
        <ThidleThinkMainPublicationMiniContainer>
            <ThidleThinkTopInfoContainer>
                <BlockDiv>
                    <ThidleThinkMiniUserPictureContainer>
                        <ThidleThinkUserPicture alt={`${props.name} Profile`} src={props.picture}/>
                    </ThidleThinkMiniUserPictureContainer>
                </BlockDiv>
                <ThidleThinkUserContentMainContainer>
                    <ThidleThinkMiniUserInfoNameContainer>
                        <ThidleThinkMiniUserCompleteInfoContainer>
                            <DefaultSpan>{props.name}</DefaultSpan>
                            <ThidleThinkMiniUserInfoUsername>@{props.username}</ThidleThinkMiniUserInfoUsername>
                        </ThidleThinkMiniUserCompleteInfoContainer>
                    </ThidleThinkMiniUserInfoNameContainer>
                    <BlockDiv>
                        <ThidleThinkMiniContentText>{props.text}</ThidleThinkMiniContentText>
                    </BlockDiv>
                    <ThidleThinkMiniOptionsContainer>
                        <BlockDiv disableUserSelect={true}>
                            <ThidleThinkOptionButton active={props.liked}>
                                <ThidleThinkOptionButtonIcon>favorite</ThidleThinkOptionButtonIcon>
                                <ThidleThinkOptionButtonText>{props.likes}</ThidleThinkOptionButtonText>
                            </ThidleThinkOptionButton>
                            <ThidleThinkOptionButton active={props.reposted}>
                                <ThidleThinkOptionButtonIcon>repeat</ThidleThinkOptionButtonIcon>
                                <ThidleThinkOptionButtonText>{props.reposts}</ThidleThinkOptionButtonText>
                            </ThidleThinkOptionButton>
                            <ThidleThinkOptionButton active={props.commented}>
                                <ThidleThinkOptionButtonIcon>comment</ThidleThinkOptionButtonIcon>
                                <ThidleThinkOptionButtonText>{props.comments}</ThidleThinkOptionButtonText>
                            </ThidleThinkOptionButton>
                        </BlockDiv>
                    </ThidleThinkMiniOptionsContainer>
                </ThidleThinkUserContentMainContainer>
            </ThidleThinkTopInfoContainer>
        </ThidleThinkMainPublicationMiniContainer>
    )
}

const ThidleThinkMainPublicationMiniContainer = styled.div`
    width: 100%;
    padding: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
    position: relative;
    box-sizing: border-box;
    :hover{
        background-color: rgb(255 255 255 / 0.03);
        border-radius: 10px;
    }
    :not(:last-child) {
        margin-bottom: 20px;
    }
    :not(:last-child)::before {
        content: '';
        position: absolute;
        bottom: -10px;
        height: 1px;
        left: 0px;
        width: 100%;
        background-color: #22303e;
        pointer-events: none;
    }
    &${ThidleThinkOptionButtonIcon}{
        font-size: 14px;
    }
`

const ThidleThinkMiniUserPictureContainer = styled.div`
    width: 34px;
    height: 34px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 10px;
`

const ThidleThinkMiniUserInfoNameContainer = styled.div`
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-size: 7.5pt;
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    overflow: hidden;
`

const ThidleThinkMiniUserCompleteInfoContainer = styled.span`
    :hover > span {
        text-decoration: underline;
    }
`

const ThidleThinkMiniUserInfoUsername = styled.span`
    font-weight: 300;
    font-size: 9pt;
    color: rgb(255 255 255 / 20%);
    font-family: 'Ubuntu', sans-serif;
    ::before {
        content: '-';
        padding: 0px 10px;
        display: inline-block;
    }
`

const ThidleThinkMiniContentText = styled.span`
    white-space: pre-wrap;
    font-size: 8pt;
    font-family: 'Ubuntu', sans-serif;
    color: rgb(255 255 255 / 90%);
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
    margin-top: 7px;
`

const ThidleThinkMiniOptionsContainer = styled.div`
    margin-top: 5px;
`