import styled from "styled-components";

export const MainAppContainer = styled.div`
    max-width: 950px;
    margin: auto;
    margin-top: 80px;
`

export const BlockDiv = styled.div`
    display: block;
    ${props => props.disableUserSelect ? 'user-select: none;' : ''}
`

export const DefaultSpan = styled.span`
    display: inline;
`

export const RightOptionsContainer = styled.div`
    float: right;
    padding-left: 20px;
    border-left: 1px solid #033655;
    width: 300px;
    box-sizing: border-box;
    position: sticky;
    top: 80px;
`

export const AdTestImage =  styled.img`
    width: 275px;
`

export const MainContentContainer = styled.div`
    margin-right: 320px;
`

export const MainPostsContainer = styled.div`
    margin-top: 20px;
    font-size: 0px;
    margin-bottom: 50px;
`