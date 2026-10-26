import {useEffect, useRef} from "react";
import {CLIENT_SNB} from "../constant/constant.ts";
import {useStore} from "jotai";
import {storeViewport} from "../store/store.viewport.ts";
import {canvasDashboardToViewport, canvasViewportToDashboard} from "./canvas.transform.ts";
import {canvasRuler} from "./canvas.ruler.ts";
import {canvasPanning} from "./canvas.panning.ts";

function CanvasRender(){
    const canvasEl = useRef<HTMLCanvasElement>(null);
    const store = useStore();


    useEffect(()=>{
        const canvas = canvasEl.current;
        const ctx = canvas?.getContext("2d");
        if(!ctx || !canvas) return;

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
            ctx.fillRect(moveX,100,100,100);

            canvasRuler({ctx,dpr,viewport:getCurrentViewport,dashboard:getRulerEndPosition});
            canvasPanning(store);
            moveX+=5;
            if(moveX>styleWidth) moveX=0;
            frame = requestAnimationFrame(loop);
        }

        frame = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("resize", onResizeHandler);
        };
    },[store]);

    return <canvas ref={canvasEl}></canvas>
}

export default CanvasRender;