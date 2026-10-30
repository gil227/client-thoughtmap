import type {INode} from "../interface/interface.api.ts";
import {type Store} from "jotai";
import {storeNodes} from "../store/store.nodes.ts";

export const canvasDraw = (ctx:CanvasRenderingContext2D,node:INode,isSelect:boolean) =>{
    ctx.fillStyle = '#ccc';
    ctx.fillRect(node.positionX,node.positionY,node.width,node.height);
    ctx.fillStyle = '#000';
    ctx.font = '20px';

    if(isSelect){
        ctx.strokeStyle = 'blue';
        ctx.strokeRect(node.positionX,node.positionY,node.width,node.height);
    }
    ctx.fillText(node.content,node.positionX + 2,node.positionY+10);
}

export const canvasDrawDispatch = (store:Store,node:INode,moveX:number,moveY:number)=>{
    const oldStoreNodes = store.get(storeNodes);
    const deleteChangedNode = oldStoreNodes.filter(item => item.id !== node.id);
   store.set(storeNodes,{
       ...deleteChangedNode,
       ...[{
           id: node.id,
           canvasId: node.canvasId,
           type:node.type,
           content: node.content,
           positionX: node.positionX + moveX,
           positionY: node.positionY + moveY,
           width: node.width,
           height: node.height,
           createdAt: node.createdAt
       }]
   })
}