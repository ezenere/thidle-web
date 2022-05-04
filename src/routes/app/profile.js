import { AdditionalOption, MainAppContainer, MainContentContainer, OptionsContainer } from "../../components/app";
import { FollowSuggestions, RightAdvertising } from "../../components/app/right-container";
import { RightOptionsContainer, MainPostsContainer } from "../../components/app";
import RightUserInfo from "../../components/app/profile";

export default function Profile(props){
    return (
        <MainAppContainer marginTop="60px">
            <div className="thidle-user-profile-main-info-background-container">
                <div className="thidle-user-profile-main-info-background-image-container">
                    <img className="thidle-user-profile-main-info-background-image" src={props.backgroundImage} alt={props.backgroundAlt}/>
                </div>
            </div>
            <RightOptionsContainer>
                <RightUserInfo/>
                <FollowSuggestions />
                <RightAdvertising />
            </RightOptionsContainer>
            <MainContentContainer>
                <div className="thidle-user-profile-main-info-container">
                    <div className="thidle-user-profile-image-container">
                        <img className="thidle-user-profile-image" src={props.userImage} alt={`${props.name} Profile`}/>
                    </div>
                    <div className="thidle-user-profile-info-container">
                        <button className="thidle-user-profile-observe-button">
                            <span className="thidle-user-profile-observe-button-text">Observe</span>
                            <span className="thidle-user-profile-observe-button-icon material-icons-round">person_add</span>
                        </button>
                        <span className="thidle-user-profile-name">{props.name}</span>
                        <span className="thidle-user-profile-username">@{props.username}</span>
                        <div className="thidle-user-profile-stats-container">
                            <div className="thidle-user-profile-stat">
                                <span className="thidle-user-profile-stat-number">{props.observers}</span>
                                <span className="thidle-user-profile-stat-text">Observers</span>
                            </div>
                            <div className="thidle-user-profile-stat">
                                <span className="thidle-user-profile-stat-number">{props.observing}</span>
                                <span className="thidle-user-profile-stat-text">Observing</span>
                            </div>
                            <div className="thidle-user-profile-stat">
                                <span className="thidle-user-profile-stat-number">{props.thoughts}</span>
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

                <MainPostsContainer></MainPostsContainer>

            </MainContentContainer>
        </MainAppContainer>
    )
}