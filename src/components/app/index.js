import styled from "styled-components";

export const MainAppContainer = styled.div`
    max-width: 950px;
    margin: auto;
    margin-top: 80px;
`

export const ThidleThinkTopInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: flex-start;
    align-items: flex-start;
`

export const BlockDiv = styled.div`
    display: block;
    ${props => props.disableUserSelect ? 'user-select: none;' : ''}
`

export const ThidleThinkUserPicture = styled.img`
    width: 100%;
    transition: filter 0.2s;
`

export const ThidleThinkUserContentMainContainer = styled.div`
    flex: 1 0 auto;
    min-width: 0px;
`

export const DefaultSpan = styled.span`
    display: inline;
`

export const ThidleThinkOptionButtonIcon = styled.span.attrs({
    className: 'material-icons-round'
})`
    font-size: 16px;
    display: inline-block;
    vertical-align: middle;
    padding: 4px;
    margin-left: -4px;
    cursor: pointer;
    transition: color 0.2s, opacity 0.2s;
`

export const ThidleThinkOptionButton = styled.div`
    display: inline-block;
    color: #80888C;
    font-size: 0px;

    :not(:last-child) {
        margin-right: 30px;
    }

    ${props => props.active ? `
        color: #C55A11;
        ${ThidleThinkOptionButtonIcon}:hover {
            opacity: 0.5;
        }
    ` : `${ThidleThinkOptionButtonIcon}:hover {
        color: white;
    }`}
`



export const ThidleThinkOptionButtonText = styled.span`
    display: inline-block;
    font-size: 7pt;
    font-family: 'Montserrat', sans-serif;
    vertical-align: middle;
    padding: 4px 2px;
    cursor: pointer;
`

export const AdTestImage =  styled.img`
    width: 275px;
`