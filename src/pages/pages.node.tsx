import {useQuery} from "@tanstack/react-query";
import type {ICanvasListItem} from "../interface/interface.api.ts";
import WithCredentialFetch from "../utils/utils.credential.fetch.ts";
import {API_PASS, QUERY_KEY} from "../constant/constant.ts";
import CanvasSnb from "../canvas/canvas.snb.tsx";
import CanvasRender from "../canvas/canvas.render.tsx";
import styled from "@emotion/styled";
import {ComponentsApiLoading} from "../components/api/components.api.loading.tsx";
import {ComponentsApiError} from "../components/api/components.api.error.tsx";

const S = {
    Wrapper:styled.div({
        display:'flex',
    })
}

function PagesNode(){
    const {isPending,error,data:canvasList} = useQuery<ICanvasListItem[]>({
        queryKey:[QUERY_KEY.CANVAS_LIST],
        queryFn:async () =>{
            const res = await WithCredentialFetch(API_PASS.CANVAS_LIST);
            if(!res) throw new Error('리스폰스가 언디파인 입니다.');
            const resData:ICanvasListItem[] = await res.json();
            return resData.length === 0 ? [] : resData;
        },
        staleTime:10_000
    })
    return <>
        {isPending && <ComponentsApiLoading/>}
        {error && <ComponentsApiError/>}
        <S.Wrapper>
            <CanvasSnb list={canvasList ?? []} isLoading={isPending}/>
            <CanvasRender/>
        </S.Wrapper>
    </>
}

export default  PagesNode