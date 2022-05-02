import { Route, Routes } from "react-router-dom";
import Menu from "../../components/app/menu";
import Feed from "./main";

export default function MainApp(){
    return (
        <>
            <Menu />
            <Routes>
                <Route path="/" element={<Feed />} />
            </Routes>
        </>
    );
}