import styled from "@emotion/styled";
import type {ICanvasList} from "../interface/interface.api.ts";
import {useState} from "react";
import CanvasCreate from "./canvas.create.tsx";

const S = {
    Section:styled.section({
        width:'300px',
        height:'100vh',
        borderRight:'2px solid #ccc'
    }),
    ListWrap:styled.ul({}),
    ListItem:styled.li({})
}

function CanvasSnb({list, isLoading}:ICanvasList){
    const [onCreate,setOnCreate] = useState<boolean>(false);
    if(isLoading){
        return <S.Section>로딩 중</S.Section>
    }
    return <S.Section>
        {list.length !== 0 ? <S.ListWrap>
            {list.map((item)=>{
                return <S.ListItem>{item.title}</S.ListItem>
            })}
        </S.ListWrap> : '비어있음'}
        <button onClick={()=> setOnCreate(()=>{
            return !onCreate;
        })}>신규만들기</button>
        {onCreate && <CanvasCreate onSuccessCreate={setOnCreate}/>}
    </S.Section>
}

export default CanvasSnb;