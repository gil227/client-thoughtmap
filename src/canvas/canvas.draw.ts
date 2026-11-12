import type {TNode} from "@src/interface/interface.api.ts";
import {type Store} from "jotai";
import {storeNodes} from "@src/store/store.nodes.ts";
import {utilNode} from "@src/util/util.node.ts";
import {canvasTypeText} from "@src/canvas/type/canvas.type.text.ts";
import {NODE} from "@src/constant/constant.ts";
import {storeViewport} from "@src/store/store.viewport.ts";
import {canvasTypeList} from "@src/canvas/type/canvas.type.list.ts";
import {canvasTypeImage} from "@src/canvas/type/canvas.type.image.ts";

interface ICanvasDraw {
    ctx:CanvasRenderingContext2D,
    node:TNode,
    isSelect:boolean,
    store:Store
}

export const canvasDraw = ({ctx, node, isSelect, store}:ICanvasDraw) =>{
    const minX = node.positionX+NODE.PADDING;
    const minY = node.positionY+NODE.PADDING+NODE.FONT_LINE_HEIGHT/2;
    const viewport = store.get(storeViewport);
    ctx.beginPath();

    //노드 기본컬러
    ctx.fillStyle = NODE.BASE_BG;
    ctx.roundRect(node.positionX,node.positionY,node.width,node.height,NODE.ROUND);
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = NODE.BASE_BORDER_COLOR;
    ctx.stroke();

    if(isSelect){
        ctx.lineWidth = 2/viewport.scale;
        ctx.strokeStyle = 'rgb(0 159 255)';
        ctx.strokeRect(node.positionX-0.2,node.positionY-0.2,node.width+0.2,node.height+0.2);
    }

    //노드 공통 (타이틀 속성)
    ctx.textBaseline = "middle";
    ctx.letterSpacing = NODE.FONT_LETTER_SPACING;
    ctx.fillStyle = NODE.FONT_COLOR_TITLE;
    ctx.font = `${NODE.FONT_TITLE} ${NODE.FONT_FAMILY}`;

    if(node.type === 'text'){
        canvasTypeText(ctx,node,{minX,minY});
        return;
    }

    if(node.type === 'list'){
        canvasTypeList(ctx,node,{minX,minY});
        return;
    }

    if(node.type === 'image'){
        canvasTypeImage(ctx,node,{minX,minY});
        return;
    }
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