import styled from "@emotion/styled";
import type {ICanvasList} from "../interface/interface.api.ts";

const S = {
    Section:styled.section({
        width:'300px',
        height:'100vh',
        borderRight:'2px solid #ccc'
    }),
    ListWrap:styled.ul({}),
    ListItem:styled.li({})
}

function CanvasSnb({list}:{list?:ICanvasList[]}){
    return <S.Section>
        {!list && '비어있음'}
        {list && <S.ListWrap>
            {list.map((item)=>{
                return <S.ListItem>{item.title}</S.ListItem>
            })}
        </S.ListWrap>}
    </S.Section>
}

export default CanvasSnb;