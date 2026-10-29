import CanvasSnb from "../canvas/canvas.snb.tsx";
import {useQuery} from "@tanstack/react-query";
import WithCredentialFetch from "../utils/utils.credential.fetch.ts";
import {API_PASS, QUERY_KEY} from "../constant/constant.ts";
import type {ICanvasListItem} from "../interface/interface.api.ts";
import styled from "@emotion/styled";
import {ComponentsApiLoading} from "../components/api/components.api.loading.tsx";
import {ComponentsApiError} from "../components/api/components.api.error.tsx";

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
    H2:styled.h2({
    }),
    P:styled.p({
    })
}

function PagesCanvas(){
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
            <S.CanvasArea>
                <Text.H2>좌측의 캔버스를 선택하세요</Text.H2>
                <Text.P>선택시 해당 캔버스로 이동합니다.</Text.P>
            </S.CanvasArea>
        </S.Wrapper>
    </>
}

export default PagesCanvas;