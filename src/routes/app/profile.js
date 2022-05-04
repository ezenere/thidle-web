import { AdditionalOption, MainAppContainer, MainContentContainer, OptionsContainer, Parallax } from "../../components/app";
import { FollowSuggestions, RightAdvertising } from "../../components/app/right-container";
import { RightOptionsContainer, MainPostsContainer } from "../../components/app";
import RightUserInfo from "../../components/app/profile";
import { Thought } from "../../components/app/thoughts";

export default function Profile(props){
    return (
        <MainAppContainer marginTop="60px">
            <div className="thidle-user-profile-main-info-background-container">
                <div className="thidle-user-profile-main-info-background-image-container">
                    <Parallax strenght={0.5} blur={4} className="thidle-user-profile-main-info-background-image" src={props.backgroundImage} alt={props.backgroundAlt}/>
                </div>
            </div>
            <RightOptionsContainer marginTop="5px">
                <RightUserInfo 
                    userImage={props.userImage}
                    name={props.name}
                    username={props.username}
                    creation="2022-05-04"
                    description="Se você acha que a vida tem sentido, não se engane, você deu sentido à ela."
                    country="Brazil"
                    displayBirthday={true}
                    birthday="2001-04-20"
                    gender="M"
                    website="https://www.ezenere.com"
                    instagram="edu_zenere"
                    friendObservedCount={75}
                    friendObservedUsers={[
                        {name: "Isabella", username: "isabella", userImage: "https://pbs.twimg.com/profile_images/1366347406711881731/-wtv05qD_400x400.jpg"},
                        {name: "myrella", username: "myrella", userImage: "https://pbs.twimg.com/profile_images/1521666869312344064/V0cm7nwe_400x400.jpg"},
                        {name: "Guilherme com H Tigor T. Tigre", username: "guilherme", userImage: "https://pbs.twimg.com/profile_images/1362611619939971074/Apa1qP5o_400x400.jpg"},
                        {name: "Felipe Zenere", username: "zevski", userImage: "https://pbs.twimg.com/profile_images/1376039440842420224/g3AHJ5IT_400x400.jpg"},
                    ]}
                />
                <FollowSuggestions />
                <RightAdvertising />
            </RightOptionsContainer>
            <MainContentContainer>
                <div className="thidle-user-profile-main-info-container">
                    <div className="thidle-user-profile-image-container">
                        <img className="thidle-user-profile-image" src={props.userImage} alt={`${props.name} Profile`}/>
                    </div>
                    <div className="thidle-user-profile-info-container">
                        <button className="thidle-user-profile-observe-button">
                            <span className="thidle-user-profile-observe-button-text">Observe</span>
                            <span className="thidle-user-profile-observe-button-icon material-icons-round">person_add</span>
                        </button>
                        <span className="thidle-user-profile-name">{props.name}</span>
                        <span className="thidle-user-profile-username">@{props.username}</span>
                        <div className="thidle-user-profile-stats-container">
                            <div className="thidle-user-profile-stat">
                                <span className="thidle-user-profile-stat-number">{props.observers}</span>
                                <span className="thidle-user-profile-stat-text">Observers</span>
                            </div>
                            <div className="thidle-user-profile-stat">
                                <span className="thidle-user-profile-stat-number">{props.observing}</span>
                                <span className="thidle-user-profile-stat-text">Observing</span>
                            </div>
                            <div className="thidle-user-profile-stat">
                                <span className="thidle-user-profile-stat-number">{props.thoughts}</span>
                                <span className="thidle-user-profile-stat-text">Likes</span>
                            </div>
                        </div>
                    </div>
                </div>

                <OptionsContainer marginTop="20px">
                    <AdditionalOption isActive={true} title="Thoughts" />
                    <AdditionalOption title="Media" />
                    <AdditionalOption title="Likes" />
                </OptionsContainer>

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