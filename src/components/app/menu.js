import styled from "styled-components";
import { Link, useResolvedPath, useMatch } from "react-router-dom";
import { UserContext } from "../../contexts/user";
import { useContext, useEffect, useRef, useState } from "react";
import { doLogout, ProfileURL } from "../../workers/commons";
import { useModals } from "../../contexts/modals";

export default function Menu(){
    const userContext = useContext(UserContext);
    const [userMenuDropdownActive, setUserMenuDropdownActive] = useState(false);
    const userMenuDropdownRef = useRef();
    const modals = useModals();

    useEffect(() => {
        const handler = (event)=>{
            if(userMenuDropdownActive && userMenuDropdownRef.current && !userMenuDropdownRef.current.contains(event.target)){
                setUserMenuDropdownActive(false);
            };
        };
        
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    
    }, [userMenuDropdownActive]);

    return (
        <FixedContainer>
            <Container>
                <AnchorsContainer>
                    <Anchor to="/" title="Home" icon="home" />
                    <Anchor to="/trending" title="Trending" icon="trending_up"  />
                    <Anchor to="/notifications" title="Notifications" icon="notifications" />
                    <Anchor to="/discover" title="Discover" icon="explore" />
                    <Anchor to="/messages" title="Messages" icon="chat" />
                </AnchorsContainer>
                <Logo />
                <OptionsContainer>
                    <RightSizer>
                        <SearchBarContainer>
                            <SearchBarBox>
                                <SearchBarIconContainer>
                                    <SearchBarIcon>search</SearchBarIcon>
                                </SearchBarIconContainer>
                                <SearchBarInputContainer>
                                    <SearchBarInput name="app-nav-search-bar" type="text" placeholder="Search Something..."/>
                                </SearchBarInputContainer>
                            </SearchBarBox>
                        </SearchBarContainer>
                        <NewThoughtButtonContainer>
                            <NewThoughtButton>
                                <NewThoughtButtonIcon>history_edu</NewThoughtButtonIcon>
                            </NewThoughtButton>
                        </NewThoughtButtonContainer>
                        <LoggedUserMenu ref={userMenuDropdownRef}>
                            <LoggedUserImageContainer onClick={() => setUserMenuDropdownActive(true)}>
                                <LoggedUserImage alt="Logged User Menu Image" src={ProfileURL(userContext.values.picture)}/>
                            </LoggedUserImageContainer>
                            <LoggedUserMenuOptionsContainer isActive={userMenuDropdownActive}>
                                <Link to={`/${userContext.values.username}`}>
                                    <LoggedUserMenuOption onClick={() => setUserMenuDropdownActive(false)}>
                                        <LoggedUserMenuOptionIcon>account_circle</LoggedUserMenuOptionIcon>
                                        <LoggedUserMenuOptionText>Profile</LoggedUserMenuOptionText>
                                    </LoggedUserMenuOption>
                                </Link>
                                <LoggedUserMenuOption onClick={() => {setUserMenuDropdownActive(false); doLogout(modals);}}>
                                    <LoggedUserMenuOptionIcon>logout</LoggedUserMenuOptionIcon>
                                    <LoggedUserMenuOptionText>Logout</LoggedUserMenuOptionText>
                                </LoggedUserMenuOption>
                            </LoggedUserMenuOptionsContainer>
                        </LoggedUserMenu>
                    </RightSizer>
                </OptionsContainer>
            </Container>
        </FixedContainer>
    )
}

function Anchor(props){
    let resolved = useResolvedPath(props.to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <AnchorContainer isActive={match ? true : undefined} to={props.to}>
            <AnchorIcon isActive={match ? true : undefined}>{props.icon}</AnchorIcon>
            <AnchorText isActive={match ? true : undefined}>{props.title}</AnchorText>
        </AnchorContainer>
    )
}

function Logo(){
    return (
        <LogoContainer>
            <Link to="/"><LogoImage  alt="Thidle Menu Logo" src="/static/assets/images/thidle24-wname.png"/></Link>
        </LogoContainer>
    )
}

