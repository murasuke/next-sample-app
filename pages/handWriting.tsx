import React from 'react';
import HandWriting from '../components/HandWrinting';

function App() {
  const [dataUrl, setDataUrl] = React.useState(null);
  const [settings, setSettings] = React.useState({lineWidth:7, lineColor: '#5555bb', clear: false})
  
  // 画像コンポーネント更新コールバック
  const onUpdateCanvas = (e: HTMLCanvasElement) => {
    // 画像をstateに保存し下記の用途で利用する
    //  ⇒<img>タグに表示
    //  ⇒画像のダウンロード
    setDataUrl(e.toDataURL('image/png'));
  }

  // 画像ダウンロード
  const downloadCanvasImage = () => {
    const dlLink = document.createElement("a"); 
    dlLink.href = dataUrl;
    dlLink.download = 'handwriting.png';
    dlLink.click();
    dlLink.remove();  
  }

  // 手書きコンポーネント線の幅変更
  const setLineWidth = (e:  React.ChangeEvent<HTMLSelectElement>) => {
    setSettings( prev => {
      return {...prev, lineWidth: parseInt(e.target.value, 10)}
    });
  }

  // 手書きコンポーネント線の色変更
  const setColor= (e:  React.ChangeEvent<HTMLInputElement>) => {
    setSettings( prev => {
      return {...prev, lineColor: e.target.value}
    });
  }

  // 手書きコンポーネントクリア
  const clearComponent= () => {
    setSettings( prev => {
      return {...prev, clear: !prev.clear}
    });
  }

  const lineWidth = [1,2,3,5,7,10,14,20];
  return (
    <>
      <h1>HandWriting(手書き)コンポーネント利用サンプル</h1>
      <div>
        <h2>HandWritingコンポーネント</h2>
          <div>
            <label htmlFor="lineWidth">線の太さ：</label>
            <select name="lineWidth" value={settings.lineWidth} onChange={setLineWidth}>
              {lineWidth.map((i) =><option key={i} value={i}>{i}</option>)}
            </select>
            &nbsp;&nbsp;
            <label htmlFor="lineColor">色：</label>
            <input name="lineColor" type="color" value={settings.lineColor} onChange={setColor}></input>
            &nbsp;&nbsp;
            <button onClick={clearComponent}>クリア</button>
          </div>
          <HandWriting onUpdateCanvas={onUpdateCanvas} {...settings} />
      </div>
      <div>
        <h2>手書きコンポーネントの更新イベントサンプル(imgタグに反映)</h2>
          <img id="newImg" alt="" src={dataUrl} />
      </div>
      <div>
        <button type="button" onClick={downloadCanvasImage}>
          手書きコンポーネント画像ダウンロード
        </button>
      </div>
    </>
  );
}

export default App;
