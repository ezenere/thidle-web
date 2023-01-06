import React, { useContext, useReducer } from "react"
import { ModalAlert } from "../components/app/modals/alert";
import { ModalContinue } from "../components/app/modals/continue";
import { ModalEditProfile } from "../components/app/modals/edit-profile";
const ModalCtx = React.createContext([]);

const mainModals = {
    continue: {
        active: false,
        options: null
    },
    alert: {
        active: false,
        options: null
    },
    editProfile: {
        active: false,
        options: null
    }
}


export function useModals(){
    return useContext(ModalCtx)[1];
}

export function updateModals(state, action){
    state[action.modal].active = action.open
    state[action.modal].options = action.options

    return {...state};
}

export function ModalsContext(props){
    const [modals, dispatch] = useReducer(updateModals, mainModals);

    const modalOptions = {
        open: (modal, options) => {
            dispatch({modal, options, open: true})
        },
        close: (modal) => {
            dispatch({modal, options: null, open: false})
        }
    }

    return (
        <ModalCtx.Provider value={[modals, modalOptions]}>
            {props.children}
        </ModalCtx.Provider>
    )
}

export function Modals(){
    return (
        <ModalCtx.Consumer>
            {
                ([modals, modalFunc]) => {
                    return [
                        modals.continue.active && <ModalContinue options={modals.continue.options} modals={modalFunc} name="continue" />,
                        modals.alert.active && <ModalAlert options={modals.alert.options} modals={modalFunc} name="alert" />,
                        modals.editProfile.active && <ModalEditProfile options={modals.editProfile.options} modals={modalFunc} name="editProfile" />,
                    ]
                }
            }
        </ModalCtx.Consumer>
    )
}