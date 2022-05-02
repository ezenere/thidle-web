import styled from "styled-components";
import { BlockDiv, ThidleThinkUserContentMainContainer, ThidleThinkTopInfoContainer } from ".";

export default function ThidleThinkMiniPublication(props){
    return (
        <ThidleThinkMainPublicationMiniContainer>
            <ThidleThinkTopInfoContainer>
                <BlockDiv>
                    <ThidleThinkMiniUserPictureContainer>
                        <ThidleThinkUserPicture alt="Thidle Think User Picture" src="https://scontent.fbfh17-1.fna.fbcdn.net/v/t1.6435-1/p200x200/138376100_3685230564906254_4045498374643321894_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=7206a8&_nc_ohc=XDopRUXu_dsAX_TidYf&_nc_ht=scontent.fbfh17-1.fna&oh=0e9b24ee97e7fd7ffa47f7713b121ef0&oe=61CAAF6B"/>
                    </ThidleThinkMiniUserPictureContainer>
                </BlockDiv>
                <ThidleThinkUserContentMainContainer>
                    <div class="thidle-think-mini-user-info-name-container">
                        <span class="thidle-think-mini-user-complete-info-container"><span class="thidle-think-mini-user-info-name">Guilherme Scroccaro</span><span class="thidle-think-mini-user-info-username">@guilherme</span></span>
                    </div>
                    <div class="thidle-think-mini-content-container">
                        <div class="thidle-think-mini-content-text">tive uma ideia muito boa</div>
                    </div>
                    <div class="thidle-think-mini-options-container">
                        <div class="thidle-think-options-left-box">
                            <div class="thidle-think-option-button active">
                                <span class="thidle-think-option-button-icon material-icons">favorite</span>
                                <span class="thidle-think-option-button-text">15K</span>
                            </div>
                            <div class="thidle-think-option-button">
                                <span class="thidle-think-option-button-icon material-icons">repeat</span>
                                <span class="thidle-think-option-button-text">5K</span>
                            </div>
                            <div class="thidle-think-option-button">
                                <span class="thidle-think-option-button-icon material-icons">comment</span>
                                <span class="thidle-think-option-button-text">561</span>
                            </div>
                        </div>
                    </div>
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
`

const ThidleThinkMiniUserPictureContainer = styled.div`
    width: 34px;
    height: 34px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 10px;
`