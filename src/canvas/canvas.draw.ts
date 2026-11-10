import type {TNode} from "@src/interface/interface.api.ts";
import {type Store} from "jotai";
import {storeNodes} from "@src/store/store.nodes.ts";
import {utilNode} from "@src/util/util.node.ts";
import {canvasTypeText} from "@src/canvas/type/canvas.type.text.ts";
import {NODE} from "@src/constant/constant.ts";

export const canvasDraw = (ctx:CanvasRenderingContext2D,node:TNode,isSelect:boolean) =>{
    const minX = node.positionX+NODE.PADDING;
    const minY = node.positionY+NODE.PADDING;
    ctx.beginPath();
    ctx.fillStyle = '#ccc';
    ctx.roundRect(node.positionX,node.positionY,node.width,node.height,NODE.ROUND);
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.font = '20px';

    if(isSelect){
        ctx.strokeStyle = 'blue';
        ctx.strokeRect(node.positionX,node.positionY,node.width,node.height);
    }

    if(node.type === 'text'){
        canvasTypeText(ctx,node,{minX,minY});
        return;
    }
    ctx.fillText(node.content.title,minX,minY);
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