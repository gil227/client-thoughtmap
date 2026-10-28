import {API_PASS} from "../constant/constant.ts";

//리프레시 호출시 무한루프 방지 플래그
let isRetried = false;

const WithCredentialFetch = async (url: string, options?: RequestInit) =>{
    //fetch 메서드를 http only cookie 방식 사용을 위한 싱글톤 관리 유틸 함수
    //작업 이후 방식을 수정 되면 한번에 가능 하도록 하는 목적
    const onFetch = () =>{
        return fetch(url,{
            ...options,
            headers:{
                'Content-Type': 'application/json'
            },
            credentials:'include'
        })
    }

    const onRefreshToken = () =>{
        return fetch(API_PASS.AUTH_ME_REFRESH,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            credentials:'include'
        });
    }

    const resOnFetch = await onFetch();

    if(resOnFetch.status === 200){
        isRetried = false;
        return resOnFetch;
    }

    if(resOnFetch.status === 401 && !isRetried){
        isRetried = true;
        const resOnRefresh = await onRefreshToken();

        if(resOnRefresh.status === 200){
            isRetried = false;
            return await onFetch();
        }

        isRetried = false;
        return resOnRefresh;
    }
}

export default WithCredentialFetch;