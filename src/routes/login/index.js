import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./login";
import SignUp from "./signup";

export default function LoginApp(){
    useEffect(() => {
        document.body.classList.remove("app");
    });
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<Login />} />
            <Route path="/privacy-policy" element={<Login />} />
            <Route path="/terms-of-service" element={<Login />} />
            <Route path="/cookie-policy" element={<Login />} />
        </Routes>
    );
}