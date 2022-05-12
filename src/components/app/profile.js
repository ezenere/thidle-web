import { useEffect, useState } from "react";
import { emojify, FullDate, MonthAndYear, ProfileURL, RemoveHttp, TrustedURL, UntrustedLink } from "../../workers/commons"

export default function RightUserInfo(props){
    const [active, setActive] = useState(false);

    useEffect(() => {
        const th = document.querySelector("#thidle")
        const onScroll = () => {
            let st = th.scrollTop;
            if(st > 450 && !active) setActive(true);
            else if(st < 450 && active) setActive(false);
        }

        th.removeEventListener('scroll', onScroll);
        th.addEventListener('scroll', onScroll, { passive: true });
        return () => th.removeEventListener('scroll', onScroll);
    });

    return (
        <div className="user-profile-right-info-container">
            <div className={`user-profile-right-info-user-container${active ? ' active' : ''}`}>
                <div className="user-profile-right-info-user-picture-container">
                    <img className="user-profile-right-info-user-picture" alt="Current Profile" src={ProfileURL(props.userImage)}/>
                </div>
                <div className="user-profile-right-info-user-info-container">
                    <span className="thidle-user-profile-name-right">{emojify(props.name)}</span>
                    <span className="thidle-user-profile-username-right">@{props.username}</span>
                </div>
            </div>

            <div className="user-profile-right-info-top">
                <span className="user-profile-since-text">Thinking since, {MonthAndYear(props.creation ?? '')}</span>
                <div className="user-profile-report-button">
                    <span className="user-profile-report-button-icon material-icons">flag</span>
                </div>
            </div>
            
            <div className="user-profile-right-info-description-container">{emojify(props.description ?? '')}</div>

            <div className="user-profile-right-info-additional-data-container">
                {props.hometown ? <RInfoDataItem value={props.hometown} icon="house" /> : ''}
                {props.displayBirthday ? <RInfoDataItem value={FullDate(props.birthday)} icon="cake" /> : ''}
                {props.gender !== "N" ? <RInfoDataItem value={{"M":"Male","F":"Female","T":"Transgender","O":"Other"}[props.gender]} icon={{"M":"male","F":"female","T":"transgender","O":"transgender"}[props.gender]} /> : ''}
                {props.website ? <RInfoDataItem value={RemoveHttp(props.website)} url={props.website} trusted={false} icon="language" /> : ''}
                {props.instagram ? <RInfoDataItem value={props.instagram} imageIcon="/contents/assets/logos/ig-icon.png" trusted={true} url={TrustedURL("https://www.instagram.com/[]?ref=thidle.com", [props.instagram])} /> : ''}
            </div>

            {props.friendObservedCount > 0 ? <div className="user-profile-right-info-observed-by-container">
                <div className="user-profile-right-info-observed-by-images">
                    {props.friendObserversUsers.map((item, index) => {
                        return <div className="user-profile-right-info-observed-by" key={item.username}><img className="user-profile-right-info-observed-by-image" alt={`${item.name} Profile`} src={ProfileURL(item.userImage)} /></div>
                    })}
                </div>
                <div className="user-profile-right-info-observed-by-text">Observed by {props.friendObservedCount} {parseInt(props.friendObservedCount) === 1 ? 'person' : 'people'} you know</div>
            </div> : ''}
        </div>
    )
}
function RInfoDataItem(props){
    return (
        <div className="user-profile-right-info-additional-data">
            {props.imageIcon ? <span className="user-profile-right-info-additional-data-image-icon-container"><img className="user-profile-right-info-additional-data-image-icon" alt="Social Network Icon" src={props.imageIcon}/></span> : ''}
            {props.icon ? <span className="user-profile-right-info-additional-data-icon material-icons-round">{props.icon}</span> : ''}
            {props.url ?
                (
                    props.trusted ? 
                    <a href={props.url} target="_blank" rel="noreferrer"><span className="user-profile-right-info-additional-data-text">{props.value}</span></a> :
                    <UntrustedLink url={props.url}><span className="user-profile-right-info-additional-data-text">{props.value}</span></UntrustedLink>
                ) : 
                <span className="user-profile-right-info-additional-data-text">{props.value}</span>
            }
        </div>
    )
}