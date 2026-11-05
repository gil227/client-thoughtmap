import CanvasSnb from "@src/canvas/canvas.snb.tsx";
import CanvasRender from "@src/canvas/canvas.render.tsx";
import styled from "@emotion/styled";
import {useParams} from "react-router";
import {ComponentsApiError} from "@src/components/api/components.api.error.tsx";
import NodeToolbar from "@src/node/node.toolbar.tsx";

const S = {
    Wrapper:styled.div({
        display:'flex',
    }),
    CanvasArea:styled.div({
        position:'relative'
    })
}

function PagesNode(){
    const {canvasId} = useParams();
    return <>
        <S.Wrapper>
            <CanvasSnb />
            {canvasId ? <S.CanvasArea>
                <NodeToolbar/>
                <CanvasRender canvasId={canvasId}/>
            </S.CanvasArea> : <ComponentsApiError/>}
        </S.Wrapper>
    </>
}

export default  PagesNode