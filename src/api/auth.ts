import {API_PASS} from "../constant/constant.ts";
import type {IAuthPayload} from "../interface/interface.api.ts";
import WithCredentialFetch from "../utils/utils.credential.fetch.ts";

export const loginAPI = async (loginBody:IAuthPayload) => {
    const res = await WithCredentialFetch(API_PASS.LOGIN,{
        method: 'POST',
        body: JSON.stringify(loginBody)
    });
    if(!res) return console.log('[ERROR] res Undefined');
    return res.json();
}


export const signupAPI = async (signupBody:IAuthPayload) =>{
    const res = await fetch(API_PASS.SIGN_UP,{
        headers:{"Content-Type": "application/json"},
        method: 'POST',
        body: JSON.stringify(signupBody)
    })

    return res.json();
}
