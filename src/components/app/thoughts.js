import { useEffect, useRef, useState } from "react";
import { BlockDiv, DefaultSpan } from ".";
import { 
    ThidleThinkMainPublicationContainer, 
    ThidleThinkPrimaryContentIsolation, 
    ThidleThinkTopInfoContainer, 
    ThidleThinkUserPictureMainContainer, 
    ThidleThinkUserPictureContainer, 
    ThidleThinkUserInfoNameContainer, 
    ThidleThinkUserInfoMainContainer, 
    ThidleThinkUserCompleteInfoContainer,
    ThidleThinkInfoContainer,
    ThidleThinkInfoPrivacy,
    ThidleThinkInfoDate,
    ThidleThinkOptionsMainContainer,
    ThidleThinkOptionsButton,
    ThidleThinkContentContainer,
    ThidleThinkContentText,
    ThidleThinkOptionsContainer,
    ThidleThinkOptionsRightBox,
    ThidleThinkOptionsIcon,
    ThidleThinkOptionButton,
    ThidleThinkOptionButtonIcon,
    ThidleThinkOptionButtonText,
    ThidleThinkUserPicture,
    ThidleThinkUserInfoUsername,
    ThidleThinkContentImageAlbumContainer,
    ThidleThinkContentImageAlbum,
    ThidleThinkContentImage,
    ThidleThinkContentImageAlbumPrevious,
    ThidleThinkContentImageAlbumNext,
    ThidleThinkContentImageContainer,
    ThidleThinkContentImageAlbumOptionsContainer,
    ThidleThinkContentImageAlbumImageSelectors,
    ThidleThinkContentImageAlbumImageSelector
} from "./thoughts-components";

export function Thought(props){
    return (
        <ThidleThinkMainPublicationContainer>
            <ThidleThinkPrimaryContentIsolation>
                <ThidleThinkTopInfoContainer>
                    <ThidleThinkUserPictureMainContainer>
                        <ThidleThinkUserPictureContainer>
                            <ThidleThinkUserPicture alt={`${props.name} Profile`} src={props.picture}/>
                        </ThidleThinkUserPictureContainer>
                    </ThidleThinkUserPictureMainContainer>
                    <ThidleThinkUserInfoMainContainer>
                        <ThidleThinkUserInfoNameContainer>
                            <ThidleThinkUserCompleteInfoContainer>
                                <DefaultSpan>{props.name}</DefaultSpan>
                                <ThidleThinkUserInfoUsername>@{props.username}</ThidleThinkUserInfoUsername>
                            </ThidleThinkUserCompleteInfoContainer>
                        </ThidleThinkUserInfoNameContainer>
                        <ThidleThinkInfoContainer>
                            <ThidleThinkInfoPrivacy>{['Public', 'Selected People', 'Friends Only', 'Anonymous'][props.privacy]}</ThidleThinkInfoPrivacy>
                            <ThidleThinkInfoDate>{props.date}</ThidleThinkInfoDate>
                        </ThidleThinkInfoContainer>
                    </ThidleThinkUserInfoMainContainer>
                    <ThidleThinkOptionsMainContainer>
                        <ThidleThinkOptionsButton>
                            <ThidleThinkOptionsIcon>more_horiz</ThidleThinkOptionsIcon>
                        </ThidleThinkOptionsButton>
                    </ThidleThinkOptionsMainContainer>
                </ThidleThinkTopInfoContainer>
                <ThidleThinkContentContainer>
                    <ThidleThinkContentText>{props.text}</ThidleThinkContentText>
                    {props.images?.length > 0 ? <ThoughtImages images={props.images}/> : ''}
                </ThidleThinkContentContainer>
                <ThidleThinkOptionsContainer>
                    <ThidleThinkOptionsRightBox>
                        <ThidleThinkOptionButton>
                            <ThidleThinkOptionButtonIcon>share</ThidleThinkOptionButtonIcon>
                        </ThidleThinkOptionButton>
                    </ThidleThinkOptionsRightBox>
                    <BlockDiv>
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
                </ThidleThinkOptionsContainer>
            </ThidleThinkPrimaryContentIsolation>
        </ThidleThinkMainPublicationContainer>
    )
}


function ThoughtImages(props){
    const [currentImage, setCurrentImage] = useState(0);
    const [overflowLeft, setOverflowLeft] = useState({old: 0, current: 0});
    const overflow = useRef();
    
    function SetPosition(left){
        setOverflowLeft({...overflowLeft, current: left});
    }

    useEffect(() => {
        if(overflowLeft.old !== overflowLeft.current){
            overflow.current.scrollTo({top: 0, left: overflowLeft.current, behavior: 'smooth'});
            setOverflowLeft({...overflowLeft, old: overflowLeft.current})
        }
    }, [overflowLeft])

    const changeImage = (set, item = false) => {
        let newPos = item ? set : (currentImage + set);
        if(newPos >= 0 && newPos <= (props.images.length-1)){
            setCurrentImage(newPos);
            SetPosition(newPos * overflow.current.offsetWidth);
        } 
    }

    for(let c = 0; c < props.images.length; c++) props.images[c].active = c == currentImage;

    return(
        <ThidleThinkContentImageAlbumContainer>
            <ThidleThinkContentImageAlbum ref={overflow}>
                {props.images.map((image, index) => {
                    return (
                        <ThidleThinkContentImageContainer key={index}>
                            <ThidleThinkContentImage alt={image.alt} src={image.url}/>
                        </ThidleThinkContentImageContainer>
                    )
                })}
            </ThidleThinkContentImageAlbum>
            <ThidleThinkContentImageAlbumOptionsContainer>
                {props.images.length > 1 && (props.images.length-1) > currentImage ? <ThidleThinkContentImageAlbumNext onClick={() => changeImage(1)}/> : ''}
                {props.images.length > 1 && currentImage > 0 ? <ThidleThinkContentImageAlbumPrevious onClick={() => changeImage(-1)}/> : ''}
                <ThidleThinkContentImageAlbumImageSelectors>
                    {props.images.map((image, index) => {
                        return <ThidleThinkContentImageAlbumImageSelector onClick={() => changeImage(index, true)} key={image.id} active={image.active}/>
                    })}
                </ThidleThinkContentImageAlbumImageSelectors>
            </ThidleThinkContentImageAlbumOptionsContainer>
        </ThidleThinkContentImageAlbumContainer>
    )
}