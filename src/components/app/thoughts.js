import { memo, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainPostsContainer } from ".";
import { useThoughts } from "../../contexts/thoughts";
import { HTTPRequest, navigateTo, ProfileURL, stopPropagation, thinkDateRead } from "../../workers/commons";
import { PrivateProfileMessage } from "./profile";

export function UserThoughts({ user }){
    return <Thoughts url={`/v0/profile/${user}/thoughts`} tKey={`user-${user}`} noContentMessage={`@${user} didn't shared any thoughts yet.`}/>
}

export function MainThoughts(){
    return <Thoughts url='/v0/thought' tKey='main' noContentMessage={'It seems too quiet arround here... Follow someone to populate your timeline!'} />
}

export function Thoughts({ url, tKey, noContentMessage }){
    const [thoughts, setThoughts] = useThoughts(tKey);

    useEffect(() => {
        if(!thoughts.loading && !thoughts.loaded){
            setThoughts({ loading: true, page: thoughts.page + 1 })
            HTTPRequest('GET', url, {
                ...(thoughts.cursor ? {cursor: thoughts.cursor} : {}), 
                ...(thoughts.mode ? {mode: thoughts.mode} : {}) 
            })
            .then(result => setThoughts({ loading: false, items: thoughts.mode === 'more' ? [ ...thoughts.items, ...result.data.items ] : [ ...result.data.items, ...thoughts.items ], loaded: true, cursor: result.data.cursor }));
        }

        const listener = (e) => {
            const bottom = document.body.scrollHeight - (window.scrollY + window.innerHeight);
            if(window.innerHeight*1.5 > bottom && !thoughts.loading) setThoughts({ loaded: false, mode: 'more' })
        }

        window.addEventListener('scroll', listener);
        return () => window.removeEventListener('scroll', listener);
    });

    return (thoughts.loaded || thoughts.items.length > 0) ? (thoughts.items.length > 0 ?
        <MainPostsContainer>
            {thoughts.items.map(thought => <MemoThought key={thought.id} data={thought} />)}
        </MainPostsContainer>
        :
        <PrivateProfileMessage>{noContentMessage}</PrivateProfileMessage>) : null;
}


export function Thought({data, isComment, primary, hasContinuation, isSubcomment, isRethink, featured}){
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
            <div className={`thidle-think-primary-content-isolation${featured ? ' featured' : ''}`} onMouseDown={stopPropagation} onClick={(e) => navigateTo(e, navigate, `/thought/${data.id}`)}>
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
                    {data.videos && <ThoughtVideos videos={data.videos}/>}
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
                            <span className="thidle-think-option-button-text">{data.count.comment}</span>
                        </div>
                    </div>
                </div>
                : ''}
            </div>
            <Comments featured={!!featured} items={data.comments}/>
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
                            <img className="thidle-think-content-image" alt={image.alt} src={image.url}/>
                        </div>
                    )
                })}
            </div>
            <div className="thidle-think-content-image-album-options-container">
                {props.images.length > 1 && (props.images.length-1) > currentImage ? <div className="thidle-think-content-image-album-next material-icons-round" onClick={() => changeImage(1)}/> : ''}
                {props.images.length > 1 && currentImage > 0 ?  <div className="thidle-think-content-image-album-previous material-icons-round" onClick={() => changeImage(-1)}/> : ''}
                {props.images.length > 1 && <div className="thidle-think-content-image-album-image-selectors">
                    {props.images.map((image, index) => {
                        return <i className={`thidle-think-content-image-album-image-selector${image.active ? ' active' : ''}`} onClick={() => changeImage(index, true)} key={index}/>
                    })}
                </div>}
            </div>
        </div>
    )
}
const MemoThought = memo(Thought)

