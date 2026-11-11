import type {TNodeText} from "@src/interface/interface.api.ts";
import {NODE} from "@src/constant/constant.ts";

interface IMinXY{
    minX:number;
    minY:number;
}

export const canvasTypeText = (ctx:CanvasRenderingContext2D,node:TNodeText,{minX,minY}:IMinXY) =>{
    const titleX = minX;
    const titleY = minY;

    ctx.textBaseline = "hanging";
    ctx.letterSpacing = NODE.FONT_LETTER_SPACING;

    //제목
    ctx.fillStyle = NODE.FONT_COLOR_TITLE;
    ctx.font = `${NODE.FONT_TITLE} ${NODE.FONT_FAMILY}`;
    ctx.fillText(node.content.title,titleX,titleY);

    //본문
    if(!node.content.body) return;
    ctx.fillStyle = NODE.FONT_COLOR_TEXT;
    ctx.font = `${NODE.FONT_TEXT} ${NODE.FONT_FAMILY}`;
    const bodyTextWidth = ctx.measureText(node.content.body).width;
    const nodeWidth = node.width - NODE.PADDING*2

    if(nodeWidth > bodyTextWidth){
        ctx.fillText(node.content.body,titleX,titleY + 20);
        return;
    }


}