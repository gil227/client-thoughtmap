import {type RefObject, useEffect} from "react";
import {canvasPointer} from "@src/canvas/canvas.pointer.ts";
import {canvasWheel} from "@src/canvas/canvas.wheel.ts";
import {canvasKeyboard} from "@src/canvas/canvas.keyboard.ts";
import {CLIENT_SNB} from "@src/constant/constant.ts";
import {canvasDashboardToViewport, canvasViewportToDashboard} from "@src/canvas/canvas.transform.ts";
import {canvasDraw} from "@src/canvas/canvas.draw.ts";
import {canvasRuler} from "@src/canvas/canvas.ruler.ts";
import {storeViewport, storeViewportSize} from "@src/store/store.viewport.ts";
import {useStore} from "jotai";
import {storeNodes, storeSelectNode} from "@src/store/store.nodes.ts";
import type {IHooksNode} from "@src/interface/interface.api.ts";

export const useNodeDraw = (canvasRef:RefObject<HTMLCanvasElement|null>, canvasId:string, {onPatch,onDelete,onMake}:IHooksNode) =>{
    const store = useStore();

    useEffect(()=>{
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if(!ctx || !canvas) return;
        const onPanning = canvasPointer(canvas,store,{
            onPatchHandler:({id,canvasId,changes})=> onPatch({id,canvasId,changes}),
            onMakeHandler:(x,y)=> onMake({x,y,canvasId})
        });
        const onWheel = canvasWheel(canvas,store);
        const onKeyDown = canvasKeyboard(store,{
            onDeleteHandler:(node)=> onDelete(node)
        });

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
            const nodes = store.get(storeNodes);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, styleWidth, styleHeight);

            const getCurrentViewport = store.get(storeViewport);
            const getRulerEndPosition = canvasViewportToDashboard(getCurrentViewport,{x:styleWidth,y:styleHeight});
            const getTransformPosition = canvasDashboardToViewport(getCurrentViewport,{x:0,y:0});

            ctx.setTransform(dpr*getCurrentViewport.scale, 0, 0, dpr*getCurrentViewport.scale, getTransformPosition.x*dpr, getTransformPosition.y*dpr);

            const selectedNode = store.get(storeSelectNode);
            nodes.forEach((node)=> canvasDraw(ctx,node, node.id === selectedNode))

            canvasRuler({ctx,dpr,viewport:getCurrentViewport,dashboard:getRulerEndPosition});
            frame = requestAnimationFrame(loop);
        }

        frame = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("resize", onResizeHandler);
            onPanning();
            onWheel();
            onKeyDown();
        };
    },[canvasId, store]);
}