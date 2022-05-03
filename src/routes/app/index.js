import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Menu from "../../components/app/menu";
import Feed from "./main";
import { UserContext } from "../../contexts/user"


export default function MainApp(){
    const [userInfoValues, setUserInfo] = useState({
        name: 'Eduardo Zenere',
        username: 'ezenere',
        profile: 'https://pbs.twimg.com/profile_images/1480770095391641604/zbiqroKJ_400x400.jpg',
        background: '/contents/assets/images/bg-image.jpg'
    });

    const setUserContext = (key, value) => {
        userInfoValues[key] = value;
        setUserInfo(userInfoValues);
    }
    
    useEffect(() => {
        document.body.classList.add("app");
    });

    return (
        <UserContext.Provider value={{values: userInfoValues, set: setUserContext}}>
            <Menu />
            <Routes>
                <Route path="/" element={<Feed />} />
            </Routes>
        </UserContext.Provider>
    );
}