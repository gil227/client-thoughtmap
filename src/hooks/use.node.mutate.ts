import {API_PASS, QUERY_KEY} from "@src/constant/constant.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {TNode, INodePatch} from "@src/interface/interface.api.ts";
import WithCredentialFetch from "@src/util/util.credential.fetch.ts";

export const useNodeMutate = () =>{
    const queryClient = useQueryClient();

    const {mutate:onPatchNode} = useMutation(({
        mutationFn:async ({id,canvasId,changes}:INodePatch)=>{
            const patchRes = await WithCredentialFetch(`${API_PASS.CANVAS_LIST}/${canvasId}/nodes/${id}`,{
                method:'PATCH',
                body:JSON.stringify(changes)
            })
            if(!patchRes.ok) throw new Error('수정실패')
        },
        onSuccess:(_,{id,canvasId,changes})=>{
            queryClient.setQueryData<TNode[]>(QUERY_KEY.CANVAS_NODES(canvasId),(before)=>{
                return before?.map((oldNode) => {
                    return oldNode.id === id ? {...oldNode, ...changes} : oldNode
                })
            })
        }
    }))

    const {mutate:onDeleteNode} = useMutation(({
        mutationFn:async (node:TNode)=>{
            const deleteNode = await WithCredentialFetch(`${API_PASS.CANVAS_LIST}/${node.canvasId}/nodes/${node.id}`,{
                method:'DELETE'
            });
            if(!deleteNode.ok) throw new Error('삭제실패')
        },
        onSuccess:(_,selectNode)=>{
            queryClient.setQueryData<TNode[]>(QUERY_KEY.CANVAS_NODES(selectNode.canvasId),(before)=>{
                return before?.filter((node)=> node.id !== selectNode.id)
            })
        }
    }))

    const {mutate:onMakeNode} = useMutation(({
        mutationFn:async ({x,y,canvasId}:{x:number,y:number,canvasId:string}):Promise<TNode> =>{
            const makeRes = await WithCredentialFetch(`${API_PASS.CANVAS_LIST}/${canvasId}/nodes`,{
                method:'POST',
                body:JSON.stringify({
                    type: 'text',
                    content: {title:'make test',body:'test body'},
                    positionX: x,
                    positionY: y,
                    width: 400,
                    height: 200
                })
            });
            if(!makeRes.ok) throw new Error('노드 추가 실패')
            return makeRes.json();
        },
        onSuccess:(resData)=>{
            queryClient.setQueryData<TNode[]>(QUERY_KEY.CANVAS_NODES(resData.canvasId),(before)=>{
                return [...(before ?? []),resData];
            })
        }
    }))

    return {
        onPatchNode,
        onMakeNode,
        onDeleteNode
    }
}