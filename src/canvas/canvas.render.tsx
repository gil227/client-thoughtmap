import {useEffect, useRef} from "react";
import {CLIENT_SNB} from "../constant/constant.ts";
import {useStore} from "jotai";
import {storeViewport} from "../store/store.viewport.ts";
import {canvasWorldToScreen} from "./canvas.transform.ts";
import type {ICanvasPosition} from "../interface/interface.ts";

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

        const ruler = (screen:ICanvasPosition) =>{
            ctx.beginPath();
            ctx.strokeStyle = 'white';
            ctx.lineWidth=2;
            for (let i=screen.x; i<styleWidth; i+=50){
                ctx.moveTo(i,0);
                ctx.lineTo(i,10);
            }
            ctx.stroke();
        }

        const loop = () =>{
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const {x,y,scale} = store.get(storeViewport);
            ctx.clearRect(0, 0, styleWidth, styleHeight);
            ctx.setTransform(dpr*scale, 0, 0, dpr*scale, dpr*x, dpr*y);

            const screenPosition = canvasWorldToScreen({x,y,scale},{x:styleWidth,y:styleHeight});
            ruler(screenPosition);
            ctx.fillStyle = '#ccc';
            ctx.fillRect(moveX,100,100,100);

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