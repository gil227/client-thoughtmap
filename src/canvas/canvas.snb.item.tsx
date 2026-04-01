interface IProps {
    id:string;
    title:string;
}

function CanvasSnbItem(props:IProps){
    return <li data-canvas-id={props.id}>{props.title}</li>
}

export default CanvasSnbItem;