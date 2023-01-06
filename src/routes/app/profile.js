import { AdditionalOption, MainAppContainer, MainContentContainer, OptionsContainer, Parallax } from "../../components/app";
import { FollowSuggestions, RightAdvertising } from "../../components/app/right-container";
import { RightOptionsContainer, MainPostsContainer } from "../../components/app";
import RightUserInfo, { ObserveButton } from "../../components/app/profile";
import { Thoughts } from "../../components/app/thoughts";
import { useContext, useEffect, useState } from "react";
import { HTTPRequest, ProfileURL } from "../../workers/commons";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/user";

export default function Profile(props){
    const [profile, setProfile] = useState({});
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
                setProfileUsername(paths[1]);
                setProfileError(false);
                setProfile({});
                setProfileLoading(true);
                HTTPRequest('GET', `/v0/profile/${encodeURIComponent(paths[1])}/info`).then(result => {
                    setProfileLoading(false);
                    if(result.success){
                        document.title = `${result.data?.name} (@${result.data?.username}) - Thidle`;
                        setProfile(result.data);
                    } else {
                        document.title = `Thidle - Not Found`;
                        setProfileError(true);
                    }
                    setlastHeight(result.data?.background ? 0 : 100);
                });
            } else if(window.thidle?.profileStatus === 2){
                setProfileError(true);
            }
        } else if(!profileError) setProfileError(true);
    }, [paths, profileError, profileUsername])

    return (
        <MainAppContainer marginTop="60px">
            <div className="thidle-user-profile-main-info-background-container" style={profileLoading ? (lastHeight !== 0 ? {height: `${lastHeight}px`} : {}) : (!profile?.background ? {height: `100px`, backgroundColor: "#0e1c25"} : {})}>
                <div className="thidle-user-profile-main-info-background-image-container">
                    {profile?.background ? <Parallax strenght={0.5} blur={4} className="thidle-user-profile-main-info-background-image" src={profile.background} alt={profile.username}/> : ''}
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
                        <img className="thidle-user-profile-image" src={ProfileURL(profile.picture)} alt={`${profile.username ?? ''} Profile`}/>
                    </div>
                    <div className="thidle-user-profile-info-container">
                        {profile?.username !== userInfo.values.username ?
                            <ObserveButton observing={profile?.following ?? 0} setObserving={setObserving} username={profile?.username ?? null} /> :
                            <button className={`thidle-user-profile-observe-button${props.observing ? ' active' : ''}`} onClick={(e) => {userInfo.profileEdit(e)}}>
                                <div className="thidle-user-profile-observe-button-observe-option" style={{padding: '3px'}}>
                                    <span className="thidle-user-profile-observe-button-text">Edit</span>
                                </div>
                            </button>
                        }
                        <span className="thidle-user-profile-name">{profile?.name ?? ''}</span>
                        <span className="thidle-user-profile-username">@{profile?.username ?? ''}</span>
                        <div className="thidle-user-profile-stats-container">
                            <div className="thidle-user-profile-stat">
                                <span className="thidle-user-profile-stat-number">{profile?.count?.observer ?? ''}</span>
                                <span className="thidle-user-profile-stat-text">Observers</span>
                            </div>
                            <div className="thidle-user-profile-stat">
                                <span className="thidle-user-profile-stat-number">{profile?.count?.observing ?? ''}</span>
                                <span className="thidle-user-profile-stat-text">Observing</span>
                            </div>
                            <div className="thidle-user-profile-stat">
                                <span className="thidle-user-profile-stat-number">{profile?.count?.like ?? ''}</span>
                                <span className="thidle-user-profile-stat-text">Likes</span>
                            </div>
                        </div>
                    </div>
                </div>

                <OptionsContainer marginTop="20px">
                    <AdditionalOption isactive={true} title="Thoughts" />
                    <AdditionalOption title="Comments" />
                    <AdditionalOption title="Swifts" />
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