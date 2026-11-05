import {atom} from "jotai";
import type {Toolbar} from "@src/interface/interface.ts";

export const storeToolbar = atom<Toolbar>('select');