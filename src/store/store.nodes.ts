import {atom} from "jotai";
import type {TNode} from "@src/interface/interface.api.ts";

export const storeNodes = atom<TNode[]>([]);
export const storeSelectNode = atom<string|null>(null);