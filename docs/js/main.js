window.addEventListener('load', event => {
    // 各種イベントハンドラを登録
    document.getElementById("button1")
      .addEventListener('click', function(){updateMessageText('ボタン1')},false);
   
    document.getElementById("button2")
      .addEventListener('click', function(){updateMessageText('ボタン2')},false);   
});

function updateMessageText(message) {

    const elem = document.getElementById("message");
    if (elem === null) {
      // 要素が存在しなければエラーログを出力
      console.log("no message element");
      return;
    }
   
    // 要素内のテキストを書き換える
    elem.innerText = message;
}

