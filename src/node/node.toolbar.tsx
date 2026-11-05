import styled from "@emotion/styled";
import {useEffect, useState} from "react";
import {useStore} from "jotai";
import {storeToolbar} from "@src/store/store.toolbar.ts";

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
        padding:'2px',
        border:'1px solid #000',
    }),
    Li:styled.li({}),
}

const Icon = {
    Button:styled.button<{isActive:boolean}>(({isActive})=>({
        display: 'block',
        width:'30px',
        height:'30px',
        backgroundColor:isActive ? '#b37979':'#2e426c',
        pointerEvents: 'auto',
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
                <Wrapper.Li><Icon.Button onClick={()=>{
                    setIsOnSelect((prev)=>{
                        if(!prev) setIsOnMake(false);
                        return !prev;
                    })
                }} isActive={isOnSelect}></Icon.Button></Wrapper.Li>
                <Wrapper.Li><Icon.Button onClick={()=>{
                    setIsOnMake((prev)=>{
                        if(!prev) setIsOnSelect(false);
                        return !prev;
                    })
                }} isActive={isOnMake}></Icon.Button></Wrapper.Li>
            </Wrapper.Ul>
        </Wrapper.Div>
    </>
}

export default NodeToolbar;