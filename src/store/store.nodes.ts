import {atom} from "jotai";
import type {INode} from "../interface/interface.api.ts";

export const storeNodes = atom<INode[]>([]);
export const storeSelectNode = atom<INode|null>(null);