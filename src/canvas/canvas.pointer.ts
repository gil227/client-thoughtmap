import {type Store} from "jotai";
import {storeViewport, storeViewportSize} from "../store/store.viewport.ts";
import {canvasClamp, canvasViewportToDashboard} from "./canvas.transform.ts";
import {canvasHitbox} from "./canvas.hitbox.ts";
import {storeNodes, storeSelectNode} from "../store/store.nodes.ts";
import {canvasDrawDispatch} from "./canvas.draw.ts";
import {utilSelectNode} from "../utils/util.select.node.ts";
import type {ICanvasPatch} from "../interface/interface.api.ts";

interface IPointerCallback{
    onPatch:({nodeId,body}:ICanvasPatch) => void;
}

export const canvasPointer = (canvas:HTMLCanvasElement,store:Store,{onPatch}:IPointerCallback)=>{
    let isPanning = false;
    let isDrag = false;
    let lastX = 0;
    let lastY = 0;
    let onPress = false;
    let nodeDragStart:{x:number,y:number}|null = null;

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
        lastX = e.clientX;
        lastY = e.clientY;

        canvas.setPointerCapture(e.pointerId);

        if(!onPress){
            //노드 선택
            const storeNodeState = store.get(storeNodes);
            const storeViewportState = store.get(storeViewport);
            const {x:mouseX,y:mouseY} = canvasViewportToDashboard(storeViewportState,{x:e.offsetX,y:e.offsetY});
            const selectedNode = canvasHitbox(storeNodeState,mouseX,mouseY);
            if(selectedNode){
                isDrag = true;
                nodeDragStart = {x:selectedNode.positionX,y:selectedNode.positionY};
            }
            console.log('isDown');
            store.set(storeSelectNode,selectedNode?.id ?? null);
            return;
        }

        //패닝 상태 및 마지막 위치 저장
        isPanning = true;
        canvas.style.cursor = "grabbing";
    };
    const onPointerMove = (e:PointerEvent) => {
        if(!isPanning && !isDrag) return;
        const selectNode = store.get(storeSelectNode);
        const viewportSize = store.get(storeViewportSize);
        const storeViewportState = store.get(storeViewport);
        const distanceX = (e.clientX - lastX)/storeViewportState.scale;
        const distanceY = (e.clientY - lastY)/storeViewportState.scale;
        lastX = e.clientX;
        lastY = e.clientY;

        if(selectNode && isDrag){
            canvasDrawDispatch(store,selectNode,distanceX, distanceY);
            return;
        }

        //뷰포트 이동
        store.set(storeViewport,canvasClamp({
            ...storeViewportState,
            x:storeViewportState.x - distanceX,
            y:storeViewportState.y - distanceY,
        },viewportSize.width,viewportSize.height))
    };
    const onPointerUp = (e:PointerEvent) => {
        const selectNode = utilSelectNode(store);
        if(selectNode){
            const {id,positionX, positionY} = selectNode;
            onPatch({nodeId:id,body:{...selectNode,positionX,positionY}});
            console.log('start:',nodeDragStart,'/ end:',{x:positionX,y:positionY});
        }
        isPanning = false;
        isDrag = false;
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