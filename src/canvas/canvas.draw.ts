import type {TNode} from "@src/interface/interface.api.ts";
import {type Store} from "jotai";
import {storeNodes} from "@src/store/store.nodes.ts";
import {utilNode} from "@src/util/util.node.ts";

export const canvasDraw = (ctx:CanvasRenderingContext2D,node:TNode,isSelect:boolean) =>{
    ctx.fillStyle = '#ccc';
    ctx.fillRect(node.positionX,node.positionY,node.width,node.height);
    ctx.fillStyle = '#000';
    ctx.font = '20px';

    if(isSelect){
        ctx.strokeStyle = 'blue';
        ctx.strokeRect(node.positionX,node.positionY,node.width,node.height);
    }
    ctx.fillText(node.content.title,node.positionX + 2,node.positionY+10);
}

export const canvasDrawDispatch = (store:Store,nodeId:string,moveX:number,moveY:number)=>{
    const originStoreNodes = store.get(storeNodes);
    const selectNode = utilNode(store);
    if(!selectNode) return console.log('chageNode not found');
    const deleteChangedNode = originStoreNodes.filter(item => item.id !== nodeId);
   store.set(storeNodes,[
       ...deleteChangedNode,
       {
           ...selectNode,
           positionX: selectNode.positionX + moveX,
           positionY: selectNode.positionY + moveY,
       }
   ])
}