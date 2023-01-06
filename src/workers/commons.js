import joypixels from "emoji-toolkit";
import { useModals } from "../contexts/modals";
import { DecryptToken, RemoveTokens, SetTokens } from "./auth";

const apiUrl = "http://localhost:3000" //"https://api.thidle.com/";

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function MonthAndYear(date){
    return date ? `${months[parseInt(date.split(" ")[0].split("-")[1])-1]}, ${date.split(" ")[0].split("-")[0]}` : '';
}

export function FullDate(date, full = true, locale = "br"){
    let d = date.split('-');

    return locale === "br" ? `${d[2]} de ${months[parseInt(d[1])-1]}${full ? (' de '+d[0]) : ''}` : `${months[d[1]]} ${d[2]}${full ? (', '+d[0]) : ''}`
}

export function BirthdayDate(date, locale = "br"){
    let d = date.split('-').reverse();

    return locale === "br" ? 
        `${d[0]} de ${months[parseInt(d[1])-1]}${d.length === 3 ? (' de '+d[2]) : ''}` : 
        `${months[parseInt(d[1])-1]} ${d[0]}${d.length === 3 ? (', '+d[2]) : ''}`
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


const httpRequestStatus = {
    pending: [],
    refreshing: false
}
export async function HTTPRequest(method, url = null, data = null, needLogin = true){
    if(!url) {
        url = method;
        method = 'GET';
    }

    method = method.toUpperCase();

    if(data !== null && typeof data === 'object'){
        const keys = Object.keys(data);
        if(!keys.includes('query') && !keys.includes('body')){
            if(['POST', 'PATCH', 'PUT'].includes(method)) data = {query: null, body: data}
            if(['GET', 'DELETE', 'OPTIONS', 'HEAD', 'TRACE', 'CONNECT'].includes(method)) data = {query: data, body: null}
        }
    }

    if(!data) data = {query: null, body: null}
    if(typeof data.query === 'undefined') data.query = null;
    if(typeof data.body === 'undefined') data.body = null;

    try { 
        const result = await TryRequest(method, url, data.query, data.body, needLogin);
        return result;
    } catch(err){
        if(await RevalidateToken()) HTTPRequest(method, url, data, needLogin);
        //else window.location.href = "/";
    }
}

async function TryRequest(method, url, query, body, needLogin){
    if(!window.localStorage.getItem('t') && needLogin) throw new Error('You must have a session to make a request');
    return new Promise((resolve, reject) => {
        fetch(`${apiUrl}${url}${query ? Object.entries(query).reduce((final, [key, value]) => (final + `${encodeURIComponent(key)}=${encodeURIComponent(value)}`), '?') : ''}`, {
            method, 
            body: body ? (body instanceof FormData ? body : JSON.stringify(body)) : undefined, 
            headers: 
                body instanceof FormData 
                    ? new Headers(needLogin ? {'Authorization': `Bearer ${window.localStorage.getItem('t')}`} : {})
                    : new Headers(needLogin ? {'Authorization': `Bearer ${window.localStorage.getItem('t')}`, "Content-Type": "application/json"} : {"Content-Type": "application/json"})
        }).then(async (response) => {
            if(response.status === 403) reject("Token Expired");
            else return {
                success: response.status.toString().substring(0, 1) === '2', 
                status: response.status,
                data: await response.json()
            };
        }).then((result) => {
            resolve(result);
        });
    })
}

async function RevalidateToken(){
    if(!httpRequestStatus.refreshing) {
        httpRequestStatus.refreshing = true;
        new Promise(async (resolve) => {
            fetch(`${apiUrl}/auth/revalidate`, {
                method: 'POST',
                headers: new Headers({
                    Authorization: ['Bearer', (await DecryptToken(window.localStorage.getItem('r')))].join(' ')
                })
            }).then(async result => {
                if(result.status.toString().startsWith('2')) {
                    const keys = await result.json();

                    await SetTokens(keys);

                    httpRequestStatus.pending.forEach((i) => {
                        i();
                    });
                    httpRequestStatus.pending = [];
                    httpRequestStatus.refreshing = false;

                    resolve(true);
                } else {
                    RemoveTokens();

                    resolve(false);
                }
            })
        })
    } else {
        return new Promise((resolve) => {
            httpRequestStatus.pending.push(() => { resolve(true); });
        });
    }
}

export function ProfileURL(profileImage){
    return profileImage?.url || 'https://thidle.com/contents/assets/images/profile/picture8.png';
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
        buttons: { continue: "Sair" },
        continue: async (close) => {
            close();
            LoadingOverlay(true);
            await HTTPRequest('PATCH', '/v0/auth/login', {r: window.localStorage.getItem('r')});
            RemoveTokens();
            window.location.href = "/";
        },
        cancel: (close) => {close();}
    })
}

export function LoadingOverlay(active = true){
    const overlay = document.querySelector('.thidle-loading-screen')
    if(
        (overlay.classList.contains("disabled") && active) ||
        (!overlay.classList.contains("disabled") && !active)
    ) overlay.classList[active ? 'remove' : 'add']("disabled")
}