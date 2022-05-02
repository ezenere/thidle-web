import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const DefaultButton = styled.button`
    background-color: white;
    border: 0px;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 10px;
    font-size: 10.5pt;
    padding: 10px;
    border-radius: 25px;
    cursor: pointer;

    :last-child {
        margin-bottom: 0px;
    }
`;

export const JoinButton = styled(DefaultButton)`
    background-color: #C55A11;
    color: white;
`

export const ContinueButton = styled(DefaultButton)`
    color: #C55A11;
    ${props => props.marginTop ? `margin-top: ${props.marginTop}` : ''};
`;

export const ContentContainer = styled.div`
    height: 100%;
    width: 100%;
    font-size: 0px;
`

export const MainWebsiteContainer = styled.div`
    float: left;
    width: 50%;
    height: 100%;
`

export const PageMenu = styled.nav`
    padding: 25px;
    overflow: hidden;
`

export const MenuLogoContainer = styled.div`
    width: 220px;
    float: left;
`

export const MenuLogoImage = styled.img`
    width: 100%;
`

export const MenuButtons = styled.div`
    float: right;
    font-size: 10pt;
    font-family: 'Montserrat', 'sans-serif';
    color: #7F7F7F;
    margin-top: 35px;
    margin-right: 55px;
    font-weight: 300;
`

export const MenuAnchor = styled(Link)`
    margin: 0px 10px 0px 10px;
    display: inline-block;
    :first-child {
        margin-left: 0px;
    }
`

const FormContainerOverflowStryle = css`
    display: inline-block;
    white-space: normal;
    vertical-align: top;
    box-sizing: border-box;
    padding: 0px 25px;
    transition: opacity 0.2s;
    width: 350px;
`

export const FormContainer = styled.div`
    width: 275px;
    margin: auto;
    margin-top: 100px;
    ${props => props.isOverflow ? FormContainerOverflowStryle : ''}
`

export const Form = styled.form`
    margin-bottom: 35px;
    ${props => {
        if(props.disabled) return `
            opacity: 0.5;
            pointer-events: none;
        `
    }}
`

export const FormCall = styled.div`
    display: block;
`

export const DisplayText = styled.div`
    font-size: 12px;
    font-family: 'Montserrat', 'sans-serif';
    margin-bottom: 15px;
    font-weight: 300;
    color: ${props => props.color ?? 'white'};
    font-size: ${props => props.fontSize ?? '12pt'};
    text-align: ${props => props.center ? 'center' : 'left'};
    margin-bottom: ${props => props.lessBottom ? '7' : '15'}px;
    font-weight: ${props => props.bold ? '700' : '300'};
    ${props => props.hasTop ? 'margin-top: 10px' : ''};
    ${props => props.middle ? 'margin-left: 8px; margin-bottom: 5px;' : ''}
    ${props => props.hasPadLeft ? 'margin-left: 15px;' : ''}
`

const InputCSS = css`
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-radius: 20px;
    padding: 13px 16px;
    color: white;
    background-color: #1A2830;
    font-size: 8pt;
    outline: 0;
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    ${props => {
        if(props.hidden) return `
        overflow: hidden;
        height: 0px;
        `
    }}
    ::placeholder {
        color: #055E95;
    }
`

export const DefaultInput = styled.input`
    ${InputCSS}
    ${props => props.before ? 'padding-left: 35px;' : ''}
`
export const DefaultSelect = styled.select`
    ${InputCSS}
    ${props => props.width ? `width: ${props.width}` : ''};
    ${props => props.flex ? `flex: ${props.flex}` : ''};
    ${props => props.margin ? `margin: ${props.margin}` : ''};
`

export const FormInputContainer = styled.div`
    :not(:last-child){
        margin-bottom: 5px;
    }
    ${props => {
        if(props.before){
            return `
            position: relative;
            ::before {
                content: '${props.before}';
                font-size: 10pt;
                font-family: 'Montserrat', sans-serif;
                color: white;
                font-weight: bold;
                position: absolute;
                top: 50%;
                left: 15px;
                transform: translateY(-55%);
            }
`
        }
    }}
`

export const AlternativeFormContainer = styled.div`
    margin-bottom: 45px;
`

export const JoinContainer = styled.div`
    display: block;
`

export const OverflowFormContainer = styled.div`
    margin: auto;
    width: 350px;
    white-space: nowrap;
    overflow: hidden;
`

export const InformativeAssideContainer = styled.div`
    float: right;
    width: 50%;
    height: 100%;
    background-image: url(/contents/assets/images/bg.png);
    background-repeat: no-repeat;
    background-size: cover;
    position: fixed;
    top: 0px;
    right: 0px;
`

export const InformativeAssidePannel = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #033655d9;
`

export const InfoMiddleAligner = styled.div`
    top: 50%;
    transform: translateY(-60%);
    position: absolute;
    width: 100%;
`

export const InfoMain = styled.div`
    font-size: 35pt;
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    width: 60%;
    margin: auto;
    text-align: center;
    margin-bottom: 55px;
`

export const InfoSub = styled.div`
    font-size: 20pt;
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    width: 70%;
    margin: auto;
    text-align: center;
    margin-bottom: 37px;
`

export const InfoJoinButton = styled(DefaultButton)`
    margin-bottom: 0px;
    background-color: #C55A11;
    color: white;
    padding: 17px;
    border-radius: 35px;
    font-size: 14pt;
    font-weight: 300;
`

export const InfoJoinButtonContainer = styled.div`
    width: 320px;
    margin: auto;
    margin-top: 100px;
`

export const FormReturnMessage = styled.div`
    :not(:empty){
        padding: 5px;
        border: 1px solid #b50000;
        border-radius: 10px;
        background-color: #1e0d14;
        font-size: 9.5pt;
        color: #b50000;
        font-family: 'Montserrat', sans-serif;
        font-weight: 300;
        text-align: center;
        margin-bottom: 20px;
    }
`