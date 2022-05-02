import { AdTestImage, MainAppContainer } from "../../components/app";
import { AppLargeUserInfo, AppRightInfoContent, AppRightOptionsContainer } from "../../components/app/rightContainer";
import ThidleThinkMiniPublication from "../../components/app/thidleThinkMiniPublication";

export default function Feed(){
    return (
        <MainAppContainer>
            <AppRightOptionsContainer>
                <AppRightInfoContent title="You might Know" moreLink="/follow-suggestions">
                    <AppLargeUserInfo 
                        picture={'https://pbs.twimg.com/profile_images/1396628792177725443/RpYKScOu_400x400.jpg'}
                        name={'Leonardo'}
                        username={'leonardo'}
                        description={'Atacante Nato'}
                    />
                    <AppLargeUserInfo 
                        picture={'https://pbs.twimg.com/profile_images/1362611619939971074/Apa1qP5o_400x400.jpg'}
                        name={'Guilherme Scroccaro'}
                        username={'guilherme'}
                        description={'Eu sou um personagem de um filme de comédia'}
                    />
                    <AppLargeUserInfo 
                        picture={'https://scontent.fbfh17-1.fna.fbcdn.net/v/t1.6435-9/62012381_2093728100740127_3129459823523921920_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=hDYphsn9FmoAX-IP7L3&_nc_ht=scontent.fbfh17-1.fna&oh=00_AT_jMYN5hw660zM35kbS8f29I7quvfmiY9LpYQn-_eUO6g&oe=6296F77F'}
                        name={'Barbaa'}
                        username={'barbosa'}
                        description={'Cwb 💎'}
                    />
                </AppRightInfoContent>
                <AppRightInfoContent title="Trending" moreLink="/trending">
                    <ThidleThinkMiniPublication 
                        name={'Guilherme Scroccaro'}
                        picture={'https://pbs.twimg.com/profile_images/1362611619939971074/Apa1qP5o_400x400.jpg'}
                        username={'guilherme'}
                        text={'Teste de Pensamento'}
                        liked={true}
                        likes={5000}
                        reposted={false}
                        reposts={1500}
                        commented={false}
                        comments={500}
                    />
                    <ThidleThinkMiniPublication 
                        name={'Barbaa'}
                        picture={'https://scontent.fbfh17-1.fna.fbcdn.net/v/t1.6435-9/62012381_2093728100740127_3129459823523921920_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=hDYphsn9FmoAX-IP7L3&_nc_ht=scontent.fbfh17-1.fna&oh=00_AT_jMYN5hw660zM35kbS8f29I7quvfmiY9LpYQn-_eUO6g&oe=6296F77F'}
                        username={'barbosa'}
                        text={'tive uma ideia muito boa'}
                        liked={true}
                        likes={5000}
                        reposted={false}
                        reposts={1500}
                        commented={false}
                        comments={500}
                    />
                    <ThidleThinkMiniPublication 
                        name={'Leonardo'}
                        picture={'https://pbs.twimg.com/profile_images/1396628792177725443/RpYKScOu_400x400.jpg'}
                        username={'leonardo'}
                        text={'tive uma ideia muito boa'}
                        liked={true}
                        likes={5000}
                        reposted={false}
                        reposts={1500}
                        commented={false}
                        comments={500}
                    />
                </AppRightInfoContent>

                <AppRightInfoContent title="Advertising">
                    <AdTestImage src="https://www.pontofrio-imagens.com.br/Control/ArquivoExibir.aspx?IdArquivo=1757860061"/>
                </AppRightInfoContent>
            </AppRightOptionsContainer>
        </MainAppContainer>
    )
}