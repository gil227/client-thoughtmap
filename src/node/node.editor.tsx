import NodeEditorText from "@src/node/node.editor.text.tsx";
import {useAtomValue, useStore} from "jotai";
import {storeIsEdit, storeSelectNode} from "@src/store/store.nodes.ts";
import {utilNode} from "@src/util/util.node.ts";
import type {IHooksNode} from "@src/interface/interface.api.ts";

interface IProps {
    patchFn:IHooksNode['onPatch'];
}

function NodeEditor({patchFn}:IProps) {
    const store = useStore();
    const selectNode = useAtomValue(storeSelectNode);
    const isEdit = useAtomValue(storeIsEdit);
    const nodeInfo = utilNode(store);

    if(!selectNode || !isEdit || !nodeInfo) return null;
    if(nodeInfo.type === 'text'){
        return <NodeEditorText patchFn={patchFn} nodeObj={nodeInfo}/>
    }
    return <></>
}

export default NodeEditor;