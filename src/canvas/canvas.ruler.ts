import {canvasDashboardToViewport} from "./canvas.transform.ts";
import {DASHBOARD} from "../constant/constant.ts";
import type {ICanvasViewport, TDashboardTargetPosition} from "../interface/interface.ts";

interface IProps{
    ctx:CanvasRenderingContext2D;
    dpr:number;
    viewport:ICanvasViewport,
    dashboard:TDashboardTargetPosition
}

export const canvasRuler = ({ctx,dpr,viewport,dashboard}:IProps) =>{
    const fromX = Math.max(DASHBOARD.MIN, Math.floor(viewport.x / DASHBOARD.GRID) * DASHBOARD.GRID);
    const fromY = Math.max(DASHBOARD.MIN, Math.floor(viewport.y / DASHBOARD.GRID) * DASHBOARD.GRID);
    const endX = Math.min(DASHBOARD.MAX, dashboard.x);
    const endY = Math.min(DASHBOARD.MAX, dashboard.y);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth=2;
    for (let i=fromX; i<endX; i+=DASHBOARD.GRID){
        const {x} = canvasDashboardToViewport(viewport,{x:i,y:0})
        ctx.moveTo(x,0);
        ctx.lineTo(x,10);
    }
    for (let i = fromY; i<endY; i+=DASHBOARD.GRID){
        const {y} = canvasDashboardToViewport(viewport,{x:0,y:i})
        ctx.moveTo(0,y);
        ctx.lineTo(10,y);
    }
    ctx.stroke();
}