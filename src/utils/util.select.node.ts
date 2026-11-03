import type {Store} from "jotai";
import {storeNodes, storeSelectNode} from "../store/store.nodes.ts";
import type {INode} from "../interface/interface.api.ts";

/*
* 노드 id값으로 선택된 노드 객체 전체를 반환하는 함수
* @param store jotai 스토어
* @return 선택된 노드 객체
* */
export const utilSelectNode = (store:Store):INode|undefined =>{
    const selectNodeId = store.get(storeSelectNode);
    const nodesList = store.get(storeNodes);

    return nodesList.find(node => node.id === selectNodeId);
}