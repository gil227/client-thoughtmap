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