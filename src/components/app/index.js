import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export function AdditionalOption(props){
    return (
        <AdditionalOptionContainer isActive={props.isActive}>
            <AdditionalOptionButton>
                {props.icon ? <AdditionalOptionIcon>{props.icon}</AdditionalOptionIcon> : ''}
                {props.title ? <AdditionalOptionText>{props.title}</AdditionalOptionText> : ''}
            </AdditionalOptionButton>
        </AdditionalOptionContainer>
    )
}

export function Parallax(props){
    // eslint-disable-next-line
    const [offset, setOffset] = useState(0);
    const ref = useRef();
    let imageNaturalHeight = false;

    useEffect(() => {
        // eslint-disable-next-line
        imageNaturalHeight = ref.current?.clientHeight
        const onScroll = () => {
            let newOs = document.querySelector("#thidle").scrollTop;
            let newS = calcStyle(newOs);
            ref.current.style.transform = newS.transform;
            ref.current.style.filter = newS.filter;
            setOffset(newOs);
        }
        let newOs = document.querySelector("#thidle").scrollTop;
        let newS = calcStyle(newOs);
        ref.current.style.transform = newS.transform;
        ref.current.style.filter = newS.filter;

        document.querySelector("#thidle").removeEventListener('scroll', onScroll);
        document.querySelector("#thidle").addEventListener('scroll', onScroll, { passive: true });
        return () => document.querySelector("#thidle").removeEventListener('scroll', onScroll);
    });

    const calcStyle = (os) => {
        let translate = Math.floor(os*(props.strenght ?? 0.5));
        return {transform: `translateY(${Math.min(translate, imageNaturalHeight ? imageNaturalHeight : translate)}px)`, filter: `blur(${props.blur ? Math.max(Math.min(parseInt(props.blur * (props.strenght ?? 0.5) * os / 150), props.blur), 0) : 0}px)`}
    }

    return (
        <ParallaxContainer>
            <img ref={ref} className={props.className} src={props.src} alt={props.alt}/>
        </ParallaxContainer>
    )
}

const ParallaxContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
`

export const OptionsContainer = styled.div`
    display: flex;
    margin-top:  ${props => props.marginTop ?? "12px"};
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    background-color: #0E1C25;
    overflow: hidden;
    border-radius: 5px;
`

const AdditionalOptionContainer = styled.div`
    flex: 1 1 0;
    text-align: center;
    user-select: none;
    align-items: center;
    padding: 4px;
    padding-bottom: 7px;
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;
    :not(:last-child){
        border-right: 1px solid #033655;
    }
    ${props => props.isActive ? `
        background-color: #1A2830;
        color: #C55A11;
    ` : `
        color: rgb(255 255 255 / 75%);
        :hover{
            color: white;
        }
    `}
`

const AdditionalOptionButton = styled.span`
    display: inline-block;
`

const AdditionalOptionIcon = styled.span.attrs({
    className: 'material-icons-round'
})`
    font-size: 14px;
    display: inline-block;
    vertical-align: middle;
`

const AdditionalOptionText = styled.span`
    font-size: 7pt;
    font-family: 'Montserrat', sans-serif;
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
    font-weight: 500;
`

export const MainAppContainer = styled.div`
    max-width: 950px;
    margin: auto;
    margin-top: ${props => props.marginTop ?? "80px"};
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
    ${props => props.marginTop ? `margin-top: ${props.marginTop};` : ''}
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