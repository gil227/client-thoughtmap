import type {Store} from "jotai";
import {storeNodes, storeSelectNode} from "@src/store/store.nodes.ts";
import type {
    TNode,
    TNodeMake,
    INodeMakeBase
} from "@src/interface/interface.api.ts";
import {NODE} from "@src/constant/constant.ts";

/*
* 노드 id값으로 선택된 노드 객체 전체를 반환하는 함수
* @param store jotai 스토어
* @return 선택된 노드 객체
* */
export const utilNode = (store:Store):TNode|undefined =>{
    const selectNodeId = store.get(storeSelectNode);
    const nodesList = store.get(storeNodes);

    return nodesList.find(node => node.id === selectNodeId);
}

/*
* 소수 첫쨰까지 반올림 계산
* @return ex) 10.163132 => 10.2
* */
export const utilNodeMathRound =(v:number)=>{
    return Math.round(v*10)/10;
};


/*
* 노드생성 기본값
* */
export const utilNodeBaseValue = (type:TNodeMake['type']):TNodeMake=>{
    const baseSize:INodeMakeBase = {
        width:NODE.WIDTH_PRESET('S'),
        height:NODE.MIN_HEIGHT
    };

    if(type === 'text'){
        return {
            type:'text',
            content:{
                title:"새 노드"
            },
            ...baseSize
        }
    }

    if(type === 'list'){
        return {
            type:'list',
            content:{
                title:"새 노드",
                items:[
                    {
                        label:"새 목록"
                    }
                ]
            },
            ...baseSize
        }
    }

    return {
        type:'image',
        content:{
            title:"새 노드",
            url:"https://images.unsplash.com/photo-1794136006725-c08fd5b269f3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
            ratio:1
        },
        ...baseSize
    }
}