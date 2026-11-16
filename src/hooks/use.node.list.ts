import {useEffect} from "react";
import {useStore} from "jotai";
import {storeNodes} from "@src/store/store.nodes.ts";
import type {TNode} from "@src/interface/interface.api.ts";
import {useQuery} from "@tanstack/react-query";
import {API_PASS, QUERY_KEY} from "@src/constant/constant.ts";
import WithCredentialFetch from "@src/util/util.credential.fetch.ts";
import {utilNodeCalcHeight} from "@src/util/util.node.ts";

export const useNodeList = (canvasId:string) => {
    const store = useStore();

    const {data:canvasNodes} = useQuery<TNode[]>({
        queryKey:QUERY_KEY.CANVAS_NODES(canvasId),
        queryFn:async () =>{
            const res = await WithCredentialFetch(`${API_PASS.CANVAS_LIST}/${canvasId}/nodes`);
            if(!res.ok) throw new Error('리스폰스가 언디파인 입니다.');
            const resData:TNode[] = await res.json();
            return resData;
        },
        staleTime:5_000
    });

    useEffect(()=>{
        let isCancel = false;

        //폰트 로드가 된 뒤 한번만 실행
        document.fonts.ready.then(() => {
            if(isCancel) return;
            const calcHeightNodeList = (canvasNodes ?? []).map((nodeItem)=>({
                ...nodeItem,
                height:utilNodeCalcHeight(nodeItem)
            }))

            store.set(storeNodes,calcHeightNodeList);
        });

        return () => {
            isCancel = true
        };
    },[canvasNodes, store])
}