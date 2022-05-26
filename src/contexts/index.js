import React, { useContext, useEffect, useReducer } from "react"
import styled from "styled-components"
import { ModalContinue } from "../components/app/modals/continue";
const ModalCtx = React.createContext([]);

const mainModals = {
    continue: {
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
                ([modals]) => {
                    return [
                        modals.continue.active && <ModalContinue options={modals.continue.options} />,
                    ]
                }
            }
        </ModalCtx.Consumer>
    )
}

export const ModalBackgroudContainer = styled.div`
    position: fixed;
`