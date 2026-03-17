import {useState} from "react";
import {loginAPI} from "../api/auth.ts";
import type {ILoginPayload} from "../interface/interface.api.ts";

export  const useLogin = () => {
    const [loading, setLoading] = useState(false);

    const login = async (loginBody:ILoginPayload) =>{
        setLoading(true);
        try {
            return await loginAPI(loginBody);
        } catch {
            console.error('로그인 실패');
        }finally {
            setLoading(false);
            console.log('로그인');
        }
    }

    return {login,loading}
}