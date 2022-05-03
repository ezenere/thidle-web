import { MainAppContainer, MainContentContainer } from "../../components/app";
import { FollowSuggestions, RightAdvertising, TrendingsMini } from "../../components/app/right-container";
import { RightOptionsContainer, MainPostsContainer } from "../../components/app";

export default function Profile(props){
    return (
        <MainAppContainer>
            <div className="thidle-user-profile-main-info-background-container">
                <div className="thidle-user-profile-main-info-background-image-container">
                    <img className="thidle-user-profile-main-info-background-image" src={props.backgroundImage} alt={props.backgroundAlt}/>
                </div>
            </div>
            <RightOptionsContainer>
                <FollowSuggestions />
                <TrendingsMini />
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
                        <span className="thidle-user-profile-username">{props.username}</span>
                        <div className="thidle-user-profile-stats-container">
                            <div className="thidle-user-profile-stat">
                                <span class="thidle-user-profile-stat-number">{props.observers}</span>
                                <span class="thidle-user-profile-stat-number">Observers</span>
                            </div>
                            <div className="thidle-user-profile-stat">
                                <span class="thidle-user-profile-stat-number">{props.observing}</span>
                                <span class="thidle-user-profile-stat-number">Observers</span>
                            </div>
                            <div className="thidle-user-profile-stat">
                                <span class="thidle-user-profile-stat-number">{props.thoughts}</span>
                                <span class="thidle-user-profile-stat-number">Observers</span>
                            </div>
                        </div>
                    </div>
                </div>

                <MainPostsContainer></MainPostsContainer>

            </MainContentContainer>
        </MainAppContainer>
    )
}