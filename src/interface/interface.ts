export interface IRenderSize{
    width:number;
    height:number;
}

type Position = {
    x:number;
    y:number;
}

export type TViewportTargetPosition = Position;
export type TDashboardTargetPosition = Position;

export interface ICanvasViewport extends Position {
    scale:number,
}

export interface ICanvasViewportSize{
    width:number,
    height:number
}