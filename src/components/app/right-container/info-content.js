import { Link } from "react-router-dom";
import styled from "styled-components";

export function RightUserInfo(props){
    return (
        <UserInfoContainer to={`/${props.username}`}>
            <div className="app-large-user-info-picture-outline-container">
                <div className="app-large-user-info-picture-container">
                    <img className="app-large-user-info-picture" src={props.picture} alt={`${props.name} Profile`}/>
                </div>
            </div>
            <div className="app-large-user-info-details-outline-container">
                <div className="app-large-user-info-name-container" title={`${props.name} - @${props.username}`}>
                    <span className="app-large-user-info-name">{props.name}</span><span className="app-large-user-info-username">@{props.username}</span>
                </div>
                <div className="app-large-user-info-description-container">
                    <span className="app-large-user-info-description">{props.description}</span>
                </div>
            </div>
            <div className="app-large-user-info-add-outline-container">
                <span className="app-large-user-info-add-button material-icons">person_add</span>
            </div>
        </UserInfoContainer>
    )
}

export function RightInfoContent(props){
    return (
        <div className="app-right-info-content-container">
            <div className="app-right-info-title">{props.title}</div>
            <div className="app-right-info-content">
                {props.children}
            </div>
            {props.moreLink ? 
            <div className="app-right-info-content-more-button-container">
                <div className="app-right-info-content-more-button" to={props.moreLink}>Show More</div>
            </div>
            : '' }
        </div>
    )
}

const UserInfoContainer = styled(Link)`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: #0E1C25;
    border-radius: 15px;
    cursor: pointer;
    transition: background-color 0.2s;

    :not(:first-child) {
        margin-top: 10px;
    }

    :hover {
        background-color: #13232e;
    }
`