import { JWE, JWK } from "node-jose";

export async function JWEDecrypt(keyBuffer, data) {
    const key = await JWK.asKey(keyBuffer, 'pkcs8');
    return await JWE.createDecrypt(key).decrypt(data);
}

export async function DecryptToken(t){
    return (await JWEDecrypt(
        Buffer.from(window.localStorage.getItem('k'), 'base64'),
        JSON.parse(Buffer.from(t, 'base64').toString())
    )).payload.toString();
}

export async function SetTokens(keys){
    window.localStorage.setItem('k', keys.k);
    window.localStorage.setItem('r', keys.r);
    window.localStorage.setItem('t', await DecryptToken(keys.t));
}

export function RemoveTokens(){
    window.localStorage.removeItem('r');
    window.localStorage.removeItem('t');
    window.localStorage.removeItem('k');
}