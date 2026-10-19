import {useEffect, useRef} from "react";
import {CLIENT_SNB} from "../constant/constant.ts";

function CanvasRender(){
    const canvasEl = useRef<HTMLCanvasElement>(null);

    useEffect(()=>{
        const canvas = canvasEl.current;
        const ctx = canvas?.getContext("2d");
        if(!ctx) return;

        let moveX = 0;
        let frame = 0;

        const onResizeHandler = () =>{
            if(!canvas) return;
            canvas.width = window.innerWidth - CLIENT_SNB.WIDTH;
            canvas.height = window.innerHeight;
        }

        onResizeHandler();
        window.addEventListener("resize", onResizeHandler);

        const loop = () =>{
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.fillStyle = '#ccc';
            ctx.fillRect(moveX,100,100,100);

            moveX+=5;
            if(moveX>ctx.canvas.width) moveX=0;
            frame = requestAnimationFrame(loop);
        }

        frame = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("resize", onResizeHandler);
        };
    },[]);

    return <canvas ref={canvasEl}></canvas>
}

export default CanvasRender;