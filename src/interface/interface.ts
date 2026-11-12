import type {TNode} from "@src/interface/interface.api.ts";
import React from "react";

export interface IRenderSize{
    width:number;
    height:number;
}

export type Position = {
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

export type TToolbarState = {value:Toolbar,IconRC:React.FC}[];

export type Toolbar = 'select'|TNode['type'];
export type keyboard = 'default'|'space'|'panning';

export type TImageLoad = {status:'loaded',img:HTMLImageElement} | {status:'loading',img:HTMLImageElement} | {status:'error'}

export interface ITextStartXY{
    minX:number;
    minY:number;
}

export interface IWordBreak{
    maxWidth:number;
    maxLineNumber:number;
}