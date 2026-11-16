import type {TNodeText} from "@src/interface/interface.api.ts";
import {NODE} from "@src/constant/constant.ts";
import {utilNodeIcon, utilNodeWordBreak} from "@src/util/util.node.ts";
import type {ITextStartXY} from "@src/interface/interface.ts";

export const canvasTypeText = (ctx:CanvasRenderingContext2D,node:TNodeText,{minX,minY}:ITextStartXY) =>{
    const titleX = minX;
    const titleY = minY;
    const bodyY = minY+NODE.FONT_LINE_HEIGHT+NODE.FONT_TITLE_TEXT_SPACING;
    const bodyText = node.content.body ?? NODE.TYPE_TEXT_PLACEHOLDER;

    //제목
    ctx.fillText(node.content.title,titleX,titleY);

    //아이콘
    utilNodeIcon(ctx,node);


    //본문
    if(!node.content.body){
        ctx.font = `italic ${NODE.FONT_TEXT} ${NODE.FONT_FAMILY}`;
    }else{
        ctx.font = `${NODE.FONT_TEXT} ${NODE.FONT_FAMILY}`;
    }

    ctx.fillStyle = NODE.FONT_COLOR_TEXT;
    const bodyTextWidth = ctx.measureText(bodyText).width;
    const nodeWidth = node.width - NODE.PADDING*2

    if(nodeWidth < bodyTextWidth){
        const textLines = utilNodeWordBreak(ctx,bodyText,{maxWidth:nodeWidth,maxLineNumber:NODE.MAX_TEXT_LINE})
        textLines.forEach((line,i)=>{
            ctx.fillText(line,titleX,bodyY + NODE.FONT_LINE_HEIGHT*i);
        })
        return;
    }

    ctx.fillText(bodyText,titleX,bodyY);
}