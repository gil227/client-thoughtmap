import styled from "@emotion/styled";
import {useState} from "react";
import {useStore} from "jotai";
import {storeToolbarCursor} from "@src/store/store.cursor.ts";
import {IconNodeImage, IconNodeList, IconNodeText, IconSelect} from "@src/icon/icon.toolbar.tsx";
import type {TToolbarState} from "@src/interface/interface.ts";

const toolbarIcon:TToolbarState = [
    {value:'select',IconRC:IconSelect},
    {value:'text',IconRC:IconNodeText},
    {value:'list',IconRC:IconNodeList},
    {value:'image',IconRC:IconNodeImage},
]

const Wrapper = {
    Div:styled.div({
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        width: '100%',
        bottom:0,
        left:0,
        right:0,
        margin:'0 auto',
        justifyContent: 'center',
        zIndex:'9'
    }),
    Ul:styled.ul({
        display: 'flex',
        gap:'4px',
        padding:'5px',
        backgroundColor:'#1F1F26',
        borderRadius:'4px',
    }),
    Li:styled.li({}),
}

const Icon = {
    Button:styled.button<{isActive:boolean,isListType:boolean}>(({isActive,isListType})=>({
        display: 'block',
        padding:'3px',
        backgroundColor:isActive ? '#8B5CF6':'#1F1F26',
        pointerEvents: 'auto',
        borderRadius:'4px',
        svg:{
            stroke:isActive ? '#fff':'#565660',
            circle:{
                fill:isListType && isActive ? '#fff' : isListType ? '#565660':'none',
            }
        }
    }))
}

function NodeToolbar (){

    const [activeIndex, setActiveIndex] = useState<number>(0);
    const store = useStore();

    return <>
        <Wrapper.Div>
            <Wrapper.Ul>
                {toolbarIcon.map(({value,IconRC},index)=>{
                    return <Wrapper.Li key={value}>
                        <Icon.Button onClick={()=>{
                            setActiveIndex(index);
                            store.set(storeToolbarCursor,value);
                        }} isActive={activeIndex === index} isListType={value === 'list'}>
                            <IconRC/>
                        </Icon.Button>
                    </Wrapper.Li>
                })}
            </Wrapper.Ul>
        </Wrapper.Div>
    </>
}

export default NodeToolbar;