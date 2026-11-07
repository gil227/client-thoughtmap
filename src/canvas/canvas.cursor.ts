import type {Store} from "jotai";
import {storeKeyboardCursor, storeToolbarCursor} from "@src/store/store.cursor.ts";

export const canvasCursor = (store:Store,canvas:HTMLCanvasElement)=>{
    const cursorToolbar = store.get(storeToolbarCursor);
    const cursorKeyboard = store.get(storeKeyboardCursor);

    if(cursorKeyboard === 'panning') {
        canvas.style.cursor = 'grabbing';
    }else if(cursorKeyboard === 'space') {
        canvas.style.cursor = 'grab';
    }else if(cursorToolbar === 'select'){
        canvas.style.cursor = 'default';
    }else if(cursorToolbar === 'make'){
        canvas.style.cursor = 'crosshair';
    }
}