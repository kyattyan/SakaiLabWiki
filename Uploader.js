$(function() {
    $('body').ready(function() {
        // ------------------------------------------------------------
		// サポートチェック
		// ------------------------------------------------------------
		if(!(window.addEventListener)) return;
        if(!(window.FormData)) return;

        if (window.File && window.FileReader && window.FileList && window.Blob) {
            // Great success! All the File APIs are supported.
        } else {
            alert('The File APIs are not fully supported in this browser.');
        }

		// ------------------------------------------------------------
		// フォーム要素を取得する
		// ------------------------------------------------------------
		// "my_form" という ID 属性のエレメントを取得する
        var form = document.getElementById("my_form");
        
        //-------------------------------------------------------------
        //ローカルファイル用セットアップ
        //-------------------------------------------------------------
        // Setup the dnd listeners.
        var dropZone = document.getElementById('drop_zone');
        dropZone.addEventListener('dragover', handleDragOver, false);
        dropZone.addEventListener('drop', handleFileSelect, false);
        //document.getElementById('files').addEventListener('change', handleFileSelect, false);
        alert('OK');

		// ------------------------------------------------------------
		// サブミット直前に実行されるイベント
		// ------------------------------------------------------------
		form.addEventListener("submit" , function(e){

			// ------------------------------------------------------------
			// デフォルトの動作をキャンセル（フォームの送信を中止）
			// ------------------------------------------------------------
			e.preventDefault();

			// ------------------------------------------------------------
			// FormData オブジェクトを作成する
			// ------------------------------------------------------------
			var form_data = new FormData(form);

			// ------------------------------------------------------------
			// XMLHttpRequest オブジェクトを作成
			// ------------------------------------------------------------
			var xhr = new XMLHttpRequest();

			// ------------------------------------------------------------
			// XHR 通信に成功すると実行されるイベント
			// ------------------------------------------------------------
			xhr.onload = function (e){

				// レスポンスボディを取得する
				console.log(xhr.responseText );

			};

			// ------------------------------------------------------------
			// 「POST メソッド」「接続先 URL」を指定
			// ------------------------------------------------------------
			xhr.open("POST" , "http://example.com/cgi-bin/upload.cgi?type=json");

			// ------------------------------------------------------------
			// 「送信データに FormData を指定」「XHR 通信を開始する」
			// ------------------------------------------------------------
			xhr.send(form_data);
            alert('OK');
		});
    });
});




//-----------------------------ここより、ローカルファイル用---------------------------------------------------------
function handleFileSelect(evt) {
    
    

    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {
        alert('Looping: ' + i);
      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile, Int) {
        return function(e) {
          // Render thumbnail.
            var span = document.createElement('span');
            
            //'Figure'+ escape(String(Int+1)) + 
            span.innerHTML = ['<img class="thumb" align = "left" src="', e.target.result,
                            '" title="', escape(theFile.name), '", id="LocalFig',Int+1,'"/>',
                            //表示位置用コンボボックス
                            '表示位置/Float: <select name="Float_LocalFig' + escape(String(Int+1)) + '" size = "1" ',
                            'id = "Float_LocalFig"' + escape(String(Int+1)) + '">',
                            '<option>左/Left</option>',
                            '<option>右/Right</option>',
                            '<option>行内/In line</option>',
                            '</select>',
                            //最後に改行
                            '<br>'
                            ].join('');
            document.getElementById('ThumbList').insertBefore(span, null);
        };
        
      })(f, i);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
      
    }
    
  }

function handleDragOver(evt) {
    //alert('Step in HandleDragOver()');
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

function FindNextNum(){
    SetNextNum();
    //サムネイルリスト部分のHTMLの生のコード取得
    var S_LowHTML = document.getElementById('ThumbList');
    //var S_FullComment_Next = String(S_LowHTML).match(/<!--Next:\d{1,}-->/);
    var S_FullComment_Next = String(S_LowHTML.outerHTML).match(/<!--Next:\d{1,}-->/);
    //alert(S_FullComment_Next);
    var S_Next = String(S_FullComment_Next).slice(9,-3);
    return parseInt(S_Next,10);
}

function SetNextNum(){

    var S_LowHTML = document.getElementById('ThumbList').outerHTML;

    //一番最初のLocalFigureを検索
    var S_LocalFigs = S_LowHTML.match(/id="LocalFig\d{1,}"/g);
    
    var I_NextNum = 0;

    if(S_LocalFigs==null){
        I_NextNum = 1;
    }else if(S_LocalFigs.length == 1){
        //Figure1か否かで切り替え
        if(S_LocalFigs[0]=='id="LocalFig1"'){
            I_NextNum = 2;
        }else{
            I_NextNum = 1;
        }
    }else{
        //要素を二つずつ比較
        for(var i = 0; i+1 < S_LocalFigs.length; i++){
            //配列から数字だけ抽出。配列の若い番号に大きいFigure番号が格納されているので、後ろから順々に比較
            var S_PreviousNum = S_LocalFigs[S_LocalFigs.length-i-1].slice(12, -1);
            var S_LaterNum = S_LocalFigs[S_LocalFigs.length-i-2].slice(12, -1);

            //キャスト
            var I_PreviousNum = parseInt(S_PreviousNum, 10);
            var I_LaterNum = parseInt(S_LaterNum, 10);
            //alert('Pre: ' + I_PreviousNum + ', Later: ' + I_LaterNum);
            //数字の差が1より大きいとき、小さい方+1の数字をNextに設定
            if(I_LaterNum - I_PreviousNum > 1){
                I_NextNum = I_PreviousNum + 1;
            
            //最後までは走り切った場合、大きい方+1をNextに設定
            }else if(i+2 == S_LocalFigs.length){
                I_NextNum = I_LaterNum + 1;
            }
  
        }
        
    }

    //var S_LowHTML = $('#ThumList').val();

    var S_SetHTML = S_LowHTML.replace(/<!--Next:\d{1,}-->/, '<!--Next:'+I_NextNum+'-->');
    alert(S_SetHTML);
    
    document.getElementById('ThumbList').innerHTML = S_SetHTML;

    return;
   
}


//各関数動作確認用
function test(){
    alert(FindNextNum());
}