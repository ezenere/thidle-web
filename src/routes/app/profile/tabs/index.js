import { Route, Routes } from "react-router-dom";
import Comments from "./comments";
import Likes from "./likes";
import Media from "./media";
import Swifts from "./swifts";
import Thoughts from "./thoughts";

export default function ProfileTabs({ username }){
    return (
        <Routes>
            <Route path="/" element={<Thoughts username={username} />} />
            <Route path="/comments" element={<Comments />} />
            <Route path="/swifts" element={<Swifts />} />
            <Route path="/media" element={<Media />} />
            <Route path="/likes" element={<Likes />} />
        </Routes>
    );
}