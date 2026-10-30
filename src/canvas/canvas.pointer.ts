import {type Store} from "jotai";
import {storeViewport, storeViewportSize} from "../store/store.viewport.ts";
import {canvasClamp, canvasViewportToDashboard} from "./canvas.transform.ts";
import {canvasHitbox} from "./canvas.hitbox.ts";
import {storeNodes, storeSelectNode} from "../store/store.nodes.ts";
import {canvasDrawDispatch} from "./canvas.draw.ts";

export const canvasPointer = (canvas:HTMLCanvasElement, store:Store)=>{
    let isPanning = false;
    let lastX = 0;
    let lastY = 0;
    let onPress = false;
    const viewportSize = store.get(storeViewportSize);

    const onSpacebarsDown = (e:KeyboardEvent) =>{
        if(e.code === 'Space'){
            onPress = true;
            canvas.style.cursor = "grab";
        }
    }
    const onSpacebarsUp = (e:KeyboardEvent) =>{
        if(e.code === 'Space'){
            onPress = false;
            canvas.style.cursor = "default";
        }
    }

    const onPointerDown = (e:PointerEvent) => {
        if(!onPress){
            //노드 선택
            const storeNodeState = store.get(storeNodes);
            const storeViewportState = store.get(storeViewport);
            const {x:mouseX,y:mouseY} = canvasViewportToDashboard(storeViewportState,{x:e.offsetX,y:e.offsetY});
            const selectedNode = canvasHitbox(storeNodeState,mouseX,mouseY);
            store.set(storeSelectNode,selectedNode);
            return;
        }

        //패닝 상태 및 마지막 위치 저장
        isPanning = true;
        canvas.style.cursor = "grabbing";
        lastX = e.clientX;
        lastY = e.clientY;

        canvas.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e:PointerEvent) => {
        const selectNode = store.get(storeSelectNode);
        if(!onPress && selectNode){
            canvasDrawDispatch(store,selectNode,e.clientX - lastX, e.offsetY-lastY);
        }

        if(!isPanning || !onPress) {
            return
        }

        const storeViewportState = store.get(storeViewport);
        const distanceX = e.clientX - lastX;
        const distanceY = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;

        store.set(storeViewport,canvasClamp({
            ...storeViewportState,
            x:storeViewportState.x - distanceX/storeViewportState.scale,
            y:storeViewportState.y - distanceY/storeViewportState.scale,
        },viewportSize.width,viewportSize.height))
    };
    const onPointerUp = (e:PointerEvent) => {
        isPanning = false;
        canvas.releasePointerCapture(e.pointerId);
    };

    //클릭 드래그
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);

    //스페이스바
    window.addEventListener('keydown', onSpacebarsDown);
    window.addEventListener('keyup', onSpacebarsUp);

    return () =>{
        canvas.removeEventListener('pointerdown', onPointerDown);
        canvas.removeEventListener('pointermove', onPointerMove);
        canvas.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('keydown', onSpacebarsDown);
        window.removeEventListener('keyup', onSpacebarsUp);
    }
}