function ThoughtVideos(props) {
    // const [currentImage, setCurrentImage] = useState(0);
    const [overflowLeft, setOverflowLeft] = useState({old: 0, current: 0});
    const overflow = useRef();
    
    // function SetPosition(left){
    //     setOverflowLeft({...overflowLeft, current: left});
    // }

    useEffect(() => {
        if(overflowLeft.old !== overflowLeft.current){
            overflow.current.scrollTo({top: 0, left: overflowLeft.current, behavior: 'smooth'});
            setOverflowLeft({...overflowLeft, old: overflowLeft.current})
        }
    }, [overflowLeft])

    // const changeImage = (set, item = false) => {
    //     let newPos = item ? set : (currentImage + set);
    //     if(newPos >= 0 && newPos <= (props.videos.length-1)){
    //         setCurrentImage(newPos);
    //         SetPosition(newPos * overflow.current.offsetWidth);
    //     } 
    // }

    // for(let c = 0; c < props.videos.length; c++) props.videos[c].active = c === currentImage;

    return(
        <div className="thidle-think-content-image-album-container" onClick={stopPropagation} onMouseDown={stopPropagation}>
            <div className="thidle-think-content-image-album" ref={overflow}>
                {props.videos.map((video) => <ThoughtVideo key={video.url} data={video} />)}
            </div>
            {/* <div className="thidle-think-content-image-album-options-container">
                {props.videos.length > 1 && (props.videos.length-1) > currentImage ? <div className="thidle-think-content-image-album-next material-icons-round" onClick={() => changeImage(1)}/> : ''}
                {props.videos.length > 1 && currentImage > 0 ?  <div className="thidle-think-content-image-album-previous material-icons-round" onClick={() => changeImage(-1)}/> : ''}
                {props.videos.length > 1 && <div className="thidle-think-content-image-album-image-selectors">
                    {props.videos.map((video, index) => {
                        return <i className={`thidle-think-content-image-album-image-selector${video.active ? ' active' : ''}`} onClick={() => changeImage(index, true)} key={index}/>
                    })}
                </div>}
            </div> */}
        </div>
    )
}
function ThoughtVideo({ data }) {
    const ref = useRef(null);
    useEffect(() => {
        let playing = false;
        let paused = false;
        let first = false;
        let clicked = false;
        let setted = false;
        const cb = () => {
            const v = ref.current.getBoundingClientRect();
            if ((v.top + v.height/2 < 0 || v.top + v.height/2 > window.innerHeight)){
                if (!ref.current.paused) {
                    if (window.lastPlayingVideo === ref.current) window.lastPlayingVideo = null;
                    playing = false;
                    ref.current.pause();
                }
            } else {
                if (ref.current.paused && !paused){
                    if (first) {
                        ref.current.currentTime = -1;
                        first = false;
                    }
                    if (window.lastPlayingVideo !== ref.current) {
                        if (window.lastPlayingVideo) {
                            const lastBR = window.lastPlayingVideo.getBoundingClientRect();
                            const currentBR = ref.current.getBoundingClientRect();
                            if (
                                Math.abs((lastBR.top + lastBR.height/2) - (window.innerHeight / 2)) > 
                                Math.abs((currentBR.top + currentBR.height/2) - (window.innerHeight / 2))){
                                window.lastPlayingVideo.pause();
                            } else return;
                        }
                        window.lastPlayingVideo = ref.current;
                    }
                    ref.current.play();
                    playing = true;

                }
            }
        }
        let player = null;
        (async () => {
            if (window.shaka.Player.isBrowserSupported()) {
                player = new window.shaka.Player(ref.current);
                player.addEventListener('error', (e) => console.log(e));
                ref.current.addEventListener('ended', () => {
                    if (playing) {
                        ref.current.currentTime = 0;
                        ref.current.play();
                    }
                });
                ref.current.addEventListener('click', () => {
                    if (!clicked) {
                        clicked = true;
                        ref.current.volume = 1;
                    } else {
                        if (!ref.current.paused) {
                            ref.current.pause();
                            paused = true;
                        } else {
                            ref.current.play();
                            paused = false;
                        } 
                    }
                });
                ref.current.addEventListener('canplay', () => {
                    if(!setted){
                        ref.current.volume = 0;
                        cb();
                        setted = true;
                    }
                });
                try {
                    await player.load(data.url);
                } catch (e) {
                    console.log(e)
                }
            }
        })();
        window.addEventListener('scroll', cb)
        return () => { window.removeEventListener('scroll', cb); player.destroy(); }
    }, [data.url])
    return (
        <div className="thidle-think-content-image-container">
            <video className="thidle-think-content-video" ref={ref} controls/>
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

function Comments({featured, items}){
    return (
        <div className={`thidle-think-comments-container${featured ? ' featured' : ''}`}>{
            items.map((comment, index) => {
                let needContinuation = items.reduce((f, c, cidx) => (cidx > index) || f, false)
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