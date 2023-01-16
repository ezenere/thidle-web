import React, { useContext, useReducer } from "react";

const ThoughtsCtx = React.createContext({});

const def = {limit: 30, page: 0, items: [], loading: false, loaded: false};
function reduce(state, [name, value]) {
    if(name === '__clear_all__') return {}
    state[name] = { ...def, ...state[name], ...value };
    return { ...state }
}

export function useThoughts(name){
    const [values, setValues] = useContext(ThoughtsCtx);
    const value = { ...def, ...values[name] };
    const setValue = (val) => {
        setValues([name, val]);
    }
    return [value, setValue];
}

export function ThoughtsContext(props){
    const red = useReducer(reduce, {});

    return (
        <ThoughtsCtx.Provider value={red}>
            {props.children}
        </ThoughtsCtx.Provider>
    )
}