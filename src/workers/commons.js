import joypixels from "emoji-toolkit";
import { useModals } from "../contexts/modals";

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function MonthAndYear(date){
    return date ? `${months[parseInt(date.split(" ")[0].split("-")[1])-1]}, ${date.split(" ")[0].split("-")[0]}` : '';
}

export function FullDate(date, full = true, locale = "br"){
    let d = date.split('-');

    return locale === "br" ? `${d[2]} de ${months[parseInt(d[1])-1]}${full ? (' de '+d[0]) : ''}` : `${months[d[1]]} ${d[2]}${full ? (', '+d[0]) : ''}`
}

export function TrustedURL(url, insert){
    return insert.reduce((url, item) => {
        return url.replace(`[]`, item);
    }, url)
}

export function asyncFor(iterable, callback, endCallback, currentIndex = 0){
    if(typeof iterable[currentIndex] !== 'undefined'){
        callback(iterable[currentIndex], iterable, currentIndex, () => {
            asyncFor(iterable, callback, endCallback, currentIndex+1);
        });
    } else endCallback();
}

export function UntrustedLink(props){
    const modals = useModals()
    return <a onClick={(e) => {
        e.preventDefault();
        modals.open('continue', {
            title: "Link Externo", 
            description: "O link que você está tentando acessar não pertence ao Thidle. Não nos responsabilizamos por quaisquer consequencias que possam ocorrer ao acessar este site. Tem certeza de que deseja continuar?", 
            buttons: {continue: "Acessar Link"},
            continue: (close) => {
                window.open(`${props.url}${props.url.indexOf('?') === -1 ? '?' : '&'}ref=thidle.com`, "_blank");
                close();
            },
            cancel: (close) => {close();}
        })
    }} href={`${props.url}${props.url.indexOf('?') === -1 ? '?' : '&'}ref=thidle.com`} className={props.className} target="_blank" rel="noreferrer">{props.children}</a>
}

export function RemoveHttp(url){
    return url.replace("http://", "").replace("https://", "")
}

export async function HTTPRequest(method, url, data = null, needLogin = true){
    if(!window.localStorage.thidleSession && needLogin) throw new Error('You must have a session to make a request');

    let FD;
    if(data){
        FD = new FormData();
        Object.entries(data).forEach(([k, v]) => {
            FD.append(k, v);
        })
    }

    return new Promise(resolve => {
        fetch(`https://thidle.com${url}`, {method, body: data ? FD : undefined, headers: new Headers(needLogin ? {'Authorization': window.localStorage.thidleSession} : {})})
        .then((response)=>{
            if(response.status === 403){
                delete window.localStorage.thidleSession;
                window.location.href = '/';
            } else return response.json()
        })
        .then((result)=>{
            resolve(result);
        });
    })
};

export function ProfileURL(profileImage){
    return profileImage?.url ? `https://thidle.com${profileImage.url}` : 'https://thidle.com/contents/assets/images/profile/picture8.png';
}

export function escapeHtml(unsafe)
{
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/:/g, "&#58;");
}

export function emojify(text){
    return (<span className="emoji-text-container" dangerouslySetInnerHTML={{__html: joypixels.toImage(escapeHtml(text))}}></span>);
}

export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

export const stopPropagation = (e) => {
    e.stopPropagation();
    e.preventDefault();
}

export const navigateTo = (e, navigate, to) => {
    console.log(to)
    stopPropagation(e);
    navigate(to);
}

export const thinkDateRead = (date) => {
    const dtp = date.split(' ')
    const dt = dtp[0].split('-')
    const tm = dtp[1].split(':')

    const cdt = new Date();
    const cd = `${cdt.getFullYear()}-${`${cdt.getMonth()+1}`.padStart(2, '0')}-${`${cdt.getDate()}`.padStart(2, '0')}`
    const ydt = new Date();
    ydt.setDate(ydt.getDate()-1)
    const yd = `${ydt.getFullYear()}-${`${ydt.getMonth()+1}`.padStart(2, '0')}-${`${ydt.getDate()}`.padStart(2, '0')}`

    let str = '';

    if(dtp === cd) str = 'Today'
    else if(dtp === yd) str = 'Yesterday'
    else str = `${shortMonths[parseInt(dt[1])-1]} ${dt[2]}${cdt.getFullYear() === parseInt(dt[0]) ? '' : `, ${dt[0]}`}`;

    return `${str} at ${tm[0]}:${tm[1]}`;
}

export const doLogout = (modals) => {
    modals.open('continue', {
        title: "Logout", 
        description: "Tem certeza de que você deseja realizar o logout da sua conta?", 
        buttons: {continue: "Sair"},
        continue: (close) => {
            delete window.localStorage.thidleSession;
            //TODO: Send logout to backend and invalidate token
            close();
            window.location.reload();
        },
        cancel: (close) => {close();}
    })
}