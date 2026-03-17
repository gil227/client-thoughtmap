import {API_PASS} from "../constant/constant.ts";
import type {ILoginPayload} from "../interface/interface.api.ts";

export const loginAPI = async (loginBody:ILoginPayload) => {
    const res = await fetch(API_PASS.LOGIN,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginBody),
    })
    return res.json()
}