import styled from "@emotion/styled";
import {useEffect, useState} from "react";
import {useStore} from "jotai";
import {storeToolbar} from "@src/store/store.toolbar.ts";
import {IconAddNode, IconSelect} from "@src/icon/icon.toolbar.tsx";

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
    Button:styled.button<{isActive:boolean}>(({isActive})=>({
        display: 'block',
        padding:'3px',
        backgroundColor:isActive ? '#8B5CF6':'#1F1F26',
        pointerEvents: 'auto',
        borderRadius:'4px',
        svg:{
            stroke:isActive ? '#fff':'#565660'
        }
    }))
}

function NodeToolbar (){
    const [isOnMake,setIsOnMake] = useState<boolean>(false);
    const [isOnSelect,setIsOnSelect] = useState<boolean>(true);
    const store = useStore();

    useEffect(() => {
        if(isOnMake){
            store.set(storeToolbar,'make')
        }else{
            store.set(storeToolbar,'select')
        }
    }, [isOnMake, isOnSelect, store]);
    return <>
        <Wrapper.Div>
            <Wrapper.Ul>
                <Wrapper.Li>
                    <Icon.Button onClick={()=>{
                        setIsOnSelect((prev)=>{
                            if(!prev) setIsOnMake(false);
                            return !prev;
                        })
                    }} isActive={isOnSelect}>
                        <IconSelect/>
                    </Icon.Button>
                </Wrapper.Li>
                <Wrapper.Li>
                    <Icon.Button onClick={()=>{
                    setIsOnMake((prev)=>{
                        if(!prev) setIsOnSelect(false);
                        return !prev;
                    })
                }} isActive={isOnMake}>
                        <IconAddNode/>
                    </Icon.Button>
                </Wrapper.Li>
            </Wrapper.Ul>
        </Wrapper.Div>
    </>
}

export default NodeToolbar;