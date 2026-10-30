import {useEffect, useRef} from "react";
import {API_PASS, CLIENT_SNB, QUERY_KEY} from "../constant/constant.ts";
import {useStore} from "jotai";
import {storeViewport, storeViewportSize} from "../store/store.viewport.ts";
import {canvasDashboardToViewport, canvasViewportToDashboard} from "./canvas.transform.ts";
import {canvasRuler} from "./canvas.ruler.ts";
import {canvasPointer} from "./canvas.pointer.ts";
import {canvasWheel} from "./canvas.wheel.ts";
import {useQuery} from "@tanstack/react-query";
import type {INode} from "../interface/interface.api.ts";
import WithCredentialFetch from "../utils/utils.credential.fetch.ts";
import {canvasDraw} from "./canvas.draw.ts";
import {storeNodes, storeSelectNode} from "../store/store.nodes.ts";

function CanvasRender({canvasId}:{canvasId:string}){
    const canvasEl = useRef<HTMLCanvasElement>(null);
    const store = useStore();

    const {data:canvasNodes} = useQuery<INode[]>({
        queryKey:QUERY_KEY.CANVAS_NODES(canvasId),
        queryFn:async () =>{
            const res = await WithCredentialFetch(`${API_PASS.CANVAS_LIST}/${canvasId}/nodes`);
            if(!res) throw new Error('리스폰스가 언디파인 입니다.');
            const resData:INode[] = await res.json();
            return resData.length === 0 ? [] : resData;
        },
        staleTime:10_00
    })

    useEffect(() => {
        store.set(storeNodes, canvasNodes ?? []);
    }, [canvasNodes, store]);


    useEffect(()=>{
        const nodes = store.get(storeNodes);
        const canvas = canvasEl.current;
        const ctx = canvas?.getContext("2d");
        if(!ctx || !canvas) return;
        const onPanning = canvasPointer(canvas,store);
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

            const selectNodeId = store.get(storeSelectNode);
            if(nodes.length !== 0) {
                nodes.forEach((node)=> canvasDraw(ctx,node, node.id === selectNodeId?.id))
            }

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
    },[store,canvasNodes]);

    return <canvas ref={canvasEl}></canvas>
}

export default CanvasRender;