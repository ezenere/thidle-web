import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../contexts/user";
import { emojify, BirthdayDate, HTTPRequest, MonthAndYear, ProfileURL, RemoveHttp, TrustedURL, UntrustedLink } from "../../workers/commons"

export default function RightUserInfo(props){
    const [active, setActive] = useState(false);

    useEffect(() => {
        // const th = document.querySelector("#thidle")
        const onScroll = () => {
            let st = window.scrollY; // th.scrollTop;
            if(st > 450 && !active) setActive(true);
            else if(st < 450 && active) setActive(false);
        }

        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    });

    return (
        <div className="user-profile-right-info-container">
            <div className={`user-profile-right-info-user-container${active ? ' active' : ''}`}>
                <div className="user-profile-right-info-user-picture-container">
                    <img className="user-profile-right-info-user-picture" alt="Current Profile" src={ProfileURL(props?.picture)}/>
                </div>
                <div className="user-profile-right-info-user-info-container">
                    <span className="thidle-user-profile-name-right">{emojify(props?.name ?? '')}</span>
                    <span className="thidle-user-profile-username-right">@{props?.username ?? ''}</span>
                </div>
            </div>

            <div className="user-profile-right-info-top">
                <span className="user-profile-since-text">Thinking since {MonthAndYear(props?.creation ?? '')}</span>
                <div className="user-profile-report-button">
                    <span className="user-profile-report-button-icon material-icons">flag</span>
                </div>
            </div>
            
            <div className="user-profile-right-info-description-container">{emojify(props?.description ?? '')}</div>

            <div className="user-profile-right-info-additional-data-container">
                {props?.details?.location ? <RInfoDataItem value={props.details.location} icon="house" /> : ''}
                {props?.birthday ? <RInfoDataItem value={BirthdayDate(props.birthday)} icon="cake" /> : ''}
                {props?.details?.pronoum ? <RInfoDataItem value={props.details.pronoum.pronoums} icon={props.details.pronoum.icon} /> : ''}
                {props?.details?.website ? <RInfoDataItem value={RemoveHttp(props.details.website)} url={props.details.website} trusted={false} icon="language" /> : ''}
                {props?.details?.instagram ? <RInfoDataItem value={props.details.instagram} imageIcon="/static/assets/logos/ig-icon.png" trusted={true} url={TrustedURL("https://www.instagram.com/[]?ref=thidle.com", [props.details.instagram])} /> : ''}
            </div>

            {props?.friends?.count > 0 ? <div className="user-profile-right-info-observed-by-container">
                <div className="user-profile-right-info-observed-by-images">
                    {props.friends.users.slice(0, 5).map((item) => {
                        return <div className="user-profile-right-info-observed-by" key={item.username}><img className="user-profile-right-info-observed-by-image" alt={`${item.name} Profile`} src={ProfileURL(item.picture)} /></div>
                    })}
                </div>
                <div className="user-profile-right-info-observed-by-text">Observed by {props.friends.count} {parseInt(props.friends.count) === 1 ? 'person' : 'people'} you know</div>
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

export function ObserveButton({ profile, setProfile }){
    const [isLoading, setIsLoading] = useState(false);
    const [over, setOver] = useState(false);
    const ctx = useContext(UserContext);
    
    if(!profile.follow) return null;

    const updateFollowing = (e) => {
        setIsLoading(true);
        HTTPRequest(profile.follow.status !== 0 ? 'DELETE' : 'POST', `/v0/profile/${profile.username}/follow`).then(response => {
            setIsLoading(false);
            if(response.success) {
                profile.follow.status = response.data.status;
                setProfile({ ...profile });
                ctx.rightSuggestions.update(false);
            }
        });
    }

    return (
        <button className="thidle-user-profile-observe-button" onMouseEnter={() => setOver(true)} onMouseLeave={() => setOver(false)} onClick={(e) => {updateFollowing(e)}} style={isLoading ? {opacity: 0.5, pointerEvents: 'none'} : {}}>
            <div className={`thidle-user-profile-observe-button-observe-option observe${profile.follow.status === 0 ? ' active' : ''}`}>
                <span className="thidle-user-profile-observe-button-text">Observe</span>
                <span className="thidle-user-profile-observe-button-icon material-icons-round">person_add</span>
            </div>
            <div className={`thidle-user-profile-observe-button-observe-option ${over ? 'stop' : 'observing'}${profile.follow.status === 1 ? ' active' : ''}`}>
                {over ? <>
                    <span className="thidle-user-profile-observe-button-text">Unobserve</span>
                    <span className="thidle-user-profile-observe-button-icon material-icons-round">person_remove</span>
                </> : <>
                    <span className="thidle-user-profile-observe-button-text">Observing</span>
                    <span className="thidle-user-profile-observe-button-icon material-icons-round">done</span>
                </>}
            </div>
            <div className={`thidle-user-profile-observe-button-observe-option ${over ? 'stop' : 'pending'}${profile.follow.status === 2 ? ' active' : ''}`}>
                {over ? <>
                    <span className="thidle-user-profile-observe-button-text">Cancel</span>
                    <span className="thidle-user-profile-observe-button-icon material-icons-round">person_remove</span>
                </> : <>
                    <span className="thidle-user-profile-observe-button-text">Pending</span>
                    <span className="thidle-user-profile-observe-button-icon material-icons-round">hourglass_empty</span>
                </>}
            </div>
        </button>
    )
}

export const PrivateProfileMessage = styled.div`
    text-align: center;
    padding: 40px 0px;
    margin-top: 30px;
    background-color: #13232e;
    color: #ffffff4f;
    font-family: 'Montserrat';
    border-radius: 15px;
    pointer-events: none;
    font-size: 9.5pt;
`