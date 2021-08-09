import React, { useRef, useState, useEffect } from "react";

/**
 * 手書きコンポーネントprops定義
 */
export type HandWritingAttribute = {
  width?: number,
  height?: number,
  lineWidth?: number,
  lineColor?: string,
  lineCap?: CanvasLineCap,
  clear?: boolean,
  onUpdateCanvas?: (e: HTMLCanvasElement) => void,
}

/**
 * 手書きコンポーネント(ドラッグ中線を描画する)
 * ・props経由で、線の太さ、色を指定
 * ・onUpdateCanvas()で線描画毎にコールバック
 * ・props.clearの値をトグルする毎にクリア
 * @param props 
 * @returns 
 */
const HandWriting: React.FC<HandWritingAttribute> = (props) => {
  // canvasはDOMを直接操作するためuseRef()経由で操作する
  const canvas = useRef(null);
  // ドラッグ中判断フラグ(マウスを離すか、canvas外へ出たらfalse)
  const [drawing, setDrawing] = useState(false);

  // 領域クリア用。親コンポーネントでclearの値を変更するとcanvasをクリアする(toggle時常にクリア)
  useEffect(() => {
    const ctx = (canvas.current as HTMLCanvasElement).getContext('2d');
    if( ctx ) {
      ctx.clearRect(0, 0, props.width, props.height);
      if (props.onUpdateCanvas) props.onUpdateCanvas(canvas.current);
    }
  }, [props.clear]);

  // 描画に必要なcontextを取得し、線の色、幅をセットする
  const getContext = () => {
    const ctx = (canvas.current as HTMLCanvasElement).getContext('2d');
    ctx.lineWidth = props.lineWidth;
    ctx.lineCap = props.lineCap;
    ctx.strokeStyle = props.lineColor;
    return ctx;
  }
  
  type MouseOrTouchEventHandler<T = Element> = React.EventHandler<React.MouseEvent<T>| React.TouchEvent<T>>;

  // 線描画開始処理。beginPath()で新しいパスを開始する(開始しないと色や太さが変更できない)
  const drawStart: MouseOrTouchEventHandler = (e) =>  {
    const { offsetX: x ,offsetY: y } = offsetPosition(e);
    setDrawing(true);
    const ctx = getContext();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  // 動きに合わせて線を描画する
  const drawMove: MouseOrTouchEventHandler = (e) => {
    if (!drawing) return;
    const { offsetX: x ,offsetY: y } = offsetPosition(e);
    const ctx = getContext();
    ctx.lineTo(x, y);
    ctx.stroke();
  } 

  // 線描画完了(canvas更新イベントコールバックを行う)
  const endDrawing = () => {
    setDrawing(false);
    if (props.onUpdateCanvas) props.onUpdateCanvas(canvas.current);
  }

  // offset(canvas左上からの)を返す。Touch,Mouseイベント両対応
  const offsetPosition =  (e : React.MouseEvent | React.TouchEvent) => {
    if (e.nativeEvent instanceof TouchEvent) {
      const rect = (e.target as any).getBoundingClientRect();      
      const offsetX = (e.nativeEvent.touches[0].clientX - window.pageXOffset - rect.left);
      const offsetY = (e.nativeEvent.touches[0].clientY - window.pageYOffset - rect.top);
      return { offsetX, offsetY };
    } else if (e.nativeEvent instanceof MouseEvent) {
      return { offsetX: e.nativeEvent.offsetX ,offsetY: e.nativeEvent.offsetY };
    }
  }

  return (
    <>
      <canvas ref={canvas}
        width={props.width} height={props.height}
        onMouseDown={drawStart} 
        onMouseMove={drawMove} 
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        onTouchStart={drawStart} 
        onTouchMove={drawMove} 
        onTouchEnd={endDrawing} />
    </>
  );
};

// propsのデフォルト値を設定
HandWriting.defaultProps = {
  width: 500,
  height: 300,
  lineWidth: 10,
  lineColor: "rgb(100, 100, 100)",
  lineCap: "round",
};

export default HandWriting;