const LoggedUserMenuOptionsContainer = styled.div`
    z-index: 100;
    position: absolute;
    top: calc(100% + 15px);
    width: 120px;
    right: 0px;
    background-color: #1a2830;
    border-radius: 12px;
    box-shadow: 0px 0px 25px black;
    transition: top 0.2s, opacity 0.2s, visibility 0.2s;
    ::before {
        content: '';
        position: absolute;
        border-bottom: 8px solid #1a2830;
        border-right: 8px solid transparent;
        border-left: 8px solid transparent;
        top: -8px;
        right: 10px;
    }
    ${props => !props.isActive && `
        top: 100%;
        opacity: 0;
        visibility: hidden;
    `}
`

const LoggedUserMenuOption = styled.div`
    padding: 10px 0px;
    text-align: center;
    transition: background-color 0.2s;
    cursor: pointer;
    :not(:first-child) {
        border-top: 1px solid #033655;
    }
    :hover {
        background-color: rgba(255,255,255,0.05);
    }
`

const LoggedUserMenuOptionText = styled.span`
    font-size: 12px;
    vertical-align: middle;
    padding-left: 10px;
    font-family: 'Montserrat';
    color: white;
`

const LoggedUserMenuOptionIcon = styled.span.attrs({
    className: 'material-icons-round'
})`
    font-size: 17px;
    color: white;
    vertical-align: middle;
`

const FixedContainer = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    padding: 15px 0px 0px 0px;
    background-color: #011019;
    z-index: 100;
`

const Container = styled.nav`
    display: flex;
    width: 100%;
    font-size: 0px;
    width: 950px;
    margin: auto;
    box-shadow: 0px 0px 7px 7px #011019;
`

const AnchorsContainer = styled.div`
    flex: 1 1 0;
`

const AnchorContainer = styled(Link)`
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
    ${props => props.isActive ? `
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

const AnchorText = styled.span`
    display: inline-block;
    vertical-align: middle;
    font-family: 'Montserrat', sans-serif;
    font-size: 10pt;
    font-weight: 300;
    max-width: 0px;
    transition: padding-left 0.2s, max-width 0.2s;
    overflow: hidden;
    ${props => {
        if(props.isActive) return `
        padding-left: 10px;
        max-width: 100px;
        `
    }}
`

const AnchorIcon = styled.span.attrs({
    className: 'material-icons-round'
})`
    display: inline-block;
    vertical-align: middle;
    transition: color 0.2s;
`


const LogoContainer = styled.div`
    width: 120px;
    flex: 0 0 auto;
    user-select: none;
`

const LogoImage = styled.img`
    width: 100%;
`

const OptionsContainer = styled.div`
    flex: 1 1 0;
    user-select: none;
`

const RightSizer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    float: right;
    width: 310px;
`

const SearchBarContainer = styled.div`
    flex: 1 0 auto;
`

const SearchBarBox = styled.div`
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

const SearchBarIconContainer = styled.div`
    color: #4B555C;
    flex: 0 0 auto;
`

const SearchBarIcon = styled.span.attrs({
    className: 'material-icons-round'
})`
    color: inherit;
    font-size: 22px;
`

const SearchBarInputContainer = styled.div`
    flex: 1 0 auto;
`

const SearchBarInput = styled.input`
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

const NewThoughtButtonContainer = styled.div`
    padding: 0px 8px;
    flex: 0 0 auto;
`

const NewThoughtButton = styled.button`
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

const NewThoughtButtonIcon = styled.span.attrs({
    className: 'material-icons-round'
})`
    font-size: 20px;
    color: inherit;
    transition: color 0.2s;
`

const LoggedUserMenu = styled.div`
    flex: 0 0 auto;
    position: relative;
`

const LoggedUserImageContainer = styled.div`
    width: 35px;
    height: 35px;
    box-sizing: border-box;
    border: 1px solid white;
    overflow: hidden;
    border-radius: 50%;
    cursor: pointer;
`

const LoggedUserImage = styled.img`
    width: 100%;
    height: 100%;
`