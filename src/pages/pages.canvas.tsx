import CanvasSnb from "../canvas/canvas.snb.tsx";
import {useQuery} from "@tanstack/react-query";
import WithCredentialFetch from "../utils/utils.credential.fetch.ts";
import {API_PASS} from "../constant/constant.ts";
import type {ICanvasListItem} from "../interface/interface.api.ts";
import styled from "@emotion/styled";
import {useEffect, useState} from "react";
import type {IRenderSize} from "../interface/interface.ts";
import CanvasRender from "../canvas/canvas.render.tsx";

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
    }),
    Wrapper:styled.div({
        display:'flex',
    })
}

function PagesCanvas(){
    const [snbEl,setSnbEl] = useState<HTMLElement|null>(null);
    const [renderSize,setRenderSize] = useState<IRenderSize>({width:0,height:0});
    const {isPending,error,data:canvasList} = useQuery<ICanvasListItem[]>({
        queryKey:['canvasList'],
        queryFn:async () =>{
            const res = await WithCredentialFetch(API_PASS.CANVAS_LIST);
            if(!res) throw new Error('리스폰스가 언디파인 입니다.');
            const resData:ICanvasListItem[] = await res.json();
            return resData.length === 0 ? [] : resData;
        }
    })
    useEffect(() => {
        if(!snbEl) return;
        let timer:ReturnType<typeof setTimeout>;

        const onResizeHandler = () =>{
            clearTimeout(timer);
            timer = setTimeout(()=>{
                setRenderSize({
                    width:window.outerWidth - snbEl.offsetWidth,
                    height:window.outerHeight
                })
            },700)
        }

        onResizeHandler();
        window.addEventListener("resize", onResizeHandler);
        return ()=>{
            window.removeEventListener("resize", onResizeHandler);
            clearTimeout(timer);
        };
    }, [snbEl, snbEl?.offsetWidth]);
    return <>
        {isPending && <S.Loading/>}
        {error && <S.Error/>}
        <S.Wrapper>
            <CanvasSnb ref={(ref)=> setSnbEl(ref)} list={canvasList ?? []} isLoading={isPending}/>
            <CanvasRender {...renderSize}/>
        </S.Wrapper>
    </>
}

export default PagesCanvas;