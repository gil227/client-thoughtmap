import type {Store} from "jotai";
import {storeNodes, storeSelectNode} from "@src/store/store.nodes.ts";
import type {
    TNode,
    TNodeMake,
    INodeMakeBase
} from "@src/interface/interface.api.ts";
import {NODE} from "@src/constant/constant.ts";
import type {IDrawImage, IWordBreak, TImageLoad} from "@src/interface/interface.ts";

/*
* 노드 id값으로 선택된 노드 객체 전체를 반환하는 함수
* @param store jotai 스토어
* @return 선택된 노드 객체
* */
export const utilNode = (store:Store):TNode|undefined =>{
    const selectNodeId = store.get(storeSelectNode);
    const nodesList = store.get(storeNodes);

    return nodesList.find(node => node.id === selectNodeId);
}

/*
* 소수 첫쨰까지 반올림 계산
* @return ex) 10.163132 => 10.2
* */
export const utilNodeMathRound =(v:number)=>{
    return Math.round(v*10)/10;
};


/*
* 노드생성 기본값
* */
export const utilNodeBaseValue = (type:TNodeMake['type']):TNodeMake=>{
    const baseSize:INodeMakeBase = {
        width:NODE.WIDTH_PRESET('S'),
        height:NODE.MIN_HEIGHT
    };

    if(type === 'text'){
        return {
            type:'text',
            content:{
                title:"새 노드"
            },
            ...baseSize
        }
    }

    if(type === 'list'){
        return {
            type:'list',
            content:{
                title:"새 노드",
                items:[
                    {
                        label:"새 목록"
                    }
                ]
            },
            ...baseSize
        }
    }

    return {
        type:'image',
        content:{
            title:"새 노드",
            url:"https://images.unsplash.com/photo-1794136006725-c08fd5b269f3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
            ratio:1
        },
        width:NODE.WIDTH_PRESET('L'),
        height:NODE.TYPE_IMAGE_BASE_HEIGHT
    }
}


/*
* 노드안 텍스트가 넓이보다 넘쳤을때 줄바꿈
* */
export const utilNodeWordBreak = (ctx:CanvasRenderingContext2D,text:string,{maxWidth,maxLineNumber}:IWordBreak)=>{
    const lines:string[] = [];
    const isFit = (s:string) => ctx.measureText(s).width <= maxWidth;

    /*단어 한개가 노드 넓이를 넘는경우
    * ex) url를 집어 넣는경우
    * */
    const wordBreak = (word:string) =>{
        const assemblyArr:string[] = [];
        let current = '';
        for(const paragraph of word){
            if(current && !isFit(current+paragraph)){
                assemblyArr.push(current);
                current = paragraph;
            }else{
                current += paragraph;
            }
        }
        if(current) assemblyArr.push(current);

        return assemblyArr;
    }

    for(const char of text.split('\n')){
        const spaceWords = char.split(' ');
        let line:string = '';

        for(const word of spaceWords){
            const combine = line ? `${line} ${word}` : word;

            if(isFit(combine)){
                line = combine;
                continue;
            }

            if(line) lines.push(line);

            //새 줄 시작
            if(isFit(word)){
                line = word;
            }else{
                const wideWordBreak = wordBreak(word);
                lines.push(...wideWordBreak.slice(0,-1));
                line = wideWordBreak[wideWordBreak.length-1] ?? '';
            }
        }
        lines.push(line);
    }

    if(lines.length > maxLineNumber){
        const visibleLines = lines.slice(0, maxLineNumber);
        let last = visibleLines[visibleLines.length - 1];

        //점을 붙였을때 넓이가 넘칠경우 한글자씩 잘라냄
        while(last && !isFit(`${last}...`)){
            last = last.slice(0,-1);
        }
        visibleLines[maxLineNumber - 1] = `${last.trimEnd()}...`;

        return visibleLines
    }

    return lines;
}

/*
* 이미지 로드 체크 함수
* */
const imageCache = new Map<string,TImageLoad>();
export const utilNodeImageLoad = (url:string) =>{
    const cached = imageCache.get(url);
    if(cached) return cached;

    const img = new Image();
    imageCache.set(url,{status:'loading',img});
    img.onload = ()=> imageCache.set(url,{status:'loaded',img});
    img.onerror = ()=> imageCache.set(url,{status:'error'});
    img.src = url;

    return imageCache.get(url);
}

/*
* 이미지 크롭 후 drawImage 함수
* */
export const utilNodeDrawImage = ({ctx,imgEl,dx,dy,dw,dh}:IDrawImage) =>{
  if(!imgEl || imgEl.status !== 'loaded') return;
  const imgDom = imgEl.img;
  const imgNW = imgDom.naturalWidth;
  const imgNH = imgDom.naturalHeight;
  const imgWidthRatio = dw/imgNW;
  const imgHeightRatio = dh/imgNH;

  const ratio = Math.max(imgWidthRatio,imgHeightRatio);

  const viewportWidth = dw/ratio;
  const viewportHeight = dh/ratio;

  const viewportX = (imgNW - viewportWidth)/2;
  const viewportY = (imgNH - viewportHeight)/2;

  ctx.drawImage(imgDom,viewportX,viewportY,viewportWidth,viewportHeight,dx,dy,dw,dh);
}

/*
* 노드타입별 아이콘 드로우 함수
* */
const nodeIcon = {
    text:  new Path2D('M5 6V5h14v1 M12 5v14 M9 19h6'),
    list:  new Path2D('M9 6h11 M9 12h11 M9 18h11 M4.5 6h.01 M4.5 12h.01 M4.5 18h.01'),
    image: new Path2D(
        'M6 4.5h12a2.5 2.5 0 0 1 2.5 2.5v10a2.5 2.5 0 0 1-2.5 2.5H6A2.5 2.5 0 0 1 3.5 17V7A2.5 2.5 0 0 1 6 4.5z' +
        ' M10.5 10a1.5 1.5 0 1 1-3 0a1.5 1.5 0 1 1 3 0z' +
        ' M20.5 15.5l-4.5-4.5L6 19.5'
    ),
}

export const utilNodeIcon = (ctx:CanvasRenderingContext2D,node:TNode) =>{
    const iconX = node.positionX + node.width - NODE.PADDING*2
    const iconY = node.positionY + NODE.PADDING*2 - NODE.FONT_LINE_HEIGHT/2 - NODE.ICON_SIZE/4;

    //아이콘그리기
    ctx.save();
    ctx.translate(iconX,iconY);
    ctx.scale(NODE.ICON_SIZE/24,NODE.ICON_SIZE/24);
    ctx.strokeStyle = '#8E8E98';
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke(nodeIcon[node.type]);
    ctx.restore();
}