import {type Store} from "jotai";
import {storeViewport} from "../store/store.viewport.ts";

export const canvasPanning = (store:Store)=>{
    let isPanning = false;
    let lastX = 0;
    let lastY = 0;

    const onPointerDown = (e:PointerEvent) => {
        isPanning = true;
        lastX = e.clientX;
        lastY = e.clientY;
    };
    const onPointerMove = (e:PointerEvent) => {
        if(!isPanning) return;
        const distanceX = e.clientX - lastX;
        const distanceY = e.clientY - lastY;

        const storeViewportState = store.get(storeViewport);

        store.set(storeViewport,{
            ...storeViewportState,
            x:storeViewportState.x - distanceX/storeViewportState.scale,
            y:storeViewportState.y - distanceY/storeViewportState.scale,
        })
    };
    const onPointerUp = () => {
        isPanning = false;
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerDown);
    window.addEventListener('pointerup', onPointerDown);

    return () =>{
        window.removeEventListener('pointerdown', onPointerDown);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
    }
}