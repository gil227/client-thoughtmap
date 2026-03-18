import {type ReactElement, useEffect} from "react";
import WithCredentialFetch from "../utils/utils.credential.fetch.ts";
import {API_PASS} from "../constant/constant.ts";
import {useNavigate} from "react-router";

function ComponentsAuthPages({children}:{children:ReactElement}){
    const navigation = useNavigate();

    useEffect(()=>{
        const getAutoRes = async () =>{
            return await WithCredentialFetch(API_PASS.AUTH_ME);
        }
        getAutoRes().then((res)=>{
            if(res.status !== 200){
                navigation('/');
            }
        });
    },[])
    return children
}

export default ComponentsAuthPages;