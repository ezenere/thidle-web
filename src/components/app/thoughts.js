import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainPostsContainer } from ".";
import { useThoughts } from "../../contexts/thoughts";
import { HTTPRequest, navigateTo, ProfileURL, stopPropagation, thinkDateRead } from "../../workers/commons";

export function Thoughts(props){
    const [thoughts, setThoughts] = useThoughts([]);
    const [thoughtsLoading, setThoughtsLoading] = useState(false);
    const [thoughtsLoaded, setThoughtsLoaded] = useState(false);
    const [thoughtsPage, setThoughtsPage] = useState(0);
    const [thoughtsLocation, setThoughtsLocation] = useState(null);

    // useEffect(() => {
    //     if(thoughtsLocation !== props.location || (!thoughtsLoading && !thoughtsLoaded)){
    //         setThoughts([]);
    //         setThoughtsLoading(true);
    //         setThoughtsLocation(props.location);
    //         setThoughtsPage(thoughtsPage+1);
    //         HTTPRequest('GET',
    //             props.location === 'main' ?
    //             `/v0/thoughts?page=${thoughtsPage}`
    //             :
    //             `/v0/thoughts?user=${props.user}&page=${thoughtsPage}`
    //         ).then(result => {
    //             setThoughts(result.data);
    //             setThoughtsLoading(false);
    //             setThoughtsLoaded(true);
    //         });
    //     }
    // }, [thoughts, props, setThoughts, thoughtsLoading, thoughtsLocation, thoughtsLoaded, thoughtsPage]);

    return (
        <MainPostsContainer>
            {thoughts.map(thought => <Thought key={thought.id} data={thought} />)}
        </MainPostsContainer>
    )
}

export function MainThoughts(props){
    const [thoughts, setThoughts] = useThoughts();
    const [thoughtsLoading, setThoughtsLoading] = useState(false);
    const [thoughtsLoaded, setThoughtsLoaded] = useState(false);
    const [thoughtsPage, setThoughtsPage] = useState(0);
    const [thoughtsInit, setThoughtsInit] = useState(false);

    useEffect(() => {
        if(!thoughtsLoading && !thoughtsLoaded){
            setThoughts([]);
            setThoughtsLoading(true);
            setThoughtsPage(thoughtsPage+1);
            setThoughtsInit(true);
            HTTPRequest('GET', 
                `/v0/thought?page=${thoughtsPage}${!thoughtsInit ? '&init=true' : ''}`
            ).then(result => {
                setThoughts(result.data);
                setThoughtsLoading(false);
                setThoughtsLoaded(true);
            });
        }
    }, [thoughts, setThoughts, thoughtsLoading, thoughtsLoaded, thoughtsPage, thoughtsInit]);

    return (
        <MainPostsContainer>
            {thoughts.map(thought => (<Thought key={thought.id} data={thought} />))}
        </MainPostsContainer>
    )
}

