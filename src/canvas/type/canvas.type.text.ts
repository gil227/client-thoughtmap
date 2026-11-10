import type {TNodeText} from "@src/interface/interface.api.ts";

interface IMinXY{
    minX:number;
    minY:number;
}

export const canvasTypeText = (ctx:CanvasRenderingContext2D,node:TNodeText,{minX,minY}:IMinXY) =>{
    const titleX = minX;
    const titleY = minY;
    ctx.textBaseline = "hanging";
    ctx.fillText(node.content.title,titleX,titleY);
    if(node.content.body){
        ctx.fillText(node.content.body,titleX,titleY + 12);
    }
}