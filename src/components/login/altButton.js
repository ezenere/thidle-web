import styled from "styled-components";
import { DefaultButton } from ".";

export default function AlternativeButton(props){
    return(
        <AltButton>
            <ButtonLogoContainer>
                <ButtonLogo alt={props.alt} src={props.src}/>
            </ButtonLogoContainer>
            <ButtonText>{props.title}</ButtonText>
        </AltButton>
    )
}

const AltButton = styled(DefaultButton)`
    font-size: 0px;
    padding: 8px;
`

const ButtonLogoContainer = styled.span`
    width: 40%;
    display: inline-block;
    text-align: right;
    vertical-align: middle;
`

const ButtonLogo = styled.img`
    width: 15px;
    height: 15px;
`

const ButtonText = styled.span`
    display: inline-block;
    width: 60%;
    font-size: 10.5pt;
    text-align: left;
    vertical-align: middle;
    box-sizing: border-box;
    padding-left: 12px;
`