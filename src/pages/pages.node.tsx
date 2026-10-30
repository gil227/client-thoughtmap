import CanvasSnb from "../canvas/canvas.snb.tsx";
import CanvasRender from "../canvas/canvas.render.tsx";
import styled from "@emotion/styled";
import {useParams} from "react-router";
import {ComponentsApiError} from "../components/api/components.api.error.tsx";

const S = {
    Wrapper:styled.div({
        display:'flex',
    })
}

function PagesNode(){
    const {canvasId} = useParams();
    return <>
        <S.Wrapper>
            <CanvasSnb />
            {canvasId ? <CanvasRender canvasId={canvasId}/> : <ComponentsApiError/>}
        </S.Wrapper>
    </>
}

export default  PagesNode