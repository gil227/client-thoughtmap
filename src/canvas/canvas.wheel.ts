import type {Store} from "jotai";
import {storeViewport, storeViewportSize} from "../store/store.viewport.ts";
import {DASHBOARD} from "../constant/constant.ts";
import {canvasClamp} from "./canvas.transform.ts";

export const canvasWheel =(canvas:HTMLCanvasElement,store:Store)=>{

    const viewportSize = store.get(storeViewportSize);

    const onWheel = (e:WheelEvent) =>{
        e.preventDefault();
        const storeViewportState = store.get(storeViewport);
        if(e.ctrlKey){
            store.set(storeViewport,{
                ...storeViewportState,
                scale:storeViewportState.scale * Math.exp(-e.deltaY*DASHBOARD.ZOOM_SPEED)
            })
            return;
        }

        store.set(storeViewport,canvasClamp({
            ...storeViewportState,
            x:storeViewportState.x + e.deltaX/storeViewportState.scale,
            y:storeViewportState.y + e.deltaY/storeViewportState.scale,
        },viewportSize.width,viewportSize.height))
    }

    canvas.addEventListener("wheel", onWheel,{passive:false});
    return ()=>{
        canvas.removeEventListener("wheel", onWheel);
    }
}