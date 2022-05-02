import { Link } from "react-router-dom";
import styled from "styled-components";
import { BlockDiv } from ".";

export const AppRightOptionsContainer = styled.div`
    float: right;
    padding-left: 20px;
    border-left: 1px solid #033655;
    width: 300px;
    box-sizing: border-box;
    position: sticky;
    top: 80px;
`

export function AppRightInfoContent(props){
    return (
        <AppRightInfoContentContainer>
            <AppRightInfoTitle>{props.title}</AppRightInfoTitle>
            <BlockDiv>
                {props.children}
            </BlockDiv>
            {props.moreLink ? 
            <AppRightInfoContentMoreButtonContainer>
                <AppRightInfoContentMoreButton to={props.moreLink}>Show More</AppRightInfoContentMoreButton>
            </AppRightInfoContentMoreButtonContainer>
            : '' }
        </AppRightInfoContentContainer>
    )
}

const AppRightInfoContentContainer = styled.div`
    :not(:first-child) {
        margin-top: 20px;
    }
`

const AppRightInfoTitle = styled.div`
    font-size: 12pt;
    color: white;
    font-weight: 600;
    font-family: 'Montserrat', sans-serif;
    margin-bottom: 10px;
    margin-top: 5px;
    user-select: none;
`



const AppRightInfoContentMoreButtonContainer = styled.div`
    text-align: center;
    margin-top: 8px;
    user-select: none;
`

const AppRightInfoContentMoreButton = styled(Link)`
    display: inline-block;
    font-family: 'Montserrat', sans-serif;
    color: #C55A11;
    padding: 2px 5px 4px 5px;
    font-weight: 600;
    font-size: 8.5pt;
    cursor: pointer;
    border-bottom: 1px solid transparent;
    :hover {
        border-bottom: 1px solid #C55A11;
    }
`

export function AppLargeUserInfo(props){
    return (
        <AppLargeUserInfoContainer to={`/${props.username}`}>
            <AppLargeUserInfoPictureOutlineContainer>
                <AppLargeUserInfoPictureContainer>
                    <AppLargeUserInfoPicture src={props.picture} alt={`${props.name} Profile` }/>
                </AppLargeUserInfoPictureContainer>
            </AppLargeUserInfoPictureOutlineContainer>
            <AppLargeUserInfoDetailsOutlineContainer>
                <AppLargeUserInfoNameContainer title={`${props.name} - @${props.username}`}>
                    <AppLargeUserInfoName>{props.name}</AppLargeUserInfoName>
                    <AppLargeUserInfoUsername>@{props.username}</AppLargeUserInfoUsername>
                </AppLargeUserInfoNameContainer>
                <AppLargeUserInfoDescriptionContainer>
                    <AppLargeUserInfoDescription>{props.description}</AppLargeUserInfoDescription>
                </AppLargeUserInfoDescriptionContainer>
            </AppLargeUserInfoDetailsOutlineContainer>
            <AppLargeUserInfoAddOutlineContainer>
                <AppLargeUserInfoAddButton>person_add</AppLargeUserInfoAddButton>
            </AppLargeUserInfoAddOutlineContainer>
        </AppLargeUserInfoContainer>
    )
}

const AppLargeUserInfoContainer = styled(Link)`
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

const AppLargeUserInfoPictureOutlineContainer = styled.div`
    flex: 0 0 auto;
    padding-right: 10px;
    user-select: none;
`

const AppLargeUserInfoPictureContainer = styled.div`
    width: 40px;
    border-radius: 50%;
    overflow: hidden;
    height: 40px;
`

const AppLargeUserInfoPicture = styled.img`
    width: 100%;
`

const AppLargeUserInfoDetailsOutlineContainer = styled.div`
    flex: 1 1 auto;
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-size: 9.5pt;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    min-width: 0px;
`

const AppLargeUserInfoNameContainer = styled.div`
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    overflow: hidden;
`

const AppLargeUserInfoUsername = styled.span`
    font-weight: 300;
    font-size: 9pt;
    color: rgb(255 255 255 / 20%);
    font-family: 'Ubuntu', sans-serif;
    ::before {
        content: '-';
        padding: 0px 10px;
        display: inline-block;
    }
`

const AppLargeUserInfoName = styled.span`
    font-weight: 600;
`

const AppLargeUserInfoDescriptionContainer = styled.div`
    width: 100%;
    font-size: 8pt;
    margin-top: 7px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    min-width: 0px;
    font-family: 'Ubuntu', sans-serif;
    color: #7F7F7F;
    font-weight: 500;
`

const AppLargeUserInfoDescription = styled.span`
    display: inline;
`

const AppLargeUserInfoAddOutlineContainer = styled.div`
    flex: 0 0 auto;
`

const AppLargeUserInfoAddButton = styled.span.attrs({
    className: 'material-icons-round'
})`
    font-size: 20px;
    padding-left: 7px;
    padding-right: 4px;
    padding-top: 10px;
    padding-bottom: 10px;
    cursor: pointer;
    color: rgb(255 255 255 / 50%);
    transition: color 0.2s;
    :hover {
        color: white;
    }
`

