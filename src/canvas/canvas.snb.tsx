import styled from "@emotion/styled";
import type {ICanvasList} from "../interface/interface.api.ts";
import {useState} from "react";
import CanvasCreate from "./canvas.create.tsx";
import CanvasSnbItem from "./canvas.snb.item.tsx";
import {CLIENT_SNB} from "../constant/constant.ts";

const S = {
    Section:styled.section({
        flex:`0 0 ${CLIENT_SNB.WIDTH}px`,
        height:'100vh',
        borderRight:'2px solid #ccc'
    }),
    ListWrap:styled.ul({
        padding:0
    }),
    Button:styled.button({
        padding: '0.6em 1.2em'
    })
}

function CanvasSnb({list, isLoading}:ICanvasList){
    const [onCreate,setOnCreate] = useState<boolean>(false);
    if(isLoading){
        return <S.Section >로딩 중</S.Section>
    }
    return <S.Section>
        {list.length !== 0 ? <S.ListWrap>
            {list.map((item,i)=>{
                return <CanvasSnbItem id={item.id} title={item.title} key={item.id+i}/>
            })}
        </S.ListWrap> : '비어있음'}
        <S.Button onClick={()=> setOnCreate(()=>{
            return !onCreate;
        })}>신규만들기</S.Button>
        {onCreate && <CanvasCreate onSuccessCreate={setOnCreate}/>}
    </S.Section>
}

export default CanvasSnb;