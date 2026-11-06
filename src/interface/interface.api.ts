export interface IAuthPayload {
    email: string;
    password: string;
}

export interface ICanvasListItem{
    id:string;
    title:string;
    createAt:string;
    updateAt:string;
}

export interface INode{
    id: string,
    canvasId: string,
    type:'text' | 'image',
    content: string,
    positionX: number,
    positionY: number,
    width: number,
    height: number,
    createdAt: string
}

export type TNodeChanges = {
    positionX: number,
    positionY: number
}

export interface INodePatch {
    id:string;
    canvasId:string;
    changes:TNodeChanges
}

export interface IHooksNode{
    onPatch:({id, canvasId, changes}:INodePatch)=>void;
    onDelete:(node:INode)=>void;
    onMake:({x,y,canvasId}:{x:number,y:number,canvasId:string})=>void;
}