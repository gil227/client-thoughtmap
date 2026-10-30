import CanvasSnb from "../canvas/canvas.snb.tsx";
import styled from "@emotion/styled";

const S = {
    Wrapper:styled.div({
        display:'flex',
    }),
    CanvasArea:styled.div({
        display:'flex',
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
    })
}

const Text = {
    H2:styled.h2({}),
    P:styled.p({})
}

function PagesCanvas(){
    return <>
        <S.Wrapper>
            <CanvasSnb/>
            <S.CanvasArea>
                <Text.H2>좌측의 캔버스를 선택하세요</Text.H2>
                <Text.P>선택시 해당 캔버스로 이동합니다.</Text.P>
            </S.CanvasArea>
        </S.Wrapper>
    </>
}

export default PagesCanvas;