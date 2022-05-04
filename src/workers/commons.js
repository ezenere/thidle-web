const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Setpember', 'October', 'November', 'December'];

export function MonthAndYear(date){
    return `${months[parseInt(date.split(" ")[0].split("-")[1])]}, ${date.split(" ")[0].split("-")[0]}`
}

export function FullDate(date, full = true, locale = "br"){
    let d = date.split('-');

    return locale === "br" ? `${d[2]} de ${months[parseInt(d[1])]}${full ? (' de '+d[0]) : ''}` : `${months[d[1]]} ${d[2]}${full ? (', '+d[0]) : ''}`
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