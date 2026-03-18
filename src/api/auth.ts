import {API_PASS} from "../constant/constant.ts";
import type {ILoginPayload} from "../interface/interface.api.ts";
import WithCredentialFetch from "../utils/utils.credential.fetch.ts";

export const loginAPI = async (loginBody:ILoginPayload) => {
    const res = await WithCredentialFetch(API_PASS.LOGIN,{
        method: 'POST',
        body: JSON.stringify(loginBody)
    })
    return res.json()
}
