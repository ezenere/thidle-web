import {
    AppNavAnchorsContainer, AppNavContainer, AppNavFixedContainer, AppNavAnchor, AppNavLogo, AppNavOptionsContainer, AppNavRightSizer, AppNavSearchBarContainer, AppNavSearchBarBox, AppNavSearchBarIconContainer, AppNavSearchBarIcon, AppNavSearchBarInputContainer, AppNavSearchBarInput,
    AppNavNewThoughtButtonContainer, AppNavNewThoughtButton, AppNavNewThoughtButtonIcon, AppNavLoggedUserMenu, AppNavLoggedUserImageContainer, AppNavLoggedUserImage
} from ".";

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