
import styled from "styled-components";
import { css } from "styled-components";

export const ThidleThinkOptionButtonIcon = styled.span.attrs({
    className: 'material-icons-round'
})`
    font-size: 16px;
    display: inline-block;
    vertical-align: middle;
    padding: 4px;
    margin-left: -4px;
    cursor: pointer;
    transition: color 0.2s;
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
            color: #633515
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

export const ThidleThinkTopInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: flex-start;
    align-items: flex-start;
`

export const ThidleThinkUserPicture = styled.img`
    width: 100%;
    transition: filter 0.2s;
    :hover {
        filter: brightness(1.25);
    }
`

export const ThidleThinkUserContentMainContainer = styled.div`
    flex: 1 0 auto;
    min-width: 0px;
`







const TTMPCStyle = css`
    ${ThidleThinkTopInfoContainer}::before {
        position: absolute;
        top: 18px;
        content: '';
        left: -11px;
        width: 8px;
        height: 1px;
        background-color: #033655;
    }
    ${ThidleThinkTopInfoContainer}::after {
        position: absolute;
        top: -10px;
        content: '';
        left: -12px;
        width: 1px;
        height: 29px;
        background-color: #033655;
    }
    &${ThidleThinkTopInfoContainer}{
        position: relative;
    }
    :not(:first-child){
        position: relative;
    }
    :not(:first-child)::after {
        content: '';
        position: absolute;
        top: 0px;
        height: 1px;
        width: 100%;
        left: 0px;
        background-color: #22303e;
    }
`

export const ThidleThinkMainPublicationContainer = styled.div`
    ${props => {
        if(props.comment){
            return `
                ${props.isPrimaryComment ? TTMPCStyle : ''}
                ${props.hasContinuation ? `
                    position: relative;
                    ::before {
                        content: '';
                        position: absolute;
                        top: 0px;
                        left: -2px;
                        height: 100%;
                        width: 1px;
                        background-color: #033655;
                    }
                ` : ''}
            `
        } else return `
            :not(:first-child){
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #22303E;
            }
        `
    }}
`

export const ThidleThinkPrimaryContentIsolation = styled.div`
    background-color: transparent;
    transition: background-color 0.2s;
    padding: 10px;
    border-radius: 15px;
    cursor: pointer;
    :hover {
        background-color: rgba(255, 255, 255, 0.03);
    }
`

export const ThidleThinkUserPictureMainContainer = styled.div`
    flex: 0 1 auto;
    user-select: none;
`

export const ThidleThinkUserInfoMainContainer = styled.div`
    flex: 1 1 auto;
    min-width: 0px;
`

export const ThidleThinkUserPictureContainer = styled.div`
    width: 38px;
    height: 38px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 10px;
`

export const ThidleThinkUserInfoNameContainer = styled.div`
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-size: 9.5pt;
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    overflow: hidden;
    margin-top: 2px;
`

export const ThidleThinkUserCompleteInfoContainer = styled.span`
    :hover > span {
        text-decoration: underline;
    }
`

export const ThidleThinkUserInfoUsername = styled.span`
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

export const ThidleThinkInfoContainer = styled.div`
    width: 100%;
    font-size: 7pt;
    margin-top: 6px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    min-width: 0px;
    font-family: 'Montserrat', sans-serif;
    color: rgb(255 255 255 / 25%);
    font-weight: 300;
`

export const ThidleThinkInfoPrivacy = styled.span`
    display: inline-block;
    vertical-align: middle;
`

export const ThidleThinkInfoDate = styled.span`
    display: inline-block;
    vertical-align: middle;
    ::before {
        content: '•';
        font-size: 23px;
        line-height: 10px;
        display: inline-block;
        vertical-align: top;
        padding: 0px 5px;
    }
`

export const ThidleThinkOptionsMainContainer = styled.div`
    flex: 0 1 auto;
    user-select: none;
`

export const ThidleThinkOptionsIcon = styled.span`
    font-size: 20px;
    color: rgb(255 255 255 / 20%);
    transition: color 0.2s;
    line-height: 24px;
