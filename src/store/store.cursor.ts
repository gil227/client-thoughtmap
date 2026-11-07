import {atom} from "jotai";
import type {keyboard, Toolbar} from "@src/interface/interface.ts";

export const storeToolbarCursor = atom<Toolbar>('select');
export const storeKeyboardCursor = atom<keyboard>('default');