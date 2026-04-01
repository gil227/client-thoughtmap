import React from "react";

export interface ILoginPayload {
    email: string;
    password: string;
}

export interface ICanvasList{
    ref:React.Ref<HTMLElement>
    isLoading:boolean;
    list:ICanvasListItem[];
}

export interface ICanvasListItem{
    id:string;
    title:string;
    createAt:string;
    updateAt:string;
}