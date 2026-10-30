import type {Store} from "jotai";
import {storeViewport, storeViewportSize} from "../store/store.viewport.ts";
import {DASHBOARD} from "../constant/constant.ts";
import {canvasClamp, canvasClampZoom, canvasViewportToDashboard} from "./canvas.transform.ts";

export const canvasWheel =(canvas:HTMLCanvasElement,store:Store)=>{

    const onWheel = (e:WheelEvent) =>{
        e.preventDefault();
        const viewportSize = store.get(storeViewportSize);
        const storeViewportState = store.get(storeViewport);

        if(e.ctrlKey){
            const cursor = {x:e.offsetX, y:e.offsetY};
            const scaleAnchor = canvasViewportToDashboard(storeViewportState,cursor);
            const scaleValue = storeViewportState.scale * Math.exp(-e.deltaY*DASHBOARD.ZOOM_SPEED);
            const scaleClampValue = canvasClampZoom(scaleValue,viewportSize.width,viewportSize.height);
            store.set(storeViewport,canvasClamp({
                x:scaleAnchor.x - cursor.x / scaleClampValue,
                y:scaleAnchor.y - cursor.y / scaleClampValue,
                scale:scaleClampValue
            },viewportSize.width,viewportSize.height));
            return;
        }

        store.set(storeViewport,canvasClamp({
            ...storeViewportState,
            x:storeViewportState.x + e.deltaX/storeViewportState.scale,
            y:storeViewportState.y + e.deltaY/storeViewportState.scale,
        },viewportSize.width,viewportSize.height));
    }

    canvas.addEventListener("wheel", onWheel,{passive:false});
    return ()=>{
        canvas.removeEventListener("wheel", onWheel);
    }
}