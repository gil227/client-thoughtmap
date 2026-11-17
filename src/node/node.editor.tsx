import NodeEditorText from "@src/node/node.editor.text.tsx";
import {useAtomValue, useStore} from "jotai";
import {storeIsEdit, storeSelectNode} from "@src/store/store.nodes.ts";
import {utilNode} from "@src/util/util.node.ts";


function NodeEditor(){
    const store = useStore();
    const selectNode = useAtomValue(storeSelectNode);
    const isEdit = useAtomValue(storeIsEdit);
    const nodeInfo = utilNode(store);

    if(!selectNode || !isEdit || !nodeInfo) return null;
    if(nodeInfo.type === 'text'){
        return <NodeEditorText {...nodeInfo}/>
    }
    return <></>
}

export default NodeEditor;