import styled from "@emotion/styled";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import WithCredentialFetch from "../utils/utils.credential.fetch.ts";
import {API_PASS, CLIENT_PASS, QUERY_KEY} from "../constant/constant.ts";
import {useState} from "react";
import {Link} from "react-router";

interface IProps {
    id:string;
    title:string;
}

const ItemLinkStyled = styled(Link)`
    display: block;
    padding: 1em;
`;

const S = {
    item:styled.li({
        listStyle:'none',
        margin:0,
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
        padding:'0.5em 1em',
    }),
    iconRenameDone:styled.button({
        display:'block',
        backgroundColor:'#5e5e5e',
        padding:'0.5em 1em',
    }),
    iconDelete:styled.button({
        display:'block',
        padding:'0.5em 1em',
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
            queryClient.invalidateQueries({queryKey:[QUERY_KEY.CANVAS_LIST]});
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
             queryClient.invalidateQueries({queryKey:[QUERY_KEY.CANVAS_LIST]})
         }
     }))
    return <S.item data-canvas-id={props.id}>
        <ItemLinkStyled to={`${CLIENT_PASS.CANVAS}/${props.id}/nodes`}>
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
        </ItemLinkStyled>
    </S.item>
}

export default CanvasSnbItem;