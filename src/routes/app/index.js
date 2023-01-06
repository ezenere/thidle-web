import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Menu from "../../components/app/menu";
import Feed from "./main";
import Profile from "./profile";
import { UserContext } from "../../contexts/user"
import { HTTPRequest, LoadingOverlay } from "../../workers/commons";
import { ThoughtsContext } from "../../contexts/thoughts";
import { Modals, useModals } from "../../contexts/modals";


export default function MainApp(){
    const [userInfoLoaded, setUserInfoLoaded] = useState(false);
    const [userInfoValues, setUserInfo] = useState({});
    const [rightSuggestion, setRightSuggestion] = useState(false);
    const modals = useModals();

    const updateRightSuggestions = (st) => {
        setRightSuggestion(st);
    }

    const setUserContext = (key, value) => {
        userInfoValues[key] = value;
        setUserInfo(userInfoValues);
    }
    
    const getUserInfo = async () => {
        setUserInfo((await HTTPRequest('GET', '/v0/user/info')).data);
        setUserInfoLoaded(true);
    };

    const editUserProfile = (e) => {
        modals.open('editProfile', {
            cancel: (close) => close(),
            continue: (close) => close()
        });
    }
    
    useEffect(() => {
        document.body.classList.add("app");
        if(userInfoLoaded) LoadingOverlay(false);
        else getUserInfo();
    }, [userInfoLoaded, userInfoValues]);

    return (
        <UserContext.Provider value={{profileEdit: editUserProfile, values: userInfoValues, rightSuggestions: {loaded: rightSuggestion, update: updateRightSuggestions}, set: setUserContext}}>
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
            <Modals />
        </UserContext.Provider>
    )
}