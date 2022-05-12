import joypixels from "emoji-toolkit";

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Setpember', 'October', 'November', 'December'];

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

export function UntrustedLink(props){
    return <a href={`https://thidle.com/redirect?to=${encodeURIComponent(props.url)}&ref=thidle.com`} className={props.className} target="_blank" rel="noreferrer">{props.children}</a>
}

export function RemoveHttp(url){
    return url.replace("http://", "").replace("https://", "")
}

export async function HTTPRequest(method, url, data = null){
    return new Promise(resolve => {
        fetch(`https://thidle.com${url}`, {method})
        .then((response)=>{return response.json()})
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
    console.log(<div className="emoji-text-container" dangerouslySetInnerHTML={{__html: joypixels.toImage(escapeHtml(text))}}></div>);
    return (<span className="emoji-text-container" dangerouslySetInnerHTML={{__html: joypixels.toImage(escapeHtml(text))}}></span>);
}