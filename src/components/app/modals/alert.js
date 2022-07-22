import { ModalButton, ModalButtons, ModalComponent, ModalText } from ".";

export function ModalAlert({options, modals, name}){
    const close = () => {
        modals.close(name)
    }

    return (
        <ModalComponent title={options.title ?? 'Alerta'} width={options.width ?? "250px"}>
            <ModalText>{options.text}</ModalText>
            <ModalButtons>
                <ModalButton filled={true} color="orange" onClick={() => options.continue ? options.continue(close) : close()}>{options.buttons?.continue ?? "Continuar"}</ModalButton>
            </ModalButtons>
        </ModalComponent>
    )
}