export function Thought({data, isComment, primary, hasContinuation, isSubcomment, isRethink}){
    const [userLiked, setUserLiked] = useState(data.user.like);
    const [likeCount, setLikeCount] = useState(data.count.like);
    const [userLikedLoading, setUserLikedLoading] = useState(false);
    const navigate = useNavigate();
    
    let rethoughtInfo = null;

    if(data.rethought) {
        data = data.embeed;
        rethoughtInfo = data.by;
    }

    const updateLike = (e) => {
        if(!userLikedLoading){
            setUserLikedLoading(true);
            HTTPRequest(!userLiked ? 'POST' : 'DELETE', `/v0/thought/like/${data.id}`).then(result => {
                setUserLikedLoading(false);
                if(result.status.toString().startsWith('2')){
                    setUserLiked(!userLiked);
                    setLikeCount(result.data.count);
                }
            });
        }
    }

    return (
        <div className={`thidle-think-main-publication-container${isComment ? ' comment' : ''}${primary ? ' is-primary-comment' : ''}${hasContinuation ? ' has-continuation' : ''}${isSubcomment ? ' isSubcomment' : ''}`}>
            <div className="thidle-think-primary-content-isolation" onMouseDown={stopPropagation} onClick={(e) => navigateTo(e, navigate, `/think/${data.id}`)}>
                <div className="thidle-think-top-info-container">
                    <div className="thidle-think-user-picture-main-container">
                        <div className="thidle-think-user-picture-container" onMouseDown={stopPropagation} onClick={(e) => navigateTo(e, navigate, `/${data.by.username}`)}>
                            <img className="thidle-think-user-picture" alt={`${data.by.name} Profile`} src={ProfileURL(data.by.picture)}/>
                        </div>
                    </div>
                    <div className="thidle-think-user-info-main-container">
                        <div className="thidle-think-user-info-name-container">
                            <span className="thidle-think-user-complete-info-container" onMouseDown={stopPropagation} onClick={(e) => navigateTo(e, navigate, `/${data.by.username}`)}>
                                <span className="thidle-think-user-info-name">{data.by.name}</span>
                                <span className="thidle-think-user-info-username">@{data.by.username}</span>
                            </span>
                        </div>
                        <div className="thidle-think-info-container">
                            <span className="thidle-think-info-privacy">{{'P':'Public', 'S':'Selected People', 'F':'Friends Only', 'A':'Anonymous'}[data.privacy.main]}</span>
                            <span className="thidle-think-info-date">{thinkDateRead(data.date)}</span>
                        </div>
                    </div>
                    {rethoughtInfo !== null && (
                        <div className="thidle-think-info-reposted-indicator">
                            <span className="thidle-think-info-reposted-indicator-icon material-icons-round">repeat</span>
                            <span>&nbsp;by&nbsp;</span>
                            <span className="thidle-think-info-reposted-indicator-username">{rethoughtInfo.name}</span>
                        </div>
                    )}
                    <div className="thidle-think-options-main-container">
                        <button className="thidle-think-options-button" onMouseDown={stopPropagation}>
                            <span className="thidle-think-options-icon material-icons">more_horiz</span>
                        </button>
                    </div>
                </div>
                <div className="thidle-think-content-container">
                    <div className="thidle-think-content-text">{data.text}</div>
                    {data.images && <ThoughtImages images={data.images}/>}
                    {data.embeed && <Rethink data={data.embeed} />}
                </div>
                {!isRethink ?
                <div className="thidle-think-options-container">
                    {/* <div className="thidle-think-options-right-box" onMouseDown={stopPropagation} onClick={stopPropagation}>
                        <div className={`thidle-think-option-button material-icons${data.user.quoted ? ' active' : ''}`}>
                            <span className="thidle-think-option-button-icon material-icons-round">format_quote</span>
                            <span className="thidle-think-option-button-text">{data.count.quotes}</span>
                        </div>
                        <div className="thidle-think-option-button">
                            <span className="thidle-think-option-button-icon active material-icons">share</span>
                        </div>
                    </div> */}
                    <div className="thidle-think-options-left-box" onMouseDown={stopPropagation} onClick={stopPropagation}>
                        <div className={`thidle-think-option-button material-icons${userLiked ? ' active' : ''}`} >
                            <span className="thidle-think-option-button-icon material-icons-round" style={userLikedLoading ? {pointerEvents: 'none', opacity: '0.5'} : {}} onClick={(e) => updateLike(e)}>favorite</span>
                            <span className="thidle-think-option-button-text">{likeCount}</span>
                        </div>
                        <div className={`thidle-think-option-button material-icons${data.user.rethought ? ' active' : ''}`}>
                            <span className="thidle-think-option-button-icon material-icons-round">repeat</span>
                            <span className="thidle-think-option-button-text">{data.count.rethought}</span>
                        </div>
                        <div className={`thidle-think-option-button material-icons${data.user.comment ? ' active' : ''}`}>
                            <span className="thidle-think-option-button-icon material-icons-round">comment</span>
                            <span className="thidle-think-option-button-text">{data.count.comments}</span>
                        </div>
                    </div>
                </div>
                : ''}
            </div>
            <Comments items={data.comments}/>
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
        <div className="thidle-think-content-image-album-container" onClick={stopPropagation} onMouseDown={stopPropagation}>
            <div className="thidle-think-content-image-album" ref={overflow}>
                {props.images.map((image, index) => {
                    return (
                        <div className="thidle-think-content-image-container" key={index}>
                            <img className="thidle-think-content-image" alt={image.alt} src={`https://thidle.com${image.url}`}/>
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

function Rethink({data}){
    return (
        <div className="thidle-rethink-content-container">
            <Thought data={data} isRethink={true} />
        </div>
    )
}

function Comments({items}){
    return (
        <div className="thidle-think-comments-container">{
            items.map((comment, index) => {
                let needContinuation = items.reduce((f, c, cidx) => (c.primary && cidx > index) || f, false)
                return <Thought 
                    key={comment.id}
                    data={comment}
                    primary={true/*comment.primary // might be used for something like nested comments*/}
                    isComment={true} 
                    hasContinuation={needContinuation}
                />;
            })
        }</div>
    )
}