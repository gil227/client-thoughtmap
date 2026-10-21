import {atom, type PrimitiveAtom} from "jotai";
import type {ICanvasViewport} from "../interface/interface.ts";

export const storeViewport:PrimitiveAtom<ICanvasViewport> = atom({
    x:0,
    y:0,
    scale:0.5
})