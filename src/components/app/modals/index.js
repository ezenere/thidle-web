import styled from "styled-components"

export const ModalBackgroudContainer = styled.div`
    position: fixed;
    width: 100%;;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 2000;
    background-color: rgba(0, 0, 0, 0.75);
    opacity: 1;
    visibility: visible;
    animation-name: modal-background;
    animation-duration: 0.2s;
    animation-iteration-count: 1;
    display: flex;
`

export const ModalBox = styled.div`
    width: ${props => props.width ?? '450px'};
    box-sizing: border-box;
    background-color: #0E1C25;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    display: flex;
    margin: auto;
    max-height: 80%;
    box-shadow: 0px 0px 15px #0c0c0c;
`

export const ModalHeader = styled.div`
    width: 100%;
    flex: 0 0 auto;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    border-bottom: 1px solid #033655;
`

export const ModalBody = styled.div`
    flex: 1 1 auto;
    max-height: 100%;
    min-height: 10px;
    overflow: auto;
`

export const ModalTitle = styled.div`
    flex: 1 0 auto;
    font-size: 16px;
    font-weight: 500;
    font-family: 'Ubuntu';
    text-align: center;
    padding: 10px;
    color: white;
`

export function ModalComponent(props){
    return (
        <ModalBackgroudContainer>
            <ModalBox width={props.width}>
                <ModalHeader>
                    <ModalTitle>{props.title}</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    {props.children}
                </ModalBody>
            </ModalBox>
        </ModalBackgroudContainer>
    )
}

export const ModalText = styled.div`
    font-size: 13px;
    line-height: 20px;
    font-family: 'Montserrat';
    color: rgb(255 255 255 / 75%);
    padding: 0px 15px;
    text-align: justify;
    margin-top: 10px;
`

function modalButtonColor(color){
    switch(color){ 
        case 'gray':
            return '#979797';
        
        case 'red':
            return '#a50a0a';
        
        case 'blue':
            return '#006CBE';
        
        case 'orange':
        default:
            return '#C55A11'; 
    }
}

export const ModalButton = styled.div`
    border-radius: 25px;
    background-color: transparent;
    border: 1px solid ${props => modalButtonColor(props.color) };
    color: ${props => props.textColor ?? (props.filled ? 'white' : modalButtonColor(props.color)) };
    padding: 0px;
    text-align: center;
    font-size: 10pt;
    width: 100%;
    cursor: pointer;
    padding: 7px 0px;
    font-family: 'Montserrat';
    font-weight: 300;
    vertical-align: middle;
    ${props => props.filled ? `background-color: ${modalButtonColor(props.color)};` : '' };
    ${props => props.filled ? `opacity: 0.8` : '' };
    transition: ${props => props.filled ? 'opacity' : `background-color`} 0.2s;
    :hover{
        ${props => props.filled ? 'opacity: 1;' : `background-color: ${modalButtonColor(props.color)}2F;` };
    }
    :not(:last-child){
        margin-bottom: 5px;
    }
`

export const ModalButtons = styled.div`
    margin-top: 10px;
    margin-bottom: 15px;
    width: 100%;
    box-sizing: border-box;
    padding: 0px 15px;
`