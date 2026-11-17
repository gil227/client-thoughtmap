import styled from "@emotion/styled";
import type {TNodeText} from "@src/interface/interface.api.ts";
import {canvasDashboardToViewport} from "@src/canvas/canvas.transform.ts";
import {useAtomValue} from "jotai";
import {storeViewport} from "@src/store/store.viewport.ts";
import {NODE} from "@src/constant/constant.ts";

interface INodeWrapperCSS {
    x:number;
    y:number;
    width:number;
    height:number;
}

interface ITextAreaCSS {
    y:number;
    width:number;
    height:number;
}

const Wrapper = {
    cover:styled.div({
        position: 'absolute',
        display: 'block',
        left: 0,
        top: 0,
        overflow: 'hidden',
        width:'100%',
        height:'100%',
        pointerEvents: 'none'
    }),
    node:styled.div<{styleInfo:INodeWrapperCSS}>(({styleInfo})=>({
        position:'absolute',
        pointerEvents:'auto',
        backgroundColor:'#000',
        left:`${styleInfo.x}px`,
        top:`${styleInfo.y}px`,
        width:`${styleInfo.width}px`,
        height:`${styleInfo.height}px`,
    }))
}

const TextFiled = {
    textArea:styled.textarea<{styleInfo:ITextAreaCSS}>(({styleInfo})=>({
        position:'absolute',
        left:0,
        right:0,
        top:`${styleInfo.y}px`,
        width:`${styleInfo.width}px`,
        height:`${styleInfo.height}px`,
        margin:'0 auto',
        resize:'none'
    }))
}

function NodeEditorText(nodeObj:TNodeText){
    const viewport = useAtomValue(storeViewport);
    const {x,y} = canvasDashboardToViewport(viewport,{x:nodeObj.positionX,y:nodeObj.positionY});
    const wrapperNodeStyle = {
        width:nodeObj.width,
        height:nodeObj.height,
        x,
        y
    };

    const textAreaStyle = {
        width: nodeObj.width - NODE.PADDING*2,
        height: nodeObj.height - NODE.PADDING*2 - NODE.FONT_LINE_HEIGHT,
        y:NODE.PADDING + NODE.FONT_TITLE_TEXT_SPACING+NODE.FONT_LINE_HEIGHT
    }
    return <Wrapper.cover>
        <Wrapper.node styleInfo={wrapperNodeStyle}>
            <TextFiled.textArea styleInfo={textAreaStyle}></TextFiled.textArea>
        </Wrapper.node>
    </Wrapper.cover>
}

export default NodeEditorText;