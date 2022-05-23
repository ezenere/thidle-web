import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Menu from "../../components/app/menu";
import Feed from "./main";
import Profile from "./profile";
import { UserContext } from "../../contexts/user"
import { HTTPRequest } from "../../workers/commons";
import { ThoughtsContext } from "../../contexts/thoughts";


export default function MainApp(){
    const [userInfoLoaded, setUserInfoLoaded] = useState(false);
    const [userInfoValues, setUserInfo] = useState({});
    const [rightSuggestion, setRightSuggestion] = useState(false);

    const updateRightSuggestions = (st) => {
        setRightSuggestion(st);
    }

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

    return <UserContext.Provider value={{values: userInfoValues, rightSuggestions: {loaded: rightSuggestion, update: updateRightSuggestions}, set: setUserContext}}>
        <Menu />
        <ThoughtsContext>
            <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/think/*" element={<div>Think</div>} />
                <Route path="/notifications" element={<div>Notifications</div>} />
                <Route path="/trending" element={<div>Trending</div>} />
                <Route path="/discover" element={<div>Discover</div>} />
                <Route path="/follow-suggestions" element={<div>Follow Suggestions</div>} />
                <Route path="/messages" element={<div>Messages</div>} />
                <Route path="*" element={<Profile />} />
            </Routes>
        </ThoughtsContext>
    </UserContext.Provider>
}