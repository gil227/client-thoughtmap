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

// NODE TYPE

interface INodeBase{
    id: string,
    canvasId: string,
    positionX: number,
    positionY: number,
    width: number,
    height: number,
    createdAt: string
}

export interface INodeMakeBase{
    width: number,
    height: number,
}

type TNodeTextUnit = {
    type:'text';
    content:{
        title:string;
        body?:string;
    }
}

type TNodeListUnit = {
    type:'list';
    content:{
        title:string;
        items:{label:string,value?:string}[]
    }
}

type TNodeImageUnit = {
    type:'image';
    content:{
        title:string;
        url:string;
        ratio:number;
    }
}

export type TNodeText = INodeBase & TNodeTextUnit;
export type TNodeList = INodeBase & TNodeListUnit;
export type TNodeImage = INodeBase & TNodeImageUnit;

export type TNodeMakeText = INodeMakeBase & TNodeTextUnit;
export type TNodeMakeList = INodeMakeBase & TNodeListUnit;
export type TNodeMakeImage = INodeMakeBase & TNodeImageUnit;

export type TNode = TNodeText | TNodeList | TNodeImage;
export type TNodeMake = TNodeMakeText|TNodeMakeList|TNodeMakeImage;

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
    onDelete:(node:TNode)=>void;
    onMake:({x,y,canvasId}:{x:number,y:number,canvasId:string})=>void;
}