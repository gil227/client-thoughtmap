import {useEffect, useRef} from "react";
import {useNodeList} from "@src/hooks/use.node.list.ts";
import {useNodeMutate} from "@src/hooks/use.node.mutate.ts";
import {useNodeDraw} from "@src/hooks/use.node.draw.ts";
import {useStore} from "jotai";
import {storeViewport} from "@src/store/store.viewport.ts";
import {storeSelectNode} from "@src/store/store.nodes.ts";

function CanvasRender({canvasId}:{canvasId:string}){
    const canvasEl = useRef<HTMLCanvasElement>(null);
    const store = useStore();

    //canvasId 변경시 store값 리셋
    useEffect(()=>{
        store.set(storeViewport,{x:0,y:0,scale:1});
        store.set(storeSelectNode,null);
    },[canvasId, store])

    const {onPatchNode, onMakeNode, onDeleteNode} = useNodeMutate();
    useNodeList(canvasId);
    useNodeDraw(canvasEl,canvasId,{onPatch:onPatchNode,onDelete:onDeleteNode,onMake:onMakeNode})

    return <canvas ref={canvasEl}></canvas>
}

export default CanvasRender;