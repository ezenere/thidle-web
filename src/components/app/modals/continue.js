import { ModalButton, ModalButtons, ModalComponent, ModalText } from ".";

export function ModalContinue({options, modals, name}){
    const close = () => {
        modals.close(name)
    }

    return (
        <ModalComponent title={options.title} width={options.width ?? "250px"}>
            <ModalText>{options.description}</ModalText>
            <ModalButtons>
                {options.continue ? <ModalButton filled={true} color="orange" onClick={() => options.continue(close)}>{options.buttons?.continue ?? "Continuar"}</ModalButton> : false}
                {options.cancel ? <ModalButton color="gray" textColor="lightgray" onClick={() => options.cancel(close)}>{options.buttons?.cancel ?? "Cancelar"}</ModalButton> : false}
            </ModalButtons>
        </ModalComponent>
    )
}