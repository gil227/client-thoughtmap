import {atom, type PrimitiveAtom} from "jotai";
import type {ICanvasViewport, ICanvasViewportSize} from "../interface/interface.ts";

export const storeViewport:PrimitiveAtom<ICanvasViewport> = atom({
    x:0,
    y:0,
    scale:1
})

export const storeViewportSize:PrimitiveAtom<ICanvasViewportSize> = atom({
    width:0,
    height:0
})