import styled from "@emotion/styled";

const S = {
    Loading:styled.span({
        position: "fixed",
        width:'100%',
        height:'100vh',
        background:'rgba(0,0,0,0.3)'
    }),
}

export const ComponentsApiLoading = () =>{
    return <S.Loading/>
}