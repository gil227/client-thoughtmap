const WithCredentialFetch = (url: string, options?: RequestInit) =>{
    //fetch 메서드를 http only cookie 방식 사용을 위한 싱글톤 관리 유틸 함수
    //작업 이후 방식을 수정 되면 한번에 가능 하도록 하는 목적
    return fetch(url,{
        ...options,
        headers:{
            'Content-Type': 'application/json'
        },
        credentials:'include'
    })
}

export default WithCredentialFetch;