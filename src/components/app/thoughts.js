import { useEffect, useRef, useState } from "react";

export function Thought(props){
    return (
        <div className={`thidle-think-main-publication-container${props.isComment ? ' comment' : ''}${props.primary ? ' is-primary-comment' : ''}${props.hasContinuation ? ' has-continuation' : ''}${props.isSubcomment ? ' isSubcomment' : ''}`}>
            <div className="thidle-think-primary-content-isolation">
                <div className="thidle-think-top-info-container">
                    <div className="thidle-think-user-picture-main-container">
                        <div className="thidle-think-user-picture-container">
                            <img className="thidle-think-user-picture" alt={`${props.name} Profile`} src={props.picture}/>
                        </div>
                    </div>
                    <div className="thidle-think-user-info-main-container">
                        <div className="thidle-think-user-info-name-container">
                            <span className="thidle-think-user-complete-info-container">
                                <span className="thidle-think-user-info-name">Barbaa</span>
                                <span className="thidle-think-user-info-username">@barbosa</span>
                            </span>
                        </div>
                        <div className="thidle-think-info-container">
                            <span className="thidle-think-info-privacy">{['Public', 'Selected People', 'Friends Only', 'Anonymous'][props.privacy]}</span>
                            <span className="thidle-think-info-date">{props.date}</span>
                        </div>
                    </div>
                    <div className="thidle-think-options-main-container">
                        <button className="thidle-think-options-button">
                            <span className="thidle-think-options-icon material-icons">more_horiz</span>
                        </button>
                    </div>
                </div>
                <div className="thidle-think-content-container">
                    <div className="thidle-think-content-text">{props.text}</div>
                    {props.images?.length > 0 ? <ThoughtImages images={props.images}/> : ''}
                    {props.hasRethink ? <Rethink {...props} /> : ''}
                </div>
                {!props.isRethink ?
                <div className="thidle-think-options-container">
                    <div className="thidle-think-options-right-box">
                        <div className="thidle-think-option-button">
                            <span className="thidle-think-option-button-icon active material-icons">share</span>
                        </div>
                    </div>
                    <div className="thidle-think-options-left-box">
                        <div className={`thidle-think-option-button material-icons${props.liked ? ' active' : ''}`}>
                            <span className="thidle-think-option-button-icon material-icons-round">favorite</span>
                            <span className="thidle-think-option-button-text">{props.likes}</span>
                        </div>
                        <div className={`thidle-think-option-button material-icons${props.reposted ? ' active' : ''}`}>
                            <span className="thidle-think-option-button-icon material-icons-round">repeat</span>
                            <span className="thidle-think-option-button-text">{props.reposts}</span>
                        </div>
                        <div className={`thidle-think-option-button material-icons${props.commented ? ' active' : ''}`}>
                            <span className="thidle-think-option-button-icon material-icons-round">comment</span>
                            <span className="thidle-think-option-button-text">{props.comments}</span>
                        </div>
                    </div>
                </div>
                : ''}
            </div>
            <Comments {...props}/>
        </div>
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

    for(let c = 0; c < props.images.length; c++) props.images[c].active = c === currentImage;

    return(
        <div className="thidle-think-content-image-album-container">
            <div className="thidle-think-content-image-album" ref={overflow}>
                {props.images.map((image, index) => {
                    return (
                        <div className="thidle-think-content-image-container" key={index}>
                            <img className="thidle-think-content-image" alt={image.alt} src={image.url}/>
                        </div>
                    )
                })}
            </div>
            <div className="thidle-think-content-image-album-options-container">
                {props.images.length > 1 && (props.images.length-1) > currentImage ? <div className="thidle-think-content-image-album-next material-icons-round" onClick={() => changeImage(1)}/> : ''}
                {props.images.length > 1 && currentImage > 0 ?  <div className="thidle-think-content-image-album-previous material-icons-round" onClick={() => changeImage(-1)}/> : ''}
                <div className="thidle-think-content-image-album-image-selectors">
                    {props.images.map((image, index) => {
                        return <i className={`thidle-think-content-image-album-image-selector${image.active ? ' active' : ''}`} onClick={() => changeImage(index, true)} key={index}/>
                    })}
                </div>
            </div>
        </div>
    )
}

function Rethink(props){
    return (
        <div className="thidle-rethink-content-container">
            <Thought {...props.rethink} isRethink={true} />
        </div>
    )
}

function Comments(props){
    return (
        <div className="thidle-think-comments-container">{
            (props.commentItems ?? []).map((comment, index) => {
                let needContinuation = props.commentItems.reduce((f, c, cidx) => (c.primary && cidx > index) || f, false)
                return <Thought key={index} {...comment} isComment={true} hasContinuation={needContinuation}/>;
            })
        }</div>
    )
}