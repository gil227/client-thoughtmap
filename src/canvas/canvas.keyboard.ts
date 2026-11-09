import type {Store} from "jotai";
import type {TNode} from "@src/interface/interface.api.ts";
import {utilNode} from "@src/util/util.node.ts";

interface ICallback {
    onDeleteHandler: (node:TNode) => void;
}

export const canvasKeyboard = (store:Store,{onDeleteHandler}:ICallback) =>{

    const onKeyDown = (e: KeyboardEvent) => {
        const selectNode = utilNode(store);
        if(selectNode && e.code === 'Backspace'){
            onDeleteHandler(selectNode);
        }
    }

    window.addEventListener('keydown',onKeyDown)
    return ()=>{
        window.removeEventListener('keydown',onKeyDown)
    }
}