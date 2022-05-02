import { Link, useResolvedPath, useMatch } from "react-router-dom";
import styled from "styled-components";

export const AppNavFixedContainer = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    padding: 15px 0px 0px 0px;
    background-color: #011019;
    z-index: 100;
`

export const AppNavContainer = styled.nav`
    display: flex;
    width: 100%;
    font-size: 0px;
    width: 950px;
    margin: auto;
    box-shadow: 0px 0px 7px 7px #011019;
`

export const AppNavAnchorsContainer = styled.div`
    flex: 1 1 0;
`

export function AppNavAnchor(props){
    let resolved = useResolvedPath(props.to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <AppNavAnchorContainer active={match ? true : false} to={props.to}>
            <AppNavAnchorIcon active={match ? true : false}>{props.icon}</AppNavAnchorIcon>
            <AppNavAnchorText active={match ? true : false}>{props.title}</AppNavAnchorText>
        </AppNavAnchorContainer>
    )
}

const AppNavAnchorContainer = styled(Link)`
    position: relative;
    display: inline-block;
    vertical-align: middle;
    color: rgb(255 255 255 / 75%);
    padding: 4px 15px;
    transition: padding 0.2s;
    cursor: pointer;
    user-select: none;
    ::before {
        content: '';
        height: 1px;
        width: 0px;
        background-color: #C55A11;
        left: 8px;
        position: absolute;
        bottom: -4px;
    }
    :not(:first-child) {
        border-left: 1px solid #033655;
    }
    ${props => {
        if(props.active) return `
        ::before{
            width: calc(100% - 15px);
        }
        color: #C55A11;
        padding: 4px 15px 4px 10px;
        `
    }}
`

const AppNavAnchorText = styled.span`
    display: inline-block;
    vertical-align: middle;
    font-family: 'Montserrat', sans-serif;
    font-size: 10pt;
    font-weight: 300;
    max-width: 0px;
    transition: padding-left 0.2s, max-width 0.2s;
    overflow: hidden;
    ${props => {
        if(props.active) return `
        padding-left: 10px;
        max-width: 100px;
        `
    }}
`

const AppNavAnchorIcon = styled.span.attrs({
    className: 'material-icons'
})`
    display: inline-block;
    vertical-align: middle;
    transition: color 0.2s;
`


const AppNavLogoContainer = styled.div`
    width: 120px;
    flex: 0 0 auto;
    user-select: none;
`

const AppNavLogoImage = styled.img`
    width: 100%;
`

export function AppNavLogo(){
    return (
        <AppNavLogoContainer>
            <AppNavLogoImage  alt="Thidle Menu Logo" src="/contents/assets/images/thidle24-wname.png"/>
        </AppNavLogoContainer>
    )
}

export const AppNavOptionsContainer = styled.div`
    flex: 1 1 0;
    user-select: none;
`

export const AppNavRightSizer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    float: right;
    width: 275px;
`

export const AppNavSearchBarContainer = styled.div`
    flex: 1 0 auto;
`

export const AppNavSearchBarBox = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    background-color: #0E1C25;
    border-radius: 20px;
    padding: 0px 8px;
    width: 100%;
    box-sizing: border-box;
`

export const AppNavSearchBarIconContainer = styled.div`
    color: #4B555C;
    flex: 0 0 auto;
`

export const AppNavSearchBarIcon = styled.span.attrs({
    className: 'material-icons'
})`
    color: inherit;
    font-size: 22px;
`

export const AppNavSearchBarInputContainer = styled.div`
    flex: 1 0 auto;
`

export const AppNavSearchBarInput = styled.input`
    background-color: transparent;
    border: 0px;
    font-size: 8.5pt;
    font-family: 'Montserrat', sans-serif;
    padding: 8px 0px 8px 5px;
    color: white;
    outline: 0;
    box-sizing: border-box;
    width: 100%;
`

export const AppNavNewThoughtButtonContainer = styled.div`
    padding: 0px 8px;
    flex: 0 0 auto;
`

export const AppNavNewThoughtButton = styled.button`
    color: white;
    padding: 0px;
    border: 0px;
    border-radius: 50%;
    text-align: center;
    background-color: transparent;
    width: 32px;
    height: 32px;
    cursor: pointer;
    transition: background-color 0.2s;
    padding: 5px;

    :hover{
        background-color: #033655;
        color: #C55A11;
    }
`

export const AppNavNewThoughtButtonIcon = styled.span.attrs({
    className: 'material-icons'
})`
    font-size: 20px;
    color: inherit;
    transition: color 0.2s;
`

export const AppNavLoggedUserMenu = styled.div`
    flex: 0 0 auto;
`

export const AppNavLoggedUserImageContainer = styled.div`
    width: 35px;
    height: 35px;
    box-sizing: border-box;
    border: 1px solid white;
    overflow: hidden;
    border-radius: 50%;
`

export const AppNavLoggedUserImage = styled.img`
    width: 100%;
    height: 100%;
`

export const MainAppContainer = styled.div`
    max-width: 950px;
    margin: auto;
    margin-top: 80px;
`