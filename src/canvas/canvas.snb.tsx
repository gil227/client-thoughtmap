import styled from "@emotion/styled";
import type {ICanvasListItem} from "../interface/interface.api.ts";
import {useState} from "react";
import CanvasCreate from "./canvas.create.tsx";
import CanvasSnbItem from "./canvas.snb.item.tsx";
import {API_PASS, CLIENT_SNB, QUERY_KEY} from "../constant/constant.ts";
import {useQuery} from "@tanstack/react-query";
import WithCredentialFetch from "../utils/utils.credential.fetch.ts";
import {ComponentsApiError} from "../components/api/components.api.error.tsx";
import {ComponentsApiLoading} from "../components/api/components.api.loading.tsx";

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

function CanvasSnb(){
    const [onCreate,setOnCreate] = useState<boolean>(false);
    const {isPending,error,data:canvasList} = useQuery<ICanvasListItem[]>({
        queryKey:[QUERY_KEY.CANVAS_LIST],
        queryFn:async () =>{
            const res = await WithCredentialFetch(API_PASS.CANVAS_LIST);
            if(!res) throw new Error('리스폰스가 언디파인 입니다.');
            const resData:ICanvasListItem[] = await res.json();
            return resData.length === 0 ? [] : resData;
        },
        staleTime:10_000
    })
    if(error){
        return <ComponentsApiError/>
    }
    if(isPending){
        return <ComponentsApiLoading/>
    }
    return <S.Section>
        {canvasList && canvasList?.length !== 0 ? <S.ListWrap>
            {canvasList.map((item,i)=>{
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