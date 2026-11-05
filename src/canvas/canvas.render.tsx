import {useEffect, useRef} from "react";
import {API_PASS, CLIENT_SNB, QUERY_KEY} from "@src/constant/constant.ts";
import {useStore} from "jotai";
import {storeViewport, storeViewportSize} from "@src/store/store.viewport.ts";
import {canvasDashboardToViewport, canvasViewportToDashboard} from "@src/canvas/canvas.transform.ts";
import {canvasRuler} from "@src/canvas/canvas.ruler.ts";
import {canvasPointer} from "@src/canvas/canvas.pointer.ts";
import {canvasWheel} from "@src/canvas/canvas.wheel.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {INode} from "@src/interface/interface.api.ts";
import WithCredentialFetch from "@src/utils/utils.credential.fetch.ts";
import {canvasDraw} from "@src/canvas/canvas.draw.ts";
import {storeNodes, storeSelectNode} from "@src/store/store.nodes.ts";
import {canvasKeyboard} from "@src/canvas/canvas.keyboard.ts";

function CanvasRender({canvasId}:{canvasId:string}){
    const canvasEl = useRef<HTMLCanvasElement>(null);
    const store = useStore();
    const queryClient = useQueryClient();

    const {data:canvasNodes} = useQuery<INode[]>({
        queryKey:QUERY_KEY.CANVAS_NODES(canvasId),
        queryFn:async () =>{
            const res = await WithCredentialFetch(`${API_PASS.CANVAS_LIST}/${canvasId}/nodes`);
            if(!res) throw new Error('리스폰스가 언디파인 입니다.');
            const resData:INode[] = await res.json();
            return resData.length === 0 ? [] : resData;
        },
        staleTime:5_000
    });

    const {mutate:onPatchNode} = useMutation(({
        mutationFn:async (node:INode)=>{
            const res = await WithCredentialFetch(`${API_PASS.CANVAS_LIST}/${canvasId}/nodes/${node.id}`,{
                method:'PATCH',
                body:JSON.stringify(node)
            })
            if(!res?.ok) throw new Error('수정실패')
        },
        onSuccess:(_,node)=>{
            queryClient.setQueryData<INode[]>(QUERY_KEY.CANVAS_NODES(canvasId),(before)=>{
                return before?.map((oldNode) => {
                   return oldNode.id === node.id ? {...oldNode, positionX:node.positionX, positionY:node.positionY} : oldNode
                })
            })
        }
    }))

    const {mutate:deleteNode} = useMutation(({
        mutationFn:async (node:INode)=>{
            const deleteNode = await WithCredentialFetch(`${API_PASS.CANVAS_LIST}/${canvasId}/nodes/${node.id}`,{
                method:'DELETE'
            });
            if(!deleteNode?.ok) throw new Error('삭제실패')
        },
        onSuccess:(_,selectNode)=>{
            queryClient.setQueryData<INode[]>(QUERY_KEY.CANVAS_NODES(canvasId),(before)=>{
                return before?.filter((node)=> node.id !== selectNode.id)
            })
        }
    }))

    const {mutate:onMakeNode} = useMutation(({
        mutationFn:async ({x,y}:{x:number,y:number}) =>{
            const res = await WithCredentialFetch(`${API_PASS.CANVAS_LIST}/${canvasId}/nodes`,{
                method:'POST',
                body:JSON.stringify({
                    type: 'text',
                    content: 'make test',
                    positionX: x,
                    positionY: y,
                    width: 400,
                    height: 200
                })
            });

            if(!res?.ok) throw new Error('노드 추가 실패')
        }
    }))

    useEffect(() => {
        store.set(storeNodes, canvasNodes ?? []);
    }, [canvasNodes, store]);


    useEffect(()=>{
        const canvas = canvasEl.current;
        const ctx = canvas?.getContext("2d");
        if(!ctx || !canvas) return;
        const onPanning = canvasPointer(canvas,store,{
            onPatch:(node)=> onPatchNode(node),
            onMake:(x,y)=> onMakeNode({x,y})
        });
        const onWheel = canvasWheel(canvas,store);
        const onKeyDown = canvasKeyboard(store,{
            onDeleteNode:(node)=> deleteNode(node)
        });

        let frame = 0;
        let styleWidth = 0;
        let styleHeight = 0;
        let dpr = 1;

        const onResizeHandler = () =>{
            styleWidth = window.innerWidth - CLIENT_SNB.WIDTH;
            styleHeight = window.innerHeight;
            dpr = devicePixelRatio;

            canvas.style.width = `${styleWidth}px`;
            canvas.style.height = `${styleHeight}px`;
            canvas.width = Math.round(styleWidth*dpr);
            canvas.height = Math.round(styleHeight*dpr);

            store.set(storeViewportSize,{
                width: styleWidth,
                height: styleHeight
            })
        }

        onResizeHandler();
        window.addEventListener("resize", onResizeHandler);

        const loop = () =>{
            const nodes = store.get(storeNodes);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, styleWidth, styleHeight);

            const getCurrentViewport = store.get(storeViewport);
            const getRulerEndPosition = canvasViewportToDashboard(getCurrentViewport,{x:styleWidth,y:styleHeight});
            const getTransformPosition = canvasDashboardToViewport(getCurrentViewport,{x:0,y:0});

            ctx.setTransform(dpr*getCurrentViewport.scale, 0, 0, dpr*getCurrentViewport.scale, getTransformPosition.x*dpr, getTransformPosition.y*dpr);

            const selectedNode = store.get(storeSelectNode);
            nodes.forEach((node)=> canvasDraw(ctx,node, node.id === selectedNode))

            canvasRuler({ctx,dpr,viewport:getCurrentViewport,dashboard:getRulerEndPosition});
            frame = requestAnimationFrame(loop);
        }

        frame = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("resize", onResizeHandler);
            onPanning();
            onWheel();
            onKeyDown();
        };
    },[store]);

    return <canvas ref={canvasEl}></canvas>
}

export default CanvasRender;