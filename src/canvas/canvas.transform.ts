import type {
    ICanvasViewport,
    TDashboardTargetPosition, TViewportTargetPosition
} from "../interface/interface.ts";
import {DASHBOARD} from "../constant/constant.ts";

// 뷰포트 상태값: 브라우저의 캔버스 영역이 대시보드(월드)의 시작점(왼쪽위 모서리좌표)과 배율값
// 대시보드: 작업영역의 전체 (월드)

/*
* 대시보드의 해당좌표가 뷰포트 기준 어느 좌표에 해당하는지 변환하는 함수 (상대좌표)
* @param v 뷰포트 시작점과 배율정보
* @param t 대시보드(월드)의 요소 좌표
* @return 해당하는 요소의 뷰포트기준 좌표
* */

//scale 2
//v.x:100 v.y:100, v.scale:2 , t.x:300 t.y:200
//300,200 -> 400,200
export const canvasDashboardToViewport = (v:ICanvasViewport,t:TDashboardTargetPosition):TViewportTargetPosition =>{
    const x = (t.x - v.x)*v.scale;
    const y = (t.y - v.y)*v.scale;
    return {x,y}
};

/*
* 뷰포트 화면의 해당 좌표가 전체 보드(월드)의 어디에 해당하는지 변환하는 함수
* @param v 뷰포트 시작점과 배율정보
* @param t 요소의 뷰포트기준 x,y 좌표
* @return 요소의 대시보드기준 x,y 좌표
* */

//scale 2
//v.x:100 v.y:100, v.scale:2 , t.x:400 t.y:200
//400,200 -> 300,200
//
export const canvasViewportToDashboard = (v:ICanvasViewport,t:TViewportTargetPosition):TDashboardTargetPosition =>{
    const x = t.x/v.scale + v.x;
    const y = t.y/v.scale + v.y;
    return {x,y}
};

export const canvasClamp = (v:ICanvasViewport,width:number,height:number):ICanvasViewport =>{
    const size = DASHBOARD.MAX - DASHBOARD.MIN;

    const minScale = Math.max(width/size, height/size,DASHBOARD.MIN_SCALE);
    const scale = Math.min(Math.max(v.scale,minScale),DASHBOARD.MAX_SCALE);

    const currentViewWidth =  width/scale;
    const currentViewHeight =  height/scale;

    return {
        scale,
        x:Math.min(Math.max(v.x, DASHBOARD.MIN), DASHBOARD.MAX - currentViewWidth),
        y:Math.min(Math.max(v.y,DASHBOARD.MIN), DASHBOARD.MAX - currentViewHeight),
    }
}