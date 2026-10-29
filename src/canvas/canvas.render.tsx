import {useEffect, useRef} from "react";
import {API_PASS, CLIENT_SNB, QUERY_KEY} from "../constant/constant.ts";
import {useStore} from "jotai";
import {storeViewport, storeViewportSize} from "../store/store.viewport.ts";
import {canvasDashboardToViewport, canvasViewportToDashboard} from "./canvas.transform.ts";
import {canvasRuler} from "./canvas.ruler.ts";
import {canvasPanning} from "./canvas.panning.ts";
import {canvasWheel} from "./canvas.wheel.ts";
import {useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import type {ICanvasListItem} from "../interface/interface.api.ts";
import WithCredentialFetch from "../utils/utils.credential.fetch.ts";

function CanvasRender(){
    const canvasEl = useRef<HTMLCanvasElement>(null);
    const store = useStore();
    const {canvasId} = useParams();

    const {isPending,error,data:canvasNodes} = useQuery<ICanvasListItem[]>({
        queryKey:[QUERY_KEY.CANVAS_NODES],
        queryFn:async () =>{
            const res = await WithCredentialFetch(`${API_PASS.CANVAS_LIST}/${canvasId}/nodes`);
            if(!res) throw new Error('리스폰스가 언디파인 입니다.');
            const resData:ICanvasListItem[] = await res.json();
            console.log(resData);
            return resData.length === 0 ? [] : resData;
        },
        staleTime:10_000
    })


    useEffect(()=>{
        const canvas = canvasEl.current;
        const ctx = canvas?.getContext("2d");
        if(!ctx || !canvas) return;
        const onPanning = canvasPanning(canvas,store);
        const onWheel = canvasWheel(canvas,store);

        let moveX = 0;
        let frame = 0;
        let styleWidth = 0;
        let styleHeight = 0;
        let dpr = 1;

        const onResizeHandler = () =>{
            styleWidth = window.innerWidth - CLIENT_SNB.WIDTH;
            styleHeight = window.innerHeight;
            dpr = devicePixelRatio;

            canvas.style.width = `${styleWidth}px`;
            canvas.style.height = `${styleHeight}px`;
            canvas.width = Math.round(styleWidth*dpr);
            canvas.height = Math.round(styleHeight*dpr);

            store.set(storeViewportSize,{
                width: styleWidth,
                height: styleHeight
            })
        }

        onResizeHandler();
        window.addEventListener("resize", onResizeHandler);

        const loop = () =>{
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, styleWidth, styleHeight);

            const getCurrentViewport = store.get(storeViewport);
            const getRulerEndPosition = canvasViewportToDashboard(getCurrentViewport,{x:styleWidth,y:styleHeight});
            const getTransformPosition = canvasDashboardToViewport(getCurrentViewport,{x:0,y:0});

            ctx.setTransform(dpr*getCurrentViewport.scale, 0, 0, dpr*getCurrentViewport.scale, getTransformPosition.x*dpr, getTransformPosition.y*dpr);
            ctx.fillStyle = '#ccc';
            ctx.fillRect(0,100,100,100);

            canvasRuler({ctx,dpr,viewport:getCurrentViewport,dashboard:getRulerEndPosition});
            moveX+=5;
            if(moveX>styleWidth) moveX=0;
            frame = requestAnimationFrame(loop);
        }

        frame = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("resize", onResizeHandler);
            onPanning();
            onWheel();
        };
    },[store]);

    return <canvas ref={canvasEl}></canvas>
}

export default CanvasRender;