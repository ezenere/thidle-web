import { useEffect, useRef, useState } from "react";
import { MainPostsContainer } from ".";
import { useThoughts } from "../../contexts/thoughts";
import { HTTPRequest, ProfileURL } from "../../workers/commons";

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
            HTTPRequest('GET', `/api/v0/thidle/thoughts?page=${thoughtsPage}`).then(result => {
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
                        picture={ProfileURL(thought.profilePicture)}
                        username={thought.username}
                        privacy={thought.privacy}
                        date={thought.date}
                        text={thought.text}
                        liked={thought.liked === '1'}
                        likes={thought.likeCount}
                        reposted={thought.reposted === '1'}
                        reposts={thought.shareCount}
                        commented={thought.commented === '1'}
                        comments={thought.commentCount}
                        hasRethink={!(thought.hasMention === '0')}
                        rethink={thought.mention}
                        images={thought.images}
                        commentItems={thought.comments}
                    />
                );
            })}
        </MainPostsContainer>
    )
    /*<Thought 
                name={'Eduardo Zenere'}
                picture={'https://pbs.twimg.com/profile_images/1480770095391641604/zbiqroKJ_400x400.jpg'}
                username={'ezenere'}
                privacy={0}
                date={'Thu, 12:00'}
                text={'Rede social incrível essa!'}
                liked={true}
                likes={21398}
                reposted={false}
                reposts={9058}
                commented={false}
                comments={342}
            />
            <Thought 
                name={'Eduardo Zenere'}
                picture={'https://pbs.twimg.com/profile_images/1480770095391641604/zbiqroKJ_400x400.jpg'}
                username={'ezenere'}
                privacy={0}
                date={'Thu, 12:00'}
                text={'Teste com imagens!'}
                liked={true}
                likes={21398}
                reposted={false}
                reposts={9058}
                commented={false}
                comments={342}
                images={[
                    {alt: "", url: "/contents/assets/images/bg-image.jpg"},
                    {alt: "", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Un_%C3%A9t%C3%A9_au_bois_de_Vincennes_%2848108771342%29.jpg/1920px-Un_%C3%A9t%C3%A9_au_bois_de_Vincennes_%2848108771342%29.jpg"},
                    {alt: "", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Paris_raining_autumn_cityscape_%288252181936%29.jpg/1920px-Paris_raining_autumn_cityscape_%288252181936%29.jpg"},
                    {alt: "", url: "https://images3.alphacoders.com/853/thumb-1920-85305.jpg"},
                    {alt: "", url: "https://img.freepik.com/free-photo/modern-futuristic-sci-fi-background_35913-2152.jpg?size=626&ext=jpg"},
                    {alt: "", url: "https://img.freepik.com/free-photo/abstract-grunge-decorative-relief-navy-blue-stucco-wall-textur-rough-colored-background_1258-28311.jpg?size=626&ext=jpg"},
                    {alt: "", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Paris_vue_d%27ensemble_tour_Eiffel.jpg/1920px-Paris_vue_d%27ensemble_tour_Eiffel.jpg"},
                    {alt: "", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Paris_Opera_full_frontal_architecture%2C_May_2009.jpg/1920px-Paris_Opera_full_frontal_architecture%2C_May_2009.jpg"},
                    {alt: "", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Arcdetriomphe_2.jpg/1920px-Arcdetriomphe_2.jpg"},
                    {alt: "", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Louvre_Courtyard%2C_Looking_West.jpg/1920px-Louvre_Courtyard%2C_Looking_West.jpg"},
                ]}
            />

            
            <Thought 
                name={'Eduardo Zenere'}
                picture={'https://pbs.twimg.com/profile_images/1480770095391641604/zbiqroKJ_400x400.jpg'}
                username={'ezenere'}
                privacy={0}
                date={'Thu, 12:00'}
                text={'Teste com imagens!'}
                liked={true}
                likes={21398}
                reposted={false}
                reposts={9058}
                commented={false}
                comments={342}
                hasRethink={true}
                rethink={{
                    name: 'Eduardo Zenere',
                    picture: 'https://pbs.twimg.com/profile_images/1480770095391641604/zbiqroKJ_400x400.jpg',
                    username: 'ezenere',
                    privacy: 0,
                    date: 'Thu, 12:00',
                    text: 'Teste com imagens!',
                    liked: true,
                    likes: 21398,
                    reposted: false,
                    reposts: 9058,
                    commented: false,
                    comments: 342
                }}
                commentItems={[
                    {
                        name: 'Eduardo Zenere',
                        picture: 'https://pbs.twimg.com/profile_images/1480770095391641604/zbiqroKJ_400x400.jpg',
                        username: 'ezenere',
                        privacy: 0,
                        date: 'Thu, 12:00',
                        text: 'Teste com imagens!',
                        liked: true,
                        likes: 21398,
                        reposted: false,
                        reposts: 9058,
                        commented: false,
                        comments: 342,
                        primary: true,
                        isSubcomment: false
                    },
                    {
                        name: 'Eduardo Zenere',
                        picture: 'https://pbs.twimg.com/profile_images/1480770095391641604/zbiqroKJ_400x400.jpg',
                        username: 'ezenere',
                        privacy: 0,
                        date: 'Thu, 12:00',
                        text: 'Teste com imagens!',
                        liked: true,
                        likes: 21398,
                        reposted: false,
                        reposts: 9058,
                        commented: false,
                        comments: 342,
                        primary: false,
                        isSubcomment: true
                    },
                    {
                        name: 'Eduardo Zenere',
                        picture: 'https://pbs.twimg.com/profile_images/1480770095391641604/zbiqroKJ_400x400.jpg',
                        username: 'ezenere',
                        privacy: 0,
                        date: 'Thu, 12:00',
                        text: 'Teste com imagens!',
                        liked: true,
                        likes: 21398,
                        reposted: false,
                        reposts: 9058,
                        commented: false,
                        comments: 342,
                        primary: true,
                        isSubcomment: false
                    }
                ]}
            />*/
}

export function Thought(props){
    const [userLiked, setUserLiked] = useState(props.liked);
    const [likeCount, setLikeCount] = useState(props.likes);
    const [userLikedLoading, setUserLikedLoading] = useState(false);

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
                                <span className="thidle-think-user-info-name">{props.name}</span>
                                <span className="thidle-think-user-info-username">@{props.username}</span>
                            </span>
                        </div>
                        <div className="thidle-think-info-container">
                            <span className="thidle-think-info-privacy">{{'P':'Public', 'S':'Selected People', 'F':'Friends Only', 'A':'Anonymous'}[props.privacy]}</span>
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
                    {props.rethink ? <Rethink {...props.rethink} /> : ''}
                </div>
                {!props.isRethink ?
                <div className="thidle-think-options-container">
                    <div className="thidle-think-options-right-box">
                        <div className="thidle-think-option-button">
                            <span className="thidle-think-option-button-icon active material-icons">share</span>
                        </div>
                    </div>
                    <div className="thidle-think-options-left-box">
                        <div className={`thidle-think-option-button material-icons${userLiked ? ' active' : ''}`}>
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
        <div className="thidle-think-content-image-album-container">
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
            picture={ProfileURL(props.profilePicture)}
            username={props.username}
            privacy={props.privacy}
            date={props.date}
            text={props.text}
            liked={props.liked ?? true}
            likes={props.likeCount}
            reposted={props.reposted ?? true}
            reposts={props.shareCount}
            commented={props.commented ?? true}
            comments={props.commentCount}
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
                    liked={comment.liked === '1'}
                    likes={comment.likeCount}
                    reposted={comment.reposted === '1'}
                    reposts={comment.shareCount}
                    commented={comment.commented === '1'}
                    comments={comment.commentCount}
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