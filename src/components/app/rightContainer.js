import styled from "styled-components";

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
            <AppRightInfoContents>
                {props.children}
            </AppRightInfoContents>
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

const AppRightInfoContents = styled.div`
    display: block;
`

export function AppLargeUserInfo(props){
    <AppLargeUserInfoContainer>
        <AppLargeUserInfoPictureOutlineContainer>
            <AppLargeUserInfoPictureContainer>
                
            </AppLargeUserInfoPictureContainer>
        </AppLargeUserInfoPictureOutlineContainer>
    </AppLargeUserInfoContainer>
}

const AppLargeUserInfoContainer = styled.div`
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