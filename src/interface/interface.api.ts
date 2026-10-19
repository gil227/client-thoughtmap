export interface IAuthPayload {
    email: string;
    password: string;
}

export interface ICanvasList{
    isLoading:boolean;
    list:ICanvasListItem[];
}

export interface ICanvasListItem{
    id:string;
    title:string;
    createAt:string;
    updateAt:string;
}