`

export const ThidleThinkOptionsButton = styled.button.attrs({
    className: 'material-icons-round'
})`
    padding: 0px;
    border: 0px;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background-color: rgb(255 255 255 / 0%);
    transition: background-color 0.2s;
    text-align: center;
    cursor: pointer;
    :hover {
        background-color: #0E1C25;
    }
    :hover ${ThidleThinkOptionsIcon} {
        color: white;
    }
`

export const ThidleThinkContentContainer = styled.div`
    padding: 8px 0px 8px 15px;
    border-left: 1px solid #033655;
    margin-left: 18px;
    margin-top: 2px;
`

export const ThidleThinkContentText = styled.div`
    white-space: pre-wrap;
    font-size: 10pt;
    font-family: 'Ubuntu', sans-serif;
    color: rgb(255 255 255 / 90%);
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
`

export const ThidleThinkOptionsContainer = styled.div`
    margin-left: 18px;
    border-left: 1px solid #033655;
    padding: 8px 0px 8px 15px;
    user-select: none;
`

export const ThidleThinkOptionsRightBox = styled.div`
    float: right;
`

const ThidleThinkContentImageAbumSelectors = css`
    position: absolute;
    top: 50%;
    background-color: rgb(255 255 255 / 75%);
    height: 20px;
    width: 20px;
    border-radius: 50%;
    margin-top: -10px;
    box-shadow: 0px 0px 10px rgb(0 0 0 / 25%);
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s, background-color 0.2s;
    transition-delay: 1s;
    :hover{
        background-color: white;
        transition-delay: 0s;
    }
    ::before{
        color: #033655;
        font-size: 14px;
        vertical-align: middle;
        margin-top: -16px;
        display: inline-block;
    }
`

export const ThidleThinkContentImageAlbumPrevious = styled.div.attrs({
    className: 'material-icons-round'
})`
    ${ThidleThinkContentImageAbumSelectors}
    left: 5px;
    ::before {
        text-align: right;
        width: 16px;
        content: 'arrow_back_ios';
    }
`
export const ThidleThinkContentImageAlbumNext = styled.div.attrs({
    className: 'material-icons-round'
})`
    ${ThidleThinkContentImageAbumSelectors}
    right: 5px;
    ::before {
        text-align: right;
        width: 18px;
        content: 'arrow_forward_ios';
    }
`

export const ThidleThinkContentImageAlbumContainer = styled.div`
    width: 100%;
    margin-top: 15px;
    border-radius: 10px;
    position: relative;
    user-select: none;
    :hover ${ThidleThinkContentImageAlbumPrevious}, :hover ${ThidleThinkContentImageAlbumNext}{
    opacity: 1;
    transition-delay: 0s;
}
`

export const ThidleThinkContentImageAlbum = styled.div`
    width: 100%;
    max-height: 400px;
    white-space: nowrap;
    word-break: keep-all;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.025);
    border-radius: 10px;
`

export const ThidleThinkContentImageContainer = styled.div`
    width: 100%;
    max-height: 100%;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
`

export const ThidleThinkContentImage = styled.img`
    max-height: 100%;
    max-width: 100%;
    vertical-align: middle;
`

export const ThidleThinkContentImageAlbumOptionsContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    cursor: default;
`

export const ThidleThinkContentImageAlbumImageSelectors = styled.div`
    position: absolute;
    left: 0px;
    width: 100%;
    text-align: center;
    bottom: -10px;
    cursor: pointer;
`

export const ThidleThinkContentImageAlbumImageSelector = styled.i`
    display: inline-block;
    width: 4px;
    height: 4px;
    background-color: rgb(255 255 255 / 0.5);
    margin: 0px 4px;
    border-radius: 50%;
    position: relative;
    transition: background-color 0.2s;
    box-shadow: 0px 0px 6px black;
    ::before {
        content: '';
        border: 1px solid transparent;
        height: 6px;
        width: 6px;
        position: absolute;
        border-radius: 50%;
        left: -2px;
        top: -2px;
        border-color: transparent;
        transition: border-color 0.2s;
    }
    ${props => props.active ? `
        background-color: white;
        ::before{
            border-color: #c55a11;
        }
    ` : ''}
`