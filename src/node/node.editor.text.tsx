import styled from "@emotion/styled";
import type { IHooksNode, TNodeText } from "@src/interface/interface.api.ts";
import { canvasDashboardToViewport } from "@src/canvas/canvas.transform.ts";
import { useAtomValue, useSetAtom } from "jotai";
import { storeViewport } from "@src/store/store.viewport.ts";
import { NODE } from "@src/constant/constant.ts";
import { useEffect, useRef } from "react";
import { storeIsEdit } from "@src/store/store.nodes.ts";

interface INodeWrapperCSS {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ITextAreaCSS {
  y: number;
  width: number;
  height: number;
}

interface IProps {
  nodeObj: TNodeText;
  patchFn: IHooksNode["onPatch"];
}

const Wrapper = {
  cover: styled.div({
    position: "absolute",
    display: "block",
    left: 0,
    top: 0,
    overflow: "hidden",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
  }),
  node: styled.div<{ styleInfo: INodeWrapperCSS }>(({ styleInfo }) => ({
    position: "absolute",
    pointerEvents: "auto",
    left: `${styleInfo.x}px`,
    top: `${styleInfo.y}px`,
    width: `${styleInfo.width}px`,
    height: `${styleInfo.height}px`,
  })),
};

const TextFiled = {
  textArea: styled.textarea<{ styleInfo: ITextAreaCSS }>(({ styleInfo }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    border: "none",
    backgroundColor: NODE.BASE_BG,
    font: `${NODE.FONT_TEXT}/${NODE.FONT_LINE_HEIGHT}px ${NODE.FONT_FAMILY}`,
    letterSpacing: NODE.FONT_LETTER_SPACING,
    color: NODE.FONT_COLOR_TEXT,
    top: `${styleInfo.y}px`,
    width: `${styleInfo.width}px`,
    height: `${styleInfo.height}px`,
    margin: "0 auto",
    resize: "none",
    outline: "none",
  })),
};

function NodeEditorText({ patchFn, nodeObj }: IProps) {
  const originValue = useRef(nodeObj.content.body ?? "");
  const currentValue = nodeObj.content.body ?? "";
  const correctionFlag = useRef(false);
  const textAreaEl = useRef<HTMLTextAreaElement | null>(null);
  const setIsEdit = useSetAtom(storeIsEdit);
  const viewport = useAtomValue(storeViewport);
  const { x, y } = canvasDashboardToViewport(viewport, {
    x: nodeObj.positionX,
    y: nodeObj.positionY,
  });

  const onCorrection = (el: HTMLTextAreaElement | null) => {
    if (!el) return;
    if (correctionFlag.current) return;
    correctionFlag.current = true;
    if (originValue.current === el.value) return;
    patchFn({
      id: nodeObj.id,
      canvasId: nodeObj.canvasId,
      changes: {
        content: { title: nodeObj.content.title, body: el.value || undefined },
      },
    });
  };

  const wrapperNodeStyle = {
    width: nodeObj.width,
    height: nodeObj.height,
    x,
    y,
  };

  const textAreaStyle = {
    width: nodeObj.width - NODE.PADDING * 2,
    height: nodeObj.height - NODE.PADDING * 2 - NODE.FONT_LINE_HEIGHT,
    y: NODE.PADDING + NODE.FONT_TITLE_TEXT_SPACING + NODE.FONT_LINE_HEIGHT,
  };

  useEffect(() => {
    const el = textAreaEl.current;
    correctionFlag.current = false;
    return () => onCorrection(el);
  }, []);

  return (
    <Wrapper.cover>
      <Wrapper.node styleInfo={wrapperNodeStyle}>
        <TextFiled.textArea
          styleInfo={textAreaStyle}
          defaultValue={currentValue}
          ref={textAreaEl}
          onBlur={(e) => {
            onCorrection(e.currentTarget);
            setIsEdit(false);
          }}
        ></TextFiled.textArea>
      </Wrapper.node>
    </Wrapper.cover>
  );
}

export default NodeEditorText;
