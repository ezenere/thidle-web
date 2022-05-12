import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Menu from "../../components/app/menu";
import Feed from "./main";
import Profile from "./profile";
import { UserContext } from "../../contexts/user"
import { HTTPRequest } from "../../workers/commons";


export default function MainApp(){
    const [userInfoLoaded, setUserInfoLoaded] = useState(false);
    const [userInfoValues, setUserInfo] = useState({});

    const setUserContext = (key, value) => {
        userInfoValues[key] = value;
        setUserInfo(userInfoValues);
    }
    
    const getUserInfo = async () => {
        setUserInfo((await HTTPRequest('GET', '/api/v0/profile/mine')).data);
        setUserInfoLoaded(true);
    };
    
    useEffect(() => {
        document.body.classList.add("app");
        if(userInfoLoaded) document.querySelector('.thidle-loading-screen').classList.add("disabled");
        else getUserInfo();
    }, [userInfoLoaded, userInfoValues]);

    return <UserContext.Provider value={{values: userInfoValues, set: setUserContext}}>
        <Menu />
        <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="*" element={<Profile />} />
        </Routes>
    </UserContext.Provider>
}