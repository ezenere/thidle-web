import { MainPostsContainer } from "../../../../components/app"
import { UserThoughts } from "../../../../components/app/thoughts"

export default function Thoughts({ username }){
    return (<>
        <MainPostsContainer>
            <UserThoughts user={username}/>
        </MainPostsContainer>
    </>);
}