import type {ICanvasPosition, ICanvasViewport} from "../interface/interface.ts";

export const canvasWorldToScreen = (v:ICanvasViewport,w:ICanvasPosition):ICanvasPosition =>{
    const x = w.x * v.scale + v.x;
    const y = w.y * v.scale + v.y;
    return {x,y}
};
export const canvasScreenToWorld = (v:ICanvasViewport,w:ICanvasPosition):ICanvasPosition =>{
    const x = (w.x - v.x)/v.scale;
    const y = (w.y - v.y)/v.scale;
    return {x,y}
};