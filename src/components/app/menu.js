import styled from "styled-components";
import { Link, useResolvedPath, useMatch } from "react-router-dom";

const AppNavFixedContainer = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    padding: 15px 0px 0px 0px;
    background-color: #011019;
    z-index: 100;
`

const AppNavContainer = styled.nav`
    display: flex;
    width: 100%;
    font-size: 0px;
    width: 950px;
    margin: auto;
    box-shadow: 0px 0px 7px 7px #011019;
`

const AppNavAnchorsContainer = styled.div`
    flex: 1 1 0;
`

function AppNavAnchor(props){
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
    ${props => props.active ? `
        ::before{
            width: calc(100% - 15px);
        }
        color: #C55A11;
        padding: 4px 15px 4px 10px;
        ` : `
        :hover{
            color: white;
        }
        `
    }
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
    className: 'material-icons-round'
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

function AppNavLogo(){
    return (
        <AppNavLogoContainer>
            <AppNavLogoImage  alt="Thidle Menu Logo" src="/contents/assets/images/thidle24-wname.png"/>
        </AppNavLogoContainer>
    )
}

const AppNavOptionsContainer = styled.div`
    flex: 1 1 0;
    user-select: none;
`

const AppNavRightSizer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    float: right;
    width: 310px;
`

const AppNavSearchBarContainer = styled.div`
    flex: 1 0 auto;
`

const AppNavSearchBarBox = styled.div`
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

const AppNavSearchBarIconContainer = styled.div`
    color: #4B555C;
    flex: 0 0 auto;
`

const AppNavSearchBarIcon = styled.span.attrs({
    className: 'material-icons-round'
})`
    color: inherit;
    font-size: 22px;
`

const AppNavSearchBarInputContainer = styled.div`
    flex: 1 0 auto;
`

const AppNavSearchBarInput = styled.input`
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

const AppNavNewThoughtButtonContainer = styled.div`
    padding: 0px 8px;
    flex: 0 0 auto;
`

const AppNavNewThoughtButton = styled.button`
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

const AppNavNewThoughtButtonIcon = styled.span.attrs({
    className: 'material-icons-round'
})`
    font-size: 20px;
    color: inherit;
    transition: color 0.2s;
`

const AppNavLoggedUserMenu = styled.div`
    flex: 0 0 auto;
`

const AppNavLoggedUserImageContainer = styled.div`
    width: 35px;
    height: 35px;
    box-sizing: border-box;
    border: 1px solid white;
    overflow: hidden;
    border-radius: 50%;
`

const AppNavLoggedUserImage = styled.img`
    width: 100%;
    height: 100%;
`

export default function Menu(){
    return (
        <AppNavFixedContainer>
            <AppNavContainer>
                <AppNavAnchorsContainer>
                    <AppNavAnchor to="/" title="Home" icon="home" />
                    <AppNavAnchor to="/trending" title="Trending" icon="trending_up"  />
                    <AppNavAnchor to="/notifications" title="Notifications" icon="notifications" />
                    <AppNavAnchor to="/discover" title="Discover" icon="explore" />
                    <AppNavAnchor to="/messages" title="Messages" icon="chat" />
                </AppNavAnchorsContainer>
                <AppNavLogo />
                <AppNavOptionsContainer>
                    <AppNavRightSizer>
                        <AppNavSearchBarContainer>
                            <AppNavSearchBarBox>
                                <AppNavSearchBarIconContainer>
                                    <AppNavSearchBarIcon>search</AppNavSearchBarIcon>
                                </AppNavSearchBarIconContainer>
                                <AppNavSearchBarInputContainer>
                                    <AppNavSearchBarInput name="app-nav-search-bar" type="text" placeholder="Search Something..."/>
                                </AppNavSearchBarInputContainer>
                            </AppNavSearchBarBox>
                        </AppNavSearchBarContainer>
                        <AppNavNewThoughtButtonContainer>
                            <AppNavNewThoughtButton>
                                <AppNavNewThoughtButtonIcon>history_edu</AppNavNewThoughtButtonIcon>
                            </AppNavNewThoughtButton>
                        </AppNavNewThoughtButtonContainer>
                        <AppNavLoggedUserMenu>
                            <AppNavLoggedUserImageContainer>
                                <AppNavLoggedUserImage alt="Logged User Menu Image" src=""/>
                            </AppNavLoggedUserImageContainer>
                        </AppNavLoggedUserMenu>
                    </AppNavRightSizer>
                </AppNavOptionsContainer>
            </AppNavContainer>
        </AppNavFixedContainer>
    )
}