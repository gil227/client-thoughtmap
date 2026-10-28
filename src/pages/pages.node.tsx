import {useParams} from "react-router";

function PagesNode(){
    const {canvasId} = useParams();
    console.log('canvasId', canvasId);
    return <></>
}

export default  PagesNode