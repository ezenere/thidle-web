import { AdditionalOption, MainAppContainer, MainContentContainer, OptionsContainer, Parallax } from "../../components/app";
import { FollowSuggestions, RightAdvertising } from "../../components/app/right-container";
import { RightOptionsContainer, MainPostsContainer } from "../../components/app";
import RightUserInfo, { ObserveButton } from "../../components/app/profile";
import { Thought, Thoughts } from "../../components/app/thoughts";
import { useContext, useEffect, useState } from "react";
import { HTTPRequest, ProfileURL } from "../../workers/commons";
import { useLocation } from "react-router-dom";
import ReactGA from 'react-ga';
import { UserContext } from "../../contexts/user";

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
    const userInfo = useContext(UserContext);

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
                        {profile.username !== userInfo.values.username ?
                            <ObserveButton observing={parseInt(profile.isFollowing) === 1} setObserving={setObserving} username={profile.username} /> :
                            <button className={`thidle-user-profile-observe-button${props.observing ? ' active' : ''}`} onClick={(e) => {userInfo.profileEdit(e)}}>
                                <div className="thidle-user-profile-observe-button-observe-option" style={{padding: '3px'}}>
                                    <span className="thidle-user-profile-observe-button-text">Edit</span>
                                </div>
                            </button>
                        }
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
                    {!profileError && !profileLoading && <Thoughts location="user" user={profile.id}/>}
                </MainPostsContainer>

            </MainContentContainer>
        </MainAppContainer>
    )
}