import {NODE} from "@src/constant/constant.ts";
import type {TNodeList} from "@src/interface/interface.api.ts";
import type {ITextStartXY} from "@src/interface/interface.ts";
import {utilNodeIcon} from "@src/util/util.node.ts";

export const canvasTypeList = (ctx: CanvasRenderingContext2D,node:TNodeList,{minX,minY}:ITextStartXY) => {
    const bodyY = minY+NODE.FONT_LINE_HEIGHT+NODE.FONT_TITLE_TEXT_SPACING;
    const alignRightBodyX = minX+node.width-NODE.PADDING*2;

    //제목
    ctx.fillText(node.content.title,minX,minY);

    //아이콘
    utilNodeIcon(ctx,node);

    //본문
    node.content.items.forEach((item,i)=>{
        ctx.textAlign = 'left';
        ctx.fillStyle = NODE.FONT_COLOR_TEXT;
        ctx.font = `${NODE.FONT_TEXT} ${NODE.FONT_FAMILY}`;
        ctx.fillText(item.label,minX,bodyY + NODE.FONT_LINE_HEIGHT*i);

        if(item.value){
            ctx.textAlign = 'right';
            ctx.fillStyle = NODE.FONT_COLOR_TITLE;
            ctx.font = `${NODE.FONT_TITLE} ${NODE.FONT_FAMILY}`;
            ctx.fillText(item.value,alignRightBodyX,bodyY + NODE.FONT_LINE_HEIGHT*i);
        }

        ctx.lineWidth = 1;
        ctx.strokeStyle = NODE.LINE_COLOR;
        ctx.moveTo(minX,bodyY + NODE.FONT_LINE_HEIGHT/2 + NODE.FONT_LINE_HEIGHT*i);
        ctx.lineTo(alignRightBodyX,bodyY + NODE.FONT_LINE_HEIGHT/2 + NODE.FONT_LINE_HEIGHT*i);
        ctx.stroke();
    })
}