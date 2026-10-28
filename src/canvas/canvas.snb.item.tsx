import styled from "@emotion/styled";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import WithCredentialFetch from "../utils/utils.credential.fetch.ts";
import {API_PASS} from "../constant/constant.ts";
import {useState} from "react";

interface IProps {
    id:string;
    title:string;
}

const S = {
    item:styled.li({
        listStyle:'none',
        margin:0,
        padding:'1em',
        border:'1px solid #ccc'

    }),
    iconContainer:styled.ul({
        gap:'10px',
        display:'flex',
        alignItems: 'center',
    }),
    iconWrapper:styled.li({}),
    iconRename:styled.button({
        display:'block',
        backgroundColor:'#5e5e5e',
    }),
    iconRenameDone:styled.button({
        display:'block',
        backgroundColor:'#5e5e5e',
    }),
    iconDelete:styled.button({
        display:'block',
        backgroundColor:'red',
    }),
}

function CanvasSnbItem(props:IProps){
    const queryClient = useQueryClient();
    const [isRepair, setRepair] = useState<boolean>(false);
    const [repairTitle,setRepairTitle]=useState<string|undefined>(undefined);
    const {mutate:onRepair} = useMutation(({
        mutationFn:async ()=>{
            const res = await WithCredentialFetch(`${API_PASS.CANVAS_LIST}/${props.id}`,{
                method:'PATCH',
                body:JSON.stringify({title:repairTitle})
            });

            if(!res?.ok) throw new Error('수정실패')
        },
        onSuccess:()=> {
            queryClient.invalidateQueries({queryKey:['canvasList']});
            setRepair(false);
        }
    }))
     const {mutate:onDelete} = useMutation(({
         mutationFn:async () => {
             const res = await WithCredentialFetch(`${API_PASS.CANVAS_LIST}/${props.id}`,{
                 method:"DELETE"
             });

             if(!res?.ok) throw new Error('삭제 실패')
         },
         onSuccess:()=>{
             queryClient.invalidateQueries({queryKey:['canvasList']})
         }
     }))
    console.log('isRepair',isRepair);
    return <S.item data-canvas-id={props.id}>
        <form onSubmit={(e)=>{
            e.preventDefault();
            if(!repairTitle?.trim()) return console.log('빈값입니다');
            onRepair();
        }}>
            {isRepair && <input type="text" value={!repairTitle ? props.title : repairTitle} onChange={e => setRepairTitle(e.target.value)}/>}
            {!isRepair && <span>{props.title}</span>}
        <S.iconContainer>
                <S.iconWrapper>
                    {!isRepair && <S.iconRename type={'button'} onClick={()=>{
                        setRepair(()=> !isRepair)
                    }}>수정</S.iconRename>}
                    {isRepair && <S.iconRenameDone type={'submit'}>완료</S.iconRenameDone>}
                </S.iconWrapper>
                <S.iconWrapper>
                    <S.iconDelete type={'button'} onClick={()=> onDelete()}>삭제</S.iconDelete>
                </S.iconWrapper>
        </S.iconContainer>
        </form>
    </S.item>
}

export default CanvasSnbItem;