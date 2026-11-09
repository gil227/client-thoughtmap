import {API_PASS} from "@src/constant/constant.ts";

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

    //토큰값 갱신 후 재시도
    if(resOnFetch.status === 401){
        const resOnRefresh = await onRefreshToken();
        if(resOnRefresh.ok) return await onFetch();

        return resOnFetch;
    }

    return resOnFetch;
}

export default WithCredentialFetch;