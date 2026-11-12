import type {TNodeImage} from "@src/interface/interface.api.ts";
import type {ITextStartXY} from "@src/interface/interface.ts";
import {NODE} from "@src/constant/constant.ts";
import {utilNodeImageLoad} from "@src/util/util.node.ts";

export const canvasTypeImage = (ctx:CanvasRenderingContext2D,node:TNodeImage,{minX,minY}:ITextStartXY) =>{
    const bodyStartY = minY+NODE.FONT_LINE_HEIGHT+NODE.FONT_TITLE_TEXT_SPACING;
    const img = utilNodeImageLoad(node.content.url);
    const imgWidth = node.width - NODE.PADDING*2;
    // const imgHeight = minY + node.height - bodyStartY - NODE.PADDING;
    const imgHeight = node.height-NODE.FONT_LINE_HEIGHT*1.5-NODE.FONT_TITLE_TEXT_SPACING-NODE.PADDING*2;


    //제목
    ctx.fillText(node.content.title,minX,minY);

    ctx.fillStyle = "#000";
    //본문
    /*if(img?.status === 'loading'){
        ctx.roundRect(minX,bodyStartY,imgWidth,imgHeight,NODE.ROUND);
    }*/

    ctx.beginPath();
    ctx.roundRect(minX,bodyStartY,imgWidth,imgHeight,NODE.ROUND);
    ctx.fill();
}