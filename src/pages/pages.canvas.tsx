import CanvasSnb from "../canvas/canvas.snb.tsx";
import {useQuery} from "@tanstack/react-query";
import WithCredentialFetch from "../utils/utils.credential.fetch.ts";
import {API_PASS} from "../constant/constant.ts";
import type {ICanvasList} from "../interface/interface.api.ts";
import styled from "@emotion/styled";

const S = {
    Loading:styled.span({
        position: "fixed",
        width:'100%',
        height:'100vh',
        background:'rgba(0,0,0,0.3)'
    }),
    Error:styled.span({
        position: "fixed",
        width:'100%',
        height:'100vh',
        background:'rgba(122,1,1,0.3)'
    })
}

function PagesCanvas(){
    const {isPending,error,data:canvasList} = useQuery<ICanvasList[]>({
        queryKey:['canvasList'],
        queryFn:async () =>{
            const res = await WithCredentialFetch(API_PASS.CANVAS_LIST);
            const resData:ICanvasList[] = await res.json();
            return resData;
        }
    })
    console.log('error',error);
    return <>
        {isPending && <S.Loading/>}
        {error && <S.Error/>}
        <CanvasSnb list={canvasList}/>
    </>
}

export default PagesCanvas;