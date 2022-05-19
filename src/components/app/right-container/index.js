import ThidleThinkMiniPublication from "./mini-publication";
import { RightInfoContent, RightUserInfo } from "./info-content";
import { AdTestImage } from "..";
import { useContext, useEffect, useState } from "react";
import { HTTPRequest, ProfileURL } from "../../../workers/commons";
import { UserContext } from "../../../contexts/user";
import { useLocation } from "react-router-dom";

export function FollowSuggestions(props){
    const [suggestions, setSuggestions] = useState([]);
    const ctx = useContext(UserContext);
    const [lastLocation, setLastLocation] = useState('');
    const location = useLocation();

    useEffect(() => {
        setLastLocation(location.pathname);
        if(!ctx.rightSuggestions.loaded || location.pathname !== lastLocation){
            HTTPRequest('GET', `/api/v0/thidle/suggestions?exclude=${location.pathname.split('/')[1]}`).then(result => {
                ctx.rightSuggestions.update(true);
                setSuggestions(result.data);
            });
        };
    }, [ctx, suggestions, lastLocation, location.pathname])

    return (
        <UserContext.Consumer>
            {context => suggestions.length > 0 ? <RightInfoContent title="You might Know" moreLink="/follow-suggestions">
                    {suggestions.map(item => {
                        return <RightUserInfo 
                            key={item.username}
                            picture={ProfileURL(item.userImage)}
                            name={item.name}
                            username={item.username}
                            description={item.description}
                        />
                    })}
                </RightInfoContent> : ''
            }
        </UserContext.Consumer>
    )
}

export function TrendingsMini(props){
    return (
        <RightInfoContent title="Trending" moreLink="/trending">
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
        </RightInfoContent>
    )
}

export function RightAdvertising(props){
    <RightInfoContent title="Advertising">
        <AdTestImage src="https://www.pontofrio-imagens.com.br/Control/ArquivoExibir.aspx?IdArquivo=1757860061"/>
    </RightInfoContent>
}