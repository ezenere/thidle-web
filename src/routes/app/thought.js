import { MainAppContainer, MainContentContainer } from "../../components/app";
import { FollowSuggestions, RightAdvertising, TrendingsMini } from "../../components/app/right-container";
import { RightOptionsContainer } from "../../components/app";
import { Thought } from "../../components/app/thoughts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HTTPRequest } from "../../workers/commons";

export default function SingleThought(){
    const { thought } = useParams();

    const [data, setData] = useState(null);
    const [comments, setComments] = useState(null);

    useEffect(() => {
        HTTPRequest("GET", `/v0/thought/${thought}?comments=30&depht=2`).then((result) => {
            setData(result.data.result);
        }).catch((e) => {
            console.log(e);
        });
    }, [thought]);

    document.title = `Thidle - Thought${data ? ` by ${data.by.name} (@${data.by.username})` : ''}`;
    
    return (
        <MainAppContainer>
            <RightOptionsContainer>
                <FollowSuggestions />
                <TrendingsMini />
                <RightAdvertising />
            </RightOptionsContainer>

            <MainContentContainer>
                {data && <Thought data={data} featured={true} />}
            </MainContentContainer>
        </MainAppContainer>
    )
}