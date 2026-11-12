import type {TNodeText} from "@src/interface/interface.api.ts";
import {NODE} from "@src/constant/constant.ts";
import {utilNodeWordBreak} from "@src/util/util.node.ts";
import type {ITextStartXY} from "@src/interface/interface.ts";

export const canvasTypeText = (ctx:CanvasRenderingContext2D,node:TNodeText,{minX,minY}:ITextStartXY) =>{
    const titleX = minX;
    const titleY = minY;
    const bodyY = minY+NODE.FONT_LINE_HEIGHT+NODE.FONT_TITLE_TEXT_SPACING;

    //제목
    ctx.fillText(node.content.title,titleX,titleY);

    //본문
    if(!node.content.body) return;
    ctx.fillStyle = NODE.FONT_COLOR_TEXT;
    ctx.font = `${NODE.FONT_TEXT} ${NODE.FONT_FAMILY}`;
    const bodyTextWidth = ctx.measureText(node.content.body).width;
    const nodeWidth = node.width - NODE.PADDING*2

    if(nodeWidth < bodyTextWidth){
        const textLines = utilNodeWordBreak(ctx,node.content.body,{maxWidth:nodeWidth,maxLineNumber:NODE.MAX_TEXT_LINE})
        textLines.forEach((line,i)=>{
            ctx.fillText(line,titleX,bodyY + NODE.FONT_LINE_HEIGHT*i);
        })
        return;
    }

    ctx.fillText(node.content.body,titleX,bodyY);
}