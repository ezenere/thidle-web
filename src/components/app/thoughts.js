import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainPostsContainer } from ".";
import { useThoughts } from "../../contexts/thoughts";
import { HTTPRequest, navigateTo, ProfileURL, stopPropagation, thinkDateRead } from "../../workers/commons";

export function Thoughts(props){
    const [thoughts, setThoughts] = useThoughts();
    const [thoughtsLoading, setThoughtsLoading] = useState(false);
    const [thoughtsLoaded, setThoughtsLoaded] = useState(false);
    const [thoughtsPage, setThoughtsPage] = useState(0);
    const [thoughtsLocation, setThoughtsLocation] = useState(null);

    useEffect(() => {
        if(thoughtsLocation !== props.location || (!thoughtsLoading && !thoughtsLoaded)){
            setThoughts([]);
            setThoughtsLoading(true);
            setThoughtsLocation(props.location);
            setThoughtsPage(thoughtsPage+1);
            HTTPRequest('GET',
                props.location === 'main' ?
                `/api/v0/thidle/thoughts?page=${thoughtsPage}`
                :
                `/api/v0/profile/thoughts?user=${props.user}&page=${thoughtsPage}`
            ).then(result => {
                setThoughts(result.data);
                setThoughtsLoading(false);
                setThoughtsLoaded(true);
            });
        }
    }, [thoughts, props, setThoughts, thoughtsLoading, thoughtsLocation, thoughtsLoaded, thoughtsPage]);

    return (
        <MainPostsContainer>
            {thoughts.map(thought => {
                return (
                    <Thought 
                        key={thought.id}
                        id={thought.id}
                        name={thought.name}
                        parent={thought.parent}
                        picture={ProfileURL(thought.profilePicture)}
                        username={thought.username}
                        privacy={thought.privacy}
                        date={thought.date}
                        text={thought.text}
                        liked={parseInt(thought.liked) === 1}
                        likes={thought.likeCount}
                        rethoughtName={thought.rethoughtName}
                        rethoughtUsername={thought.rethoughtUsername}
                        reposted={parseInt(thought.reposted) === 1}
                        reposts={thought.shareCount}
                        commented={parseInt(thought.commented) === 1}
                        comments={thought.commentCount}
                        quoted={parseInt(thought.quoted) === 1}
                        quotes={thought.quoteCount}
                        hasRethink={!(parseInt(thought.hasMention) === 0)}
                        rethink={thought.mention}
                        images={thought.images}
                        commentItems={thought.comments}
                    />
                );
            })}
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
                `/api/v0/thidle/thought/main?page=${thoughtsPage}${!thoughtsInit ? '&init=true' : ''}`
            ).then(result => {
                setThoughts(result.data);
                setThoughtsLoading(false);
                setThoughtsLoaded(true);
            });
        }
    }, [thoughts, setThoughts, thoughtsLoading, thoughtsLoaded, thoughtsPage, thoughtsInit]);

    return (
        <MainPostsContainer>
            {thoughts.map(thought => {
                return (
                    <Thought 
                        key={thought.id}
                        id={thought.id}
                        name={thought.name}
                        parent={thought.parent}
                        picture={ProfileURL(thought.profilePicture)}
                        username={thought.username}
                        privacy={thought.privacy}
                        date={thought.date}
                        text={thought.text}
                        liked={parseInt(thought.liked) === 1}
                        likes={thought.likeCount}
                        rethoughtName={thought.rethoughtName}
                        rethoughtUsername={thought.rethoughtUsername}
                        reposted={parseInt(thought.reposted) === 1}
                        reposts={thought.shareCount}
                        commented={parseInt(thought.commented) === 1}
                        comments={thought.commentCount}
                        quoted={parseInt(thought.quoted) === 1}
                        quotes={thought.quoteCount}
                        hasRethink={!(parseInt(thought.hasMention) === 0)}
                        rethink={thought.mention}
                        images={thought.images}
                        commentItems={thought.comments}
                    />
                );
            })}
        </MainPostsContainer>
    )
}

