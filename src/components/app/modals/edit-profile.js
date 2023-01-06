import { ModalButton, ModalButtons, ModalComponent, ModalText } from ".";

export function ModalEditProfile({options, modals, name}){
    const close = () => {
        modals.close(name)
    }

    return (
        <ModalComponent title={"Edit Profile"} width={"500px"}>
            <ModalText>{""}</ModalText>
            <ModalButtons>
                <ModalButton filled={true} color="orange" onClick={() => options.continue(close)}>Save</ModalButton>
                <ModalButton color="gray" textColor="lightgray" onClick={() => options.cancel(close)}>Cancel</ModalButton>
            </ModalButtons>
        </ModalComponent>
    )
}