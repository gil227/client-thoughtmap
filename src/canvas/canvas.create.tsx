import styled from "@emotion/styled";
import React, {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import WithCredentialFetch from "../utils/utils.credential.fetch.ts";
import {API_PASS} from "../constant/constant.ts";

const S = {
    Wrapper:styled.section({
        position: "fixed",
        width:'100%',
        height:'100vh',
        background:'rgba(0,0,0,0.3)',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top:0,
        left:0,
        zIndex:'99999'
    }),
    createWrapper:styled.article({
        width:'400px',
        margin:'0 auto',
        background:'#fff',
        padding:'10px',
        borderRadius:'5px'
    }),
    createField:styled.input({}),
    createButton:styled.button({
        display:'block'
    })
}

interface IProps{
    onSuccessCreate: React.Dispatch<boolean>;
}

function CanvasCreate(props:IProps){
    const queryClient = useQueryClient();
    const [canvasName, setCanvasName] = useState<string>('');

    const {mutate} = useMutation(({
        mutationFn:async () => {
            const res = await WithCredentialFetch(API_PASS.CANVAS_LIST,{
                method:"POST",
                body:JSON.stringify({title:canvasName})
            });

            return res.json();
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['canvasList']}).then(()=>{
                props.onSuccessCreate(false);
            })
        }
    }))
    return <S.Wrapper>
        <S.createWrapper>
            <form onSubmit={(e)=>{
                e.preventDefault();
                mutate();
            }}>
                <S.createField type={'text'} value={canvasName} onChange={(e)=> setCanvasName(e.target.value)}></S.createField>
                <S.createButton type={'submit'}>생성</S.createButton>
            </form>
        </S.createWrapper>
    </S.Wrapper>
}

export default CanvasCreate;