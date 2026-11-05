import {useState} from "react";
import {loginAPI} from "../api/auth.ts";
import type {IAuthPayload} from "@src/interface/interface.api.ts";

export  const useLogin = () => {
    const [loading, setLoading] = useState(false);

    const login = async (loginBody:IAuthPayload) =>{
        setLoading(true);
        try {
            return await loginAPI(loginBody);
        } catch {
            console.error('로그인 실패');
        }finally {
            setLoading(false);
        }
    }

    return {login,loading}
}