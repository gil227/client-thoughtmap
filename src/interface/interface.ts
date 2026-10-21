export interface IRenderSize{
    width:number;
    height:number;
}

export interface ICanvasPosition {
    x:number,
    y:number
}

export interface ICanvasViewport extends ICanvasPosition {
    scale:number,
}