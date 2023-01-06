import { MainAppContainer, MainContentContainer } from "../../components/app";
import NewThought from "../../components/app/new-thought";
import { FollowSuggestions, RightAdvertising, TrendingsMini } from "../../components/app/right-container";
import { RightOptionsContainer } from "../../components/app";
import { MainThoughts } from "../../components/app/thoughts";

export default function Feed(){
    document.title = `Thidle`;
    
    return (
        <MainAppContainer>
            <RightOptionsContainer>
                <FollowSuggestions />
                <TrendingsMini />
                <RightAdvertising />
            </RightOptionsContainer>

            <MainContentContainer>
                <NewThought />
                <MainThoughts/>
            </MainContentContainer>
        </MainAppContainer>
    )
}