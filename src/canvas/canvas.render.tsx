import type {IRenderSize} from "../interface/interface.ts";

function CanvasRender(props:IRenderSize){
    return <canvas width={props.width} height={props.height}></canvas>
}

export default CanvasRender;