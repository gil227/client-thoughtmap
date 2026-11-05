import {atom} from "jotai";
import type {INode} from "@src/interface/interface.api.ts";

export const storeNodes = atom<INode[]>([]);
export const storeSelectNode = atom<string|null>(null);