export default function ThidleThinkMiniPublication(props){
    return (
        <div className="thidle-think-main-publication-mini-container">
            <div className="thidle-think-top-info-container">
                <div className="thidle-think-mini-user-picture-main-container">
                    <div className="thidle-think-mini-user-picture-container">
                        <img className="thidle-think-user-picture" alt={`${props.name} Profile`} src={props.picture} />
                    </div>
                </div>
                <div className="thidle-think-user-content-main-container">
                    <div className="thidle-think-mini-user-info-name-container">
                        <span className="thidle-think-mini-user-complete-info-container">
                            <span className="thidle-think-mini-user-info-name">{props.name}</span>
                            <span className="thidle-think-mini-user-info-username">@{props.username}</span>
                        </span>
                    </div>
                    <div className="thidle-think-mini-content-container">
                        <div className="thidle-think-mini-content-text">{props.text}</div>
                    </div>
                    <div className="thidle-think-mini-options-container">
                        <div className="thidle-think-options-left-box">
                            <div className={`thidle-think-option-button${props.liked ? ' active' : ''}`}>
                                <span className="thidle-think-option-button-icon material-icons">favorite</span>
                                <span className="thidle-think-option-button-text">{props.likes}</span>
                            </div>
                            <div className={`thidle-think-option-button${props.reposted ? ' active' : ''}`}>
                                <span className="thidle-think-option-button-icon material-icons">repeat</span>
                                <span className="thidle-think-option-button-text">{props.reposts}</span>
                            </div>
                            <div className={`thidle-think-option-button${props.commented ? ' active' : ''}`}>
                                <span className="thidle-think-option-button-icon material-icons">comment</span>
                                <span className="thidle-think-option-button-text">{props.comments}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}