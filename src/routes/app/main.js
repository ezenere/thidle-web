import { MainAppContainer, MainContentContainer } from "../../components/app";
import NewThought from "../../components/app/new-thought";
import { FollowSuggestions, RightAdvertising, TrendingsMini } from "../../components/app/right-container";
import { RightOptionsContainer, MainPostsContainer } from "../../components/app";
import { Thought } from "../../components/app/thoughts";
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
                <MainPostsContainer>
                    <Thought 
                        name={'Eduardo Zenere'}
                        picture={'https://pbs.twimg.com/profile_images/1480770095391641604/zbiqroKJ_400x400.jpg'}
                        username={'ezenere'}
                        privacy={0}
                        date={'Thu, 12:00'}
                        text={'Rede social incrível essa!'}
                        liked={true}
                        likes={21398}
                        reposted={false}
                        reposts={9058}
                        commented={false}
                        comments={342}
                    />
                    <Thought 
                        name={'Eduardo Zenere'}
                        picture={'https://pbs.twimg.com/profile_images/1480770095391641604/zbiqroKJ_400x400.jpg'}
                        username={'ezenere'}
                        privacy={0}
                        date={'Thu, 12:00'}
                        text={'Teste com imagens!'}
                        liked={true}
                        likes={21398}
                        reposted={false}
                        reposts={9058}
                        commented={false}
                        comments={342}
                        images={[
                            {alt: "", url: "/contents/assets/images/bg-image.jpg"},
                            {alt: "", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Un_%C3%A9t%C3%A9_au_bois_de_Vincennes_%2848108771342%29.jpg/1920px-Un_%C3%A9t%C3%A9_au_bois_de_Vincennes_%2848108771342%29.jpg"},
                            {alt: "", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Paris_raining_autumn_cityscape_%288252181936%29.jpg/1920px-Paris_raining_autumn_cityscape_%288252181936%29.jpg"},
                            {alt: "", url: "https://images3.alphacoders.com/853/thumb-1920-85305.jpg"},
                            {alt: "", url: "https://img.freepik.com/free-photo/modern-futuristic-sci-fi-background_35913-2152.jpg?size=626&ext=jpg"},
                            {alt: "", url: "https://img.freepik.com/free-photo/abstract-grunge-decorative-relief-navy-blue-stucco-wall-textur-rough-colored-background_1258-28311.jpg?size=626&ext=jpg"},
                            {alt: "", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Paris_vue_d%27ensemble_tour_Eiffel.jpg/1920px-Paris_vue_d%27ensemble_tour_Eiffel.jpg"},
                            {alt: "", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Paris_Opera_full_frontal_architecture%2C_May_2009.jpg/1920px-Paris_Opera_full_frontal_architecture%2C_May_2009.jpg"},
                            {alt: "", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Arcdetriomphe_2.jpg/1920px-Arcdetriomphe_2.jpg"},
                            {alt: "", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Louvre_Courtyard%2C_Looking_West.jpg/1920px-Louvre_Courtyard%2C_Looking_West.jpg"},
                        ]}
                    />

                    
                    <Thought 
                        name={'Eduardo Zenere'}
                        picture={'https://pbs.twimg.com/profile_images/1480770095391641604/zbiqroKJ_400x400.jpg'}
                        username={'ezenere'}
                        privacy={0}
                        date={'Thu, 12:00'}
                        text={'Teste com imagens!'}
                        liked={true}
                        likes={21398}
                        reposted={false}
                        reposts={9058}
                        commented={false}
                        comments={342}
                        hasRethink={true}
                        rethink={{
                            name: 'Eduardo Zenere',
                            picture: 'https://pbs.twimg.com/profile_images/1480770095391641604/zbiqroKJ_400x400.jpg',
                            username: 'ezenere',
                            privacy: 0,
                            date: 'Thu, 12:00',
                            text: 'Teste com imagens!',
                            liked: true,
                            likes: 21398,
                            reposted: false,
                            reposts: 9058,
                            commented: false,
                            comments: 342
                        }}
                        commentItems={[
                            {
                                name: 'Eduardo Zenere',
                                picture: 'https://pbs.twimg.com/profile_images/1480770095391641604/zbiqroKJ_400x400.jpg',
                                username: 'ezenere',
                                privacy: 0,
                                date: 'Thu, 12:00',
                                text: 'Teste com imagens!',
                                liked: true,
                                likes: 21398,
                                reposted: false,
                                reposts: 9058,
                                commented: false,
                                comments: 342,
                                primary: true,
                                isSubcomment: false
                            },
                            {
                                name: 'Eduardo Zenere',
                                picture: 'https://pbs.twimg.com/profile_images/1480770095391641604/zbiqroKJ_400x400.jpg',
                                username: 'ezenere',
                                privacy: 0,
                                date: 'Thu, 12:00',
                                text: 'Teste com imagens!',
                                liked: true,
                                likes: 21398,
                                reposted: false,
                                reposts: 9058,
                                commented: false,
                                comments: 342,
                                primary: false,
                                isSubcomment: true
                            },
                            {
                                name: 'Eduardo Zenere',
                                picture: 'https://pbs.twimg.com/profile_images/1480770095391641604/zbiqroKJ_400x400.jpg',
                                username: 'ezenere',
                                privacy: 0,
                                date: 'Thu, 12:00',
                                text: 'Teste com imagens!',
                                liked: true,
                                likes: 21398,
                                reposted: false,
                                reposts: 9058,
                                commented: false,
                                comments: 342,
                                primary: true,
                                isSubcomment: false
                            }
                        ]}
                    />
                </MainPostsContainer>
            </MainContentContainer>
        </MainAppContainer>
    )
}