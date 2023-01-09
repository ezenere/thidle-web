import { AdditionalOption, MainAppContainer, MainContentContainer, OptionsContainer, Parallax } from "../../../components/app";
import { FollowSuggestions, RightAdvertising } from "../../../components/app/right-container";
import { RightOptionsContainer } from "../../../components/app";
import RightUserInfo, { ObserveButton } from "../../../components/app/profile";
import { useContext, useEffect, useState } from "react";
import { HTTPRequest, ProfileURL } from "../../../workers/commons";
import { useParams, useMatch, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/user";
import NewThought from "../../../components/app/new-thought";
import ProfileTabs from "./tabs";

export default function Profile(props){
    const [profile, setProfile] = useState({});
    const [profileUsername, setProfileUsername] = useState("");
    const [lastHeight, setlastHeight] = useState(0);
    const [profileError, setProfileError] = useState(false);
    const [profileLoading, setProfileLoading] = useState(false);
    const userInfo = useContext(UserContext);
    const navigate = useNavigate();

    const { username } = useParams();

    const setObserving = (observers, isObserving) => {
        setProfile({...profile, observers, isFollowing: isObserving ? '1' : '0'})
    }

    useEffect(() => {
        if(profileUsername !== username){
            setProfileUsername(username);
            setProfileError(false);
            setProfile({});
            setProfileLoading(true);
            HTTPRequest('GET', `/v0/profile/${encodeURIComponent(username)}/info`).then(result => {
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
    }, [username, profileError, profileUsername])

    return (
        <MainAppContainer marginTop="60px">
            <div className="thidle-user-profile-main-info-background-container" style={profileLoading ? (lastHeight !== 0 ? {height: `${lastHeight}px`} : {}) : (!profile?.background ? {height: `100px`, backgroundColor: "#0e1c25"} : {})}>
                <div className="thidle-user-profile-main-info-background-image-container">
                    {profile?.background ? <Parallax strenght={0.5} blur={4} className="thidle-user-profile-main-info-background-image" src={profile.background.url} alt={profile.background.alt}/> : ''}
                </div>
            </div>
            <RightOptionsContainer marginTop="5px" style={profileLoading ? {pointerEvents: "none", opacity: 0.5} : {}}>
                <RightUserInfo {...profile}/>
                <FollowSuggestions />
                <RightAdvertising />
            </RightOptionsContainer>
            <MainContentContainer>
                <div className="thidle-user-profile-main-info-container" style={profileLoading ? {pointerEvents: "none", opacity: 0.5} : {}}>
                    <div className={`thidle-user-profile-image-container${username === userInfo.values.username ? ' changeable' : ''}`}>
                        {username === userInfo.values.username && <div className="thidle-user-profile-image-change-button material-icons-round">add_a_photo</div>}
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
                {username === userInfo.values.username && <NewThought mtop={true} />}

                <OptionsContainer marginTop="20px">
                    <AdditionalOption isActive={useMatch('/:username')} title="Thoughts" onClick={() => navigate(`/${username}`)} />
                    <AdditionalOption isActive={useMatch('/:username/comments')} title="Comments" onClick={() => navigate(`/${username}/comments`)} />
                    <AdditionalOption isActive={useMatch('/:username/swifts')} title="Swifts" onClick={() => navigate(`/${username}/swifts`)} />
                    <AdditionalOption isActive={useMatch('/:username/media')} title="Media" onClick={() => navigate(`/${username}/media`)} />
                    <AdditionalOption isActive={useMatch('/:username/likes')} title="Likes" onClick={() => navigate(`/${username}/likes`)} />
                </OptionsContainer>

                <ProfileTabs username={username}/>

            </MainContentContainer>
        </MainAppContainer>
    )
}