import type {INode} from "../interface/interface.api.ts";


/*
* 마우스 클릭 시 해당 노드가 어떤노드 인지 확인
* @param nodes 해당 캔버스의 노드들
* @param mouseX 클릭한 마우스 x 값 (대시보드 기준)
* @param mouseY 클릭한 마우스 y 값 (대시보드 기준)
* @return 선택요소 or null
* */
export const canvasHitbox =(nodes:INode[],mouseX:number,mouseY:number)=>{
    for(let i=0;i<nodes.length;i++){
        const node = nodes[i];
        const isPositionX = node.positionX <= mouseX && mouseX <=node.positionX + node.width;
        const isPositionY = node.positionY <= mouseY && mouseY <=node.positionY + node.height;
        if(isPositionX && isPositionY) return node;
    }
    return null;
}