import React, { useContext, useState } from "react";

const ThoughtsCtx = React.createContext([]);

export function useThoughts(){
    return useContext(ThoughtsCtx);
}

export function ThoughtsContext(props){
    const [publications, setPublications] = useState([]);

    const setPublicationsContext = (items) => {
        setPublications(items);
    }

    return (
        <ThoughtsCtx.Provider value={[publications, setPublicationsContext]}>
            {props.children}
        </ThoughtsCtx.Provider>
    )
}