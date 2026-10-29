import styled from "@emotion/styled";

const S ={
    Error:styled.span({
        position: "fixed",
        width:'100%',
        height:'100vh',
        background:'rgba(122,1,1,0.3)'
    }),
}

export const ComponentsApiError =()=>{
    return <S.Error/>
}