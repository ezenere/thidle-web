import { MainAppContainer, MainContentContainer } from "../../components/app";
import NewThought from "../../components/app/new-thought";
import { FollowSuggestions, RightAdvertising, TrendingsMini } from "../../components/app/right-container";
import { RightOptionsContainer, MainPostsContainer } from "../../components/app";
import { Thought } from "../../components/app/thoughts";

export default function Feed(){
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



                    <div class="thidle-think-main-publication-container">
                        <div class="thidle-think-primary-content-isolation">
                            <div class="thidle-think-top-info-container">
                                <div class="thidle-think-user-picture-main-container">
                                    <div class="thidle-think-user-picture-container">
                                        <img alt="Thidle Think User Picture" class="thidle-think-user-picture" src="https://scontent.fbfh17-1.fna.fbcdn.net/v/t1.6435-9/62012381_2093728100740127_3129459823523921920_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=800rx3t8-xMAX_Nlaim&_nc_ht=scontent.fbfh17-1.fna&oh=c7ad4ab06435a06d129ab86aed896c58&oe=61CD41FF"/>
                                    </div>
                                </div>
                                <div class="thidle-think-user-info-main-container">
                                    <div class="thidle-think-user-info-name-container">
                                        <span class="thidle-think-user-complete-info-container"><span class="thidle-think-user-info-name">Barbaa</span><span class="thidle-think-user-info-username">@barbosa</span></span>
                                    </div>
                                    <div class="thidle-think-info-container">
                                        <span class="thidle-think-info-privacy">Public</span><span class="thidle-think-info-date">Thu, 12:00</span>
                                    </div>
                                </div>
                                <div class="thidle-think-options-main-container">
                                    <button class="thidle-think-options-button">
                                        <span class="thidle-think-options-icon material-icons">more_horiz</span>
                                    </button>
                                </div>
                            </div>
                            <div class="thidle-think-content-container">
                                <div class="thidle-think-content-text">Algumas imagens aleatórias ai pra vcs</div>
                                <div class="thidle-think-content-image-album-container">
                                    <div class="thidle-think-content-image-album">
                                        <div class="thidle-think-content-image-container">
                                            <img class="thidle-think-content-image" src="https://pbs.twimg.com/profile_images/1381455687713239041/G7Na26NV_400x400.jpg"/>
                                        </div>
                                        <div class="thidle-think-content-image-container">
                                            <img class="thidle-think-content-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Un_%C3%A9t%C3%A9_au_bois_de_Vincennes_%2848108771342%29.jpg/1920px-Un_%C3%A9t%C3%A9_au_bois_de_Vincennes_%2848108771342%29.jpg"/>
                                        </div>
                                        <div class="thidle-think-content-image-container">
                                            <img class="thidle-think-content-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Paris_raining_autumn_cityscape_%288252181936%29.jpg/1920px-Paris_raining_autumn_cityscape_%288252181936%29.jpg"/>
                                        </div>
                                        <div class="thidle-think-content-image-container">
                                            <img class="thidle-think-content-image" src="https://images3.alphacoders.com/853/thumb-1920-85305.jpg"/>
                                        </div>
                                        <div class="thidle-think-content-image-container">
                                            <img class="thidle-think-content-image" src="https://img.freepik.com/free-photo/modern-futuristic-sci-fi-background_35913-2152.jpg?size=626&ext=jpg"/>
                                        </div>
                                        <div class="thidle-think-content-image-container">
                                            <img class="thidle-think-content-image" src="https://img.freepik.com/free-photo/abstract-grunge-decorative-relief-navy-blue-stucco-wall-texture-wide-angle-rough-colored-background_1258-28311.jpg?size=626&ext=jpg"/>
                                        </div>
                                        <div class="thidle-think-content-image-container">
                                            <img class="thidle-think-content-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Paris_vue_d%27ensemble_tour_Eiffel.jpg/1920px-Paris_vue_d%27ensemble_tour_Eiffel.jpg"/>
                                        </div>
                                        <div class="thidle-think-content-image-container">
                                            <img class="thidle-think-content-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Paris_Opera_full_frontal_architecture%2C_May_2009.jpg/1920px-Paris_Opera_full_frontal_architecture%2C_May_2009.jpg"/>
                                        </div>
                                        <div class="thidle-think-content-image-container">
                                            <img class="thidle-think-content-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Arcdetriomphe_2.jpg/1920px-Arcdetriomphe_2.jpg"/>
                                        </div>
                                        <div class="thidle-think-content-image-container">
                                            <img class="thidle-think-content-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Louvre_Courtyard%2C_Looking_West.jpg/1920px-Louvre_Courtyard%2C_Looking_West.jpg"/>
                                        </div>
                                    </div>
                                    <div class="thidle-think-content-image-album-options-container">
                                        <div class="thidle-think-content-image-album-next material-icons-round"></div>
                                        <div class="thidle-think-content-image-album-previous material-icons-round"></div>
                                        <div class="thidle-think-content-image-album-image-selectors">
                                            <i class="thidle-think-content-image-album-image-selector"></i>
                                            <i class="thidle-think-content-image-album-image-selector"></i>
                                            <i class="thidle-think-content-image-album-image-selector"></i>
                                            <i class="thidle-think-content-image-album-image-selector"></i>
                                            <i class="thidle-think-content-image-album-image-selector"></i>
                                            <i class="thidle-think-content-image-album-image-selector"></i>
                                            <i class="thidle-think-content-image-album-image-selector"></i>
                                            <i class="thidle-think-content-image-album-image-selector"></i>
                                            <i class="thidle-think-content-image-album-image-selector"></i>
                                            <i class="thidle-think-content-image-album-image-selector"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="thidle-think-options-container">
                                <div class="thidle-think-options-right-box">
                                    <div class="thidle-think-option-button">
                                        <span class="thidle-think-option-button-icon active material-icons">share</span>
                                    </div>
                                </div>
                                <div class="thidle-think-options-left-box">
                                    <div class="thidle-think-option-button">
                                        <span class="thidle-think-option-button-icon material-icons">favorite</span>
                                        <span class="thidle-think-option-button-text">15K</span>
                                    </div>
                                    <div class="thidle-think-option-button active">
                                        <span class="thidle-think-option-button-icon material-icons">repeat</span>
                                        <span class="thidle-think-option-button-text">5K</span>
                                    </div>
                                    <div class="thidle-think-option-button">
                                        <span class="thidle-think-option-button-icon material-icons">comment</span>
                                        <span class="thidle-think-option-button-text">561</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="thidle-think-main-publication-container">
                        <div class="thidle-think-primary-content-isolation">
                            <div class="thidle-think-top-info-container">
                                <div class="thidle-think-user-picture-main-container">
                                    <div class="thidle-think-user-picture-container">
                                        <img alt="Thidle Think User Picture" class="thidle-think-user-picture" src="https://scontent.fbfh17-1.fna.fbcdn.net/v/t1.6435-1/p200x200/138376100_3685230564906254_4045498374643321894_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=7206a8&_nc_ohc=XDopRUXu_dsAX_TidYf&_nc_ht=scontent.fbfh17-1.fna&oh=0e9b24ee97e7fd7ffa47f7713b121ef0&oe=61CAAF6B"/>
                                    </div>
                                </div>
                                <div class="thidle-think-user-info-main-container">
                                    <div class="thidle-think-user-info-name-container">
                                        <span class="thidle-think-user-complete-info-container"><span class="thidle-think-user-info-name">Guilherme Scroccaro</span><span class="thidle-think-user-info-username">@guilherme</span></span>
                                    </div>
                                    <div class="thidle-think-info-container">
                                        <span class="thidle-think-info-privacy">Public</span><span class="thidle-think-info-date">Thu, 12:00</span>
                                    </div>
                                </div>
                                <div class="thidle-think-options-main-container">
                                    <button class="thidle-think-options-button">
                                        <span class="thidle-think-options-icon material-icons">more_horiz</span>
                                    </button>
                                </div>
                            </div>
                            <div class="thidle-think-content-container">
                                <div class="thidle-think-content-text">tive uma ideia muito boa</div>
                            </div>
                            <div class="thidle-think-options-container">
                                <div class="thidle-think-options-right-box">
                                    <div class="thidle-think-option-button">
                                        <span class="thidle-think-option-button-icon active material-icons">share</span>
                                    </div>
                                </div>
                                <div class="thidle-think-options-left-box">
                                    <div class="thidle-think-option-button active">
                                        <span class="thidle-think-option-button-icon material-icons">favorite</span>
                                        <span class="thidle-think-option-button-text">15K</span>
                                    </div>
                                    <div class="thidle-think-option-button">
                                        <span class="thidle-think-option-button-icon material-icons">repeat</span>
                                        <span class="thidle-think-option-button-text">5K</span>
                                    </div>
                                    <div class="thidle-think-option-button">
                                        <span class="thidle-think-option-button-icon material-icons">comment</span>
                                        <span class="thidle-think-option-button-text">561</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="thidle-think-comments-container">

                            <div class="thidle-think-main-publication-container comment has-continuation is-primary-comment">
                                <div class="thidle-think-primary-content-isolation">
                                    <div class="thidle-think-top-info-container">
                                        <div class="thidle-think-user-picture-main-container">
                                            <div class="thidle-think-user-picture-container">
                                                <img alt="Thidle Think User Picture" class="thidle-think-user-picture" src="https://pbs.twimg.com/profile_images/1396628792177725443/RpYKScOu_400x400.jpg"/>
                                            </div>
                                        </div>
                                        <div class="thidle-think-user-info-main-container">
                                            <div class="thidle-think-user-info-name-container">
                                                <span class="thidle-think-user-complete-info-container"><span class="thidle-think-user-info-name">Leonardo</span><span class="thidle-think-user-info-username">@leonardo</span></span>
                                            </div>
                                            <div class="thidle-think-info-container">
                                                <span class="thidle-think-info-privacy">Public</span><span class="thidle-think-info-date">Thu, 12:00</span>
                                            </div>
                                        </div>
                                        <div class="thidle-think-options-main-container">
                                            <button class="thidle-think-options-button">
                                                <span class="thidle-think-options-icon material-icons">more_horiz</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="thidle-think-content-container">
                                        <div class="thidle-think-content-text">A Golden Gate..........</div>
                                        <div class="thidle-think-content-image-album-container">
                                            <div class="thidle-think-content-image-album">
                                                <div class="thidle-think-content-image-container">
                                                    <img class="thidle-think-content-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Golden_Gate_1.jpg/1920px-Golden_Gate_1.jpg"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="thidle-think-options-container">
                                        <div class="thidle-think-options-right-box">
                                            <div class="thidle-think-option-button">
                                                <span class="thidle-think-option-button-icon active material-icons">share</span>
                                            </div>
                                        </div>
                                        <div class="thidle-think-options-left-box">
                                            <div class="thidle-think-option-button active">
                                                <span class="thidle-think-option-button-icon material-icons">favorite</span>
                                                <span class="thidle-think-option-button-text">15K</span>
                                            </div>
                                            <div class="thidle-think-option-button">
                                                <span class="thidle-think-option-button-icon material-icons">repeat</span>
                                                <span class="thidle-think-option-button-text">5K</span>
                                            </div>
                                            <div class="thidle-think-option-button">
                                                <span class="thidle-think-option-button-icon material-icons">comment</span>
                                                <span class="thidle-think-option-button-text">561</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="thidle-think-main-publication-container comment has-continuation">
                                <div class="thidle-think-primary-content-isolation">
                                    <div class="thidle-think-top-info-container">
                                        <div class="thidle-think-user-picture-main-container">
                                            <div class="thidle-think-user-picture-container">
                                                <img alt="Thidle Think User Picture" class="thidle-think-user-picture" src="https://pbs.twimg.com/profile_images/1396628792177725443/RpYKScOu_400x400.jpg"/>
                                            </div>
                                        </div>
                                        <div class="thidle-think-user-info-main-container">
                                            <div class="thidle-think-user-info-name-container">
                                                <span class="thidle-think-user-complete-info-container"><span class="thidle-think-user-info-name">Leonardo</span><span class="thidle-think-user-info-username">@leonardo</span></span>
                                            </div>
                                            <div class="thidle-think-info-container">
                                                <span class="thidle-think-info-privacy">Public</span><span class="thidle-think-info-date">Thu, 12:00</span>
                                            </div>
                                        </div>
                                        <div class="thidle-think-options-main-container">
                                            <button class="thidle-think-options-button">
                                                <span class="thidle-think-options-icon material-icons">more_horiz</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="thidle-think-content-container">
                                        <div class="thidle-think-content-text">Teste de comentário pequeno</div>
                                    </div>
                                    <div class="thidle-think-options-container">
                                        <div class="thidle-think-options-right-box">
                                            <div class="thidle-think-option-button">
                                                <span class="thidle-think-option-button-icon active material-icons">share</span>
                                            </div>
                                        </div>
                                        <div class="thidle-think-options-left-box">
                                            <div class="thidle-think-option-button active">
                                                <span class="thidle-think-option-button-icon material-icons">favorite</span>
                                                <span class="thidle-think-option-button-text">15K</span>
                                            </div>
                                            <div class="thidle-think-option-button">
                                                <span class="thidle-think-option-button-icon material-icons">repeat</span>
                                                <span class="thidle-think-option-button-text">5K</span>
                                            </div>
                                            <div class="thidle-think-option-button">
                                                <span class="thidle-think-option-button-icon material-icons">comment</span>
                                                <span class="thidle-think-option-button-text">561</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="thidle-think-main-publication-container comment is-primary-comment">
                                <div class="thidle-think-primary-content-isolation">
                                    <div class="thidle-think-top-info-container">
                                        <div class="thidle-think-user-picture-main-container">
                                            <div class="thidle-think-user-picture-container">
                                                <img alt="Thidle Think User Picture" class="thidle-think-user-picture" src="https://pbs.twimg.com/profile_images/1396628792177725443/RpYKScOu_400x400.jpg"/>
                                            </div>
                                        </div>
                                        <div class="thidle-think-user-info-main-container">
                                            <div class="thidle-think-user-info-name-container">
                                                <span class="thidle-think-user-complete-info-container"><span class="thidle-think-user-info-name">Leonardo</span><span class="thidle-think-user-info-username">@leonardo</span></span>
                                            </div>
                                            <div class="thidle-think-info-container">
                                                <span class="thidle-think-info-privacy">Public</span><span class="thidle-think-info-date">Thu, 12:00</span>
                                            </div>
                                        </div>
                                        <div class="thidle-think-options-main-container">
                                            <button class="thidle-think-options-button">
                                                <span class="thidle-think-options-icon material-icons">more_horiz</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="thidle-think-content-container">
                                        <div class="thidle-think-content-text">A Golden Gate..........</div>
                                    </div>
                                    <div class="thidle-think-options-container">
                                        <div class="thidle-think-options-right-box">
                                            <div class="thidle-think-option-button">
                                                <span class="thidle-think-option-button-icon active material-icons">share</span>
                                            </div>
                                        </div>
                                        <div class="thidle-think-options-left-box">
                                            <div class="thidle-think-option-button active">
                                                <span class="thidle-think-option-button-icon material-icons">favorite</span>
                                                <span class="thidle-think-option-button-text">15K</span>
                                            </div>
                                            <div class="thidle-think-option-button">
                                                <span class="thidle-think-option-button-icon material-icons">repeat</span>
                                                <span class="thidle-think-option-button-text">5K</span>
                                            </div>
                                            <div class="thidle-think-option-button">
                                                <span class="thidle-think-option-button-icon material-icons">comment</span>
                                                <span class="thidle-think-option-button-text">561</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div class="thidle-think-main-publication-container">
                                <div class="thidle-think-primary-content-isolation">
                                    <div class="thidle-think-top-info-container">
                                        <div class="thidle-think-user-picture-main-container">
                                            <div class="thidle-think-user-picture-container">
                                                <img alt="Thidle Think User Picture" class="thidle-think-user-picture" src="https://scontent.fbfh17-1.fna.fbcdn.net/v/t1.6435-9/62012381_2093728100740127_3129459823523921920_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=800rx3t8-xMAX_Nlaim&_nc_ht=scontent.fbfh17-1.fna&oh=c7ad4ab06435a06d129ab86aed896c58&oe=61CD41FF"/>
                                            </div>
                                        </div>
                                        <div class="thidle-think-user-info-main-container">
                                            <div class="thidle-think-user-info-name-container">
                                                <span class="thidle-think-user-complete-info-container"><span class="thidle-think-user-info-name">Barbaa</span><span class="thidle-think-user-info-username">@barbosa</span></span>
                                            </div>
                                            <div class="thidle-think-info-container">
                                                <span class="thidle-think-info-privacy">Public</span><span class="thidle-think-info-date">Thu, 12:00</span>
                                            </div>
                                        </div>
                                        <div class="thidle-think-options-main-container">
                                            <button class="thidle-think-options-button">
                                                <span class="thidle-think-options-icon material-icons">more_horiz</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="thidle-think-content-container">
                                        <div class="thidle-think-content-text">Lindas essas imagens</div>
                                        <div class="thidle-rethink-content-container">
                                            <div class="thidle-think-main-publication-container">
                                                <div class="thidle-think-primary-content-isolation">
                                                    <div class="thidle-think-top-info-container">
                                                        <div class="thidle-think-user-picture-main-container">
                                                            <div class="thidle-think-user-picture-container">
                                                                <img alt="Thidle Think User Picture" class="thidle-think-user-picture" src="https://scontent.fbfh17-1.fna.fbcdn.net/v/t1.6435-9/62012381_2093728100740127_3129459823523921920_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=800rx3t8-xMAX_Nlaim&_nc_ht=scontent.fbfh17-1.fna&oh=c7ad4ab06435a06d129ab86aed896c58&oe=61CD41FF"/>
                                                            </div>
                                                        </div>
                                                        <div class="thidle-think-user-info-main-container">
                                                            <div class="thidle-think-user-info-name-container">
                                                                <span class="thidle-think-user-complete-info-container"><span class="thidle-think-user-info-name">Barbaa</span><span class="thidle-think-user-info-username">@barbosa</span></span>
                                                            </div>
                                                            <div class="thidle-think-info-container">
                                                                <span class="thidle-think-info-privacy">Public</span><span class="thidle-think-info-date">Thu, 12:00</span>
                                                            </div>
                                                        </div>
                                                        <div class="thidle-think-options-main-container">
                                                            <button class="thidle-think-options-button">
                                                                <span class="thidle-think-options-icon material-icons">more_horiz</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="thidle-think-content-container">
                                                        <div class="thidle-think-content-text">Algumas imagens aleatórias ai pra vcs</div>
                                                        <div class="thidle-think-content-image-album-container">
                                                            <div class="thidle-think-content-image-album">
                                                                <div class="thidle-think-content-image-container">
                                                                    <img class="thidle-think-content-image" src="https://pbs.twimg.com/profile_images/1381455687713239041/G7Na26NV_400x400.jpg"/>
                                                                </div>
                                                                <div class="thidle-think-content-image-container">
                                                                    <img class="thidle-think-content-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Un_%C3%A9t%C3%A9_au_bois_de_Vincennes_%2848108771342%29.jpg/1920px-Un_%C3%A9t%C3%A9_au_bois_de_Vincennes_%2848108771342%29.jpg"/>
                                                                </div>
                                                                <div class="thidle-think-content-image-container">
                                                                    <img class="thidle-think-content-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Paris_raining_autumn_cityscape_%288252181936%29.jpg/1920px-Paris_raining_autumn_cityscape_%288252181936%29.jpg"/>
                                                                </div>
                                                                <div class="thidle-think-content-image-container">
                                                                    <img class="thidle-think-content-image" src="https://images3.alphacoders.com/853/thumb-1920-85305.jpg"/>
                                                                </div>
                                                                <div class="thidle-think-content-image-container">
                                                                    <img class="thidle-think-content-image" src="https://img.freepik.com/free-photo/modern-futuristic-sci-fi-background_35913-2152.jpg?size=626&ext=jpg"/>
                                                                </div>
                                                                <div class="thidle-think-content-image-container">
                                                                    <img class="thidle-think-content-image" src="https://img.freepik.com/free-photo/abstract-grunge-decorative-relief-navy-blue-stucco-wall-texture-wide-angle-rough-colored-background_1258-28311.jpg?size=626&ext=jpg"/>
                                                                </div>
                                                                <div class="thidle-think-content-image-container">
                                                                    <img class="thidle-think-content-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Paris_vue_d%27ensemble_tour_Eiffel.jpg/1920px-Paris_vue_d%27ensemble_tour_Eiffel.jpg"/>
                                                                </div>
                                                                <div class="thidle-think-content-image-container">
                                                                    <img class="thidle-think-content-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Paris_Opera_full_frontal_architecture%2C_May_2009.jpg/1920px-Paris_Opera_full_frontal_architecture%2C_May_2009.jpg"/>
                                                                </div>
                                                                <div class="thidle-think-content-image-container">
                                                                    <img class="thidle-think-content-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Arcdetriomphe_2.jpg/1920px-Arcdetriomphe_2.jpg"/>
                                                                </div>
                                                                <div class="thidle-think-content-image-container">
                                                                    <img class="thidle-think-content-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Louvre_Courtyard%2C_Looking_West.jpg/1920px-Louvre_Courtyard%2C_Looking_West.jpg"/>
                                                                </div>
                                                            </div>
                                                            <div class="thidle-think-content-image-album-options-container">
                                                                <div class="thidle-think-content-image-album-next material-icons-round"></div>
                                                                <div class="thidle-think-content-image-album-previous material-icons-round"></div>
                                                                <div class="thidle-think-content-image-album-image-selectors">
                                                                    <i class="thidle-think-content-image-album-image-selector"></i>
                                                                    <i class="thidle-think-content-image-album-image-selector"></i>
                                                                    <i class="thidle-think-content-image-album-image-selector"></i>
                                                                    <i class="thidle-think-content-image-album-image-selector"></i>
                                                                    <i class="thidle-think-content-image-album-image-selector"></i>
                                                                    <i class="thidle-think-content-image-album-image-selector"></i>
                                                                    <i class="thidle-think-content-image-album-image-selector"></i>
                                                                    <i class="thidle-think-content-image-album-image-selector"></i>
                                                                    <i class="thidle-think-content-image-album-image-selector"></i>
                                                                    <i class="thidle-think-content-image-album-image-selector"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="thidle-think-options-container">
                                        <div class="thidle-think-options-right-box">
                                            <div class="thidle-think-option-button">
                                                <span class="thidle-think-option-button-icon active material-icons">share</span>
                                            </div>
                                        </div>
                                        <div class="thidle-think-options-left-box">
                                            <div class="thidle-think-option-button">
                                                <span class="thidle-think-option-button-icon material-icons">favorite</span>
                                                <span class="thidle-think-option-button-text">15K</span>
                                            </div>
                                            <div class="thidle-think-option-button active">
                                                <span class="thidle-think-option-button-icon material-icons">repeat</span>
                                                <span class="thidle-think-option-button-text">5K</span>
                                            </div>
                                            <div class="thidle-think-option-button">
                                                <span class="thidle-think-option-button-icon material-icons">comment</span>
                                                <span class="thidle-think-option-button-text">561</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </MainPostsContainer>
            </MainContentContainer>
        </MainAppContainer>
    )
}