export function Thought(props){
    const [userLiked, setUserLiked] = useState(props.liked);
    const [likeCount, setLikeCount] = useState(props.likes);
    const [userLikedLoading, setUserLikedLoading] = useState(false);
    const navigate = useNavigate();

    const updateLike = (e) => {
        if(!userLikedLoading){
            setUserLikedLoading(true);
            HTTPRequest('POST', `/api/v0/thidle/thought/like`, {id: props.id, status: !userLiked ? '1' : '0'}).then(result => {
                setUserLikedLoading(false);
                if(result.success){
                    setUserLiked(!userLiked);
                    setLikeCount(result.data.count);
                }
            });
        }
    }

    return (
        <div className={`thidle-think-main-publication-container${props.isComment ? ' comment' : ''}${props.primary ? ' is-primary-comment' : ''}${props.hasContinuation ? ' has-continuation' : ''}${props.isSubcomment ? ' isSubcomment' : ''}`}>
            <div className="thidle-think-primary-content-isolation" onMouseDown={stopPropagation} onClick={(e) => navigateTo(e, navigate, `/think/${props.id}`)}>
                <div className="thidle-think-top-info-container">
                    <div className="thidle-think-user-picture-main-container">
                        <div className="thidle-think-user-picture-container" onMouseDown={stopPropagation} onClick={(e) => navigateTo(e, navigate, `/${props.username}`)}>
                            <img className="thidle-think-user-picture" alt={`${props.name} Profile`} src={props.picture}/>
                        </div>
                    </div>
                    <div className="thidle-think-user-info-main-container">
                        <div className="thidle-think-user-info-name-container">
                            <span className="thidle-think-user-complete-info-container" onMouseDown={stopPropagation} onClick={(e) => navigateTo(e, navigate, `/${props.username}`)}>
                                <span className="thidle-think-user-info-name">{props.name}</span>
                                <span className="thidle-think-user-info-username">@{props.username}</span>
                            </span>
                        </div>
                        <div className="thidle-think-info-container">
                            <span className="thidle-think-info-privacy">{{'P':'Public', 'S':'Selected People', 'F':'Friends Only', 'A':'Anonymous'}[props.privacy]}</span>
                            <span className="thidle-think-info-date">{thinkDateRead(props.date)}</span>
                        </div>
                    </div>
                    {(props.rethoughtName !== null && typeof props.rethoughtName !== 'undefined') &&
                    <div className="thidle-think-info-reposted-indicator">
                        <span className="thidle-think-info-reposted-indicator-icon material-icons-round">repeat</span>
                        <span>&nbsp;by&nbsp;</span>
                        <span className="thidle-think-info-reposted-indicator-username">{props.rethoughtName}</span>
                    </div>}
                    <div className="thidle-think-options-main-container">
                        <button className="thidle-think-options-button" onMouseDown={stopPropagation}>
                            <span className="thidle-think-options-icon material-icons">more_horiz</span>
                        </button>
                    </div>
                </div>
                <div className="thidle-think-content-container">
                    <div className="thidle-think-content-text">{props.text}</div>
                    {props.images?.length > 0 ? <ThoughtImages images={props.images}/> : ''}
                    {props.rethink ? <Rethink {...props.rethink} /> : ''}
                </div>
                {!props.isRethink ?
                <div className="thidle-think-options-container">
                    <div className="thidle-think-options-right-box" onMouseDown={stopPropagation} onClick={stopPropagation}>
                        <div className={`thidle-think-option-button material-icons${props.quoted ? ' active' : ''}`}>
                            <span className="thidle-think-option-button-icon material-icons-round">format_quote</span>
                            <span className="thidle-think-option-button-text">{props.quotes}</span>
                        </div>
                        <div className="thidle-think-option-button">
                            <span className="thidle-think-option-button-icon active material-icons">share</span>
                        </div>
                    </div>
                    <div className="thidle-think-options-left-box" onMouseDown={stopPropagation} onClick={stopPropagation}>
                        <div className={`thidle-think-option-button material-icons${userLiked ? ' active' : ''}`} >
                            <span className="thidle-think-option-button-icon material-icons-round" style={userLikedLoading ? {pointerEvents: 'none', opacity: '0.5'} : {}} onClick={(e) => updateLike(e)}>favorite</span>
                            <span className="thidle-think-option-button-text">{likeCount}</span>
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

function Rethink(props){
    return (
        <div className="thidle-rethink-content-container">
            <Thought name={props.name}
            id={props.id}
            parent={props.parent}
            picture={ProfileURL(props.profilePicture)}
            username={props.username}
            privacy={props.privacy}
            date={props.date}
            text={props.text}
            liked={parseInt(props.liked) === 1}
            likes={props.likeCount}
            reposted={parseInt(props.reposted) === 1}
            reposts={props.shareCount}
            commented={parseInt(props.commented) === 1}
            comments={props.commentCount}
            quoted={parseInt(props.quoted) === 1}
            quotes={props.quoteCount}
            hasRethink={false}
            commentItems={[]} 
            isRethink={true} />
        </div>
    )
}

function Comments(props){
    if(props.commentItems){
        const commentsItems = ((!Array.isArray(props.commentItems) ? [props.commentItems] : props.commentItems) ?? []);
        return (
            <div className="thidle-think-comments-container">{
                commentsItems.map((comment, index) => {
                    let needContinuation = commentsItems.reduce((f, c, cidx) => (c.primary && cidx > index) || f, false)
                    return <Thought 
                    key={comment.id}
                    id={comment.id}
                    name={comment.name}
                    picture={ProfileURL(comment.profilePicture)}
                    username={comment.username}
                    privacy={comment.privacy}
                    date={comment.date}
                    text={comment.text}
                    liked={parseInt(comment.liked) === 1}
                    likes={comment.likeCount}
                    reposted={parseInt(comment.reposted) === 1}
                    reposts={comment.shareCount}
                    commented={parseInt(comment.commented) === 1}
                    comments={comment.commentCount}
                    quoted={parseInt(comment.quoted) === 1}
                    quotes={comment.quoteCount}
                    hasRethink={!(comment.hasMention === '0')}
                    rethink={comment.mention}
                    images={comment.images}
                    primary={comment.primary}
                    isComment={true} 
                    hasContinuation={needContinuation}/>;
                })
            }</div>
        )
    }
}