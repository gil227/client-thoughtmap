import {useEffect, useRef} from "react";
import {CLIENT_SNB, DASHBOARD} from "../constant/constant.ts";
import {useStore} from "jotai";
import {storeViewport} from "../store/store.viewport.ts";
import {canvasDashboardToViewport, canvasViewportToDashboard} from "./canvas.transform.ts";

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

        const ruler = (startX:number,endX:number) =>{
            const from = Math.max(DASHBOARD.MIN, Math.floor(startX / DASHBOARD.GRID) * DASHBOARD.GRID);
            const end = Math.min(DASHBOARD.MAX, endX);
            ctx.beginPath();
            ctx.strokeStyle = 'white';
            ctx.lineWidth=2;
            for (let i=from; i<end; i+=DASHBOARD.GRID){
                ctx.moveTo(i,0);
                ctx.lineTo(i,10);
            }
            ctx.stroke();
        }

        const loop = () =>{
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, styleWidth, styleHeight);

            const {x,y,scale} = store.get(storeViewport);

            const getRulerEndPosition = canvasViewportToDashboard({x,y,scale},{x:styleWidth,y:styleHeight});
            const getTransformPosition = canvasDashboardToViewport({x,y,scale},{x:0,y:0});

            ctx.setTransform(dpr*scale, 0, 0, dpr*scale, getTransformPosition.x*dpr, getTransformPosition.y*dpr);
            ruler(x,getRulerEndPosition.x);
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