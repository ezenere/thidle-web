export default function RightUserInfo(props){
    return (
        <div className="user-profile-right-info-container">
            <div className="user-profile-right-info-top">
                <span className="user-profile-since-text">Thinking since, {props.creation}</span>
                <div className="user-profile-report-button">
                    <span className="user-profile-report-button-icon material-icons">flag</span>
                </div>
            </div>
            
            <div className="user-profile-right-info-description-container">{props.description}</div>

            <div className="user-profile-right-info-additional-data-container">
                <RInfoDataItem value={props.hometown} icon="home" />
                <RInfoDataItem value={props.birthday} icon="cake" />
                <RInfoDataItem value={{"M":"Male","F":"Female","T":"Transgender","O":"Other"}[props.gender]} icon={{"M":"male","F":"female","T":"transgender","O":"transgender"}[props.gender]} />
                <RInfoDataItem value={props.website} icon="language" url={props.website} />
                <RInfoDataItem value={props.instagram} icon="instagram" url={props.instagram} />
            </div>

            <div className="user-profile-right-info-observed-by-container">
                <div className="user-profile-right-info-observed-by-images">
                    <div className="user-profile-right-info-observed-by"></div>
                </div>
                <div className="user-profile-right-info-observed-by-text">Observed by {props.friendObservedCount} people you know</div>
            </div>
        </div>
    )
}
function RInfoDataItem(props){
    return (
        <div className="user-profile-right-info-additional-data">
            <span className="user-profile-right-info-additional-data-icon material-icons-round">{props.icon}</span>
            <span className="user-profile-right-info-additional-data-text">{props.value}</span>
        </div>
    )
}