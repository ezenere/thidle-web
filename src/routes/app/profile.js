import { AdditionalOption, MainAppContainer, MainContentContainer, OptionsContainer, Parallax } from "../../components/app";
import { FollowSuggestions, RightAdvertising } from "../../components/app/right-container";
import { RightOptionsContainer, MainPostsContainer } from "../../components/app";
import RightUserInfo, { ObserveButton } from "../../components/app/profile";
import { Thought } from "../../components/app/thoughts";
import { useEffect, useState } from "react";
import { HTTPRequest, ProfileURL } from "../../workers/commons";
import { useLocation } from "react-router-dom";
import ReactGA from 'react-ga';

const profileInitial = {
    userImage: {url: false},
    backgroundImage: false,
    friendObserverdUsers: [],
    name: '',
    username: '',
    observers: '',
    observing: '',
    thoughts: '',
    creation: '',
    country: '',
    birthday: '',
    gender: '',
    website: '',
    instagram: '',
    friendObservedCount: 0,
}

export default function Profile(props){
    const [profile, setProfile] = useState(profileInitial);
    const [profileUsername, setProfileUsername] = useState("");
    const [lastHeight, setlastHeight] = useState(0);
    const [profileError, setProfileError] = useState(false);
    const [profileLoading, setProfileLoading] = useState(false);
    const currentLocation = useLocation();

    let paths = currentLocation.pathname.split('/');

    const setObserving = (observers, isObserving) => {
        setProfile({...profile, observers, isFollowing: isObserving ? '1' : '0'})
    }

    useEffect(() => {
        if(paths.length <= 4){
            if(profileUsername !== paths[1]){
                ReactGA.pageview(window.location.pathname + window.location.search);
                setProfileUsername(paths[1]);
                setProfileError(false);
                setProfile(profileInitial);
                setProfileLoading(true);
                HTTPRequest('GET', `/api/v0/profile/info?username=${encodeURIComponent(paths[1])}`).then(result => {
                    setProfileLoading(false);
                    if(result.success){
                        document.title = `${result.data[0].name} (@${result.data[0].username}) - Thidle`;
                        setProfile(result.data[0]);
                    } else {
                        document.title = `Thidle - Not Found`;
                        setProfileError(true);
                    }
                    setlastHeight(result.data[0]?.backgroundImage?.url ? 0 : 100);
                });
            } else if(window.thidle?.profileStatus === 2){
                setProfileError(true);
            }
        } else if(!profileError) setProfileError(true);
    }, [paths, profileError, profileUsername])

    return (
        <MainAppContainer marginTop="60px">
            <div className="thidle-user-profile-main-info-background-container" style={profileLoading ? (lastHeight !== 0 ? {height: `${lastHeight}px`} : {}) : (!profile.backgroundImage?.url ? {height: `100px`, backgroundColor: "#0e1c25"} : {})}>
                <div className="thidle-user-profile-main-info-background-image-container">
                    {profile.backgroundImage?.url ? <Parallax strenght={0.5} blur={4} className="thidle-user-profile-main-info-background-image" src={`https://thidle.com${profile.backgroundImage?.url}`} alt={profile.backgroundImage?.alt}/> : ''}
                </div>
            </div>
            <RightOptionsContainer marginTop="5px" style={profileLoading ? {pointerEvents: "none", opacity: 0.5} : {}}>
                <RightUserInfo {...profile}/>
                <FollowSuggestions />
                <RightAdvertising />
            </RightOptionsContainer>
            <MainContentContainer>
                <div className="thidle-user-profile-main-info-container" style={profileLoading ? {pointerEvents: "none", opacity: 0.5} : {}}>
                    <div className="thidle-user-profile-image-container">
                        <img className="thidle-user-profile-image" src={ProfileURL(profile.userImage)} alt={`${profile.userImage?.alt ?? ''} Profile`}/>
                    </div>
                    <div className="thidle-user-profile-info-container">
                        <ObserveButton observing={parseInt(profile.isFollowing) === 1} setObserving={setObserving} username={profile.username} />
                        <span className="thidle-user-profile-name">{profile.name}</span>
                        <span className="thidle-user-profile-username">@{profile.username}</span>
                        <div className="thidle-user-profile-stats-container">
                            <div className="thidle-user-profile-stat">
                                <span className="thidle-user-profile-stat-number">{profile.observers}</span>
                                <span className="thidle-user-profile-stat-text">Observers</span>
                            </div>
                            <div className="thidle-user-profile-stat">
                                <span className="thidle-user-profile-stat-number">{profile.observing}</span>
                                <span className="thidle-user-profile-stat-text">Observing</span>
                            </div>
                            <div className="thidle-user-profile-stat">
                                <span className="thidle-user-profile-stat-number">{profile.likeCount}</span>
                                <span className="thidle-user-profile-stat-text">Likes</span>
                            </div>
                        </div>
                    </div>
                </div>

                <OptionsContainer marginTop="20px">
                    <AdditionalOption isActive={true} title="Thoughts" />
                    <AdditionalOption title="Media" />
                    <AdditionalOption title="Likes" />
                </OptionsContainer>

                <MainPostsContainer>
                <Thought 
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
                    />
                </MainPostsContainer>

            </MainContentContainer>
        </MainAppContainer>
    )
}