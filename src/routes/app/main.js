import { MainAppContainer, MainContentContainer } from "../../components/app";
import NewThought from "../../components/app/new-thought";
import { FollowSuggestions, RightAdvertising, TrendingsMini } from "../../components/app/right-container";
import { RightOptionsContainer } from "../../components/app";
import { Thoughts } from "../../components/app/thoughts";
import ReactGA from 'react-ga';
import { useEffect } from "react";

export default function Feed(){
    document.title = `Thidle`;

    useEffect(()=>{
        ReactGA.pageview(window.location.pathname + window.location.search);
    })
    return (
        <MainAppContainer>
            <RightOptionsContainer>
                <FollowSuggestions />
                <TrendingsMini />
                <RightAdvertising />
            </RightOptionsContainer>

            <MainContentContainer>
                <NewThought />
                <Thoughts location="main"/>
            </MainContentContainer>
        </MainAppContainer>
    )
}