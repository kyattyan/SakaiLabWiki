//HTMLが読み込まれたときに実行……なのだが、このファイルに記述すべきではないかも。今後要注意。
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
        //dropZone.addEventListener('drop', UpdateLocalFigNum, false);
        //document.getElementById('files').addEventListener('change', handleFileSelect, false);
        //alert('OK');

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

//全置換用。なんで全部置換されないのか謎。
//逆にその理由が分かればこの関数は削除
function ReplaceAll(ReplacedStr, ReplacedFrom, ReplacedTo){
    while(ReplacedStr!=ReplacedStr.replace(ReplacedFrom, ReplacedTo)){
        ReplacedStr=ReplacedStr.replace(ReplacedFrom, ReplacedTo);
    }
    return ReplacedStr;
}


//-----------------------------ここより、ローカルファイル用---------------------------------------------------------
function handleFileSelect(evt) {
    
    

    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {
        //alert('Looping: ' + i);
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
            span.innerHTML = [
                            //<div>タグ追加
                            '<div class = "LocalFigure", id="LocalFigure0',escape(String(Int+1)),'">\n'+
                            'LocalFigure0'+ escape(String(Int+1)) + '    :',
                                //イメージ本体
                                '<img class="thumb" align = "left" src="', e.target.result,
                                '" title="', escape(theFile.name),
                                '" id="img_LocalFigure0'+escape(String(Int+1))+'">',
                                //表示位置用コンボボックス
                                '表示位置/Float: <select name="Float" size = "1" ',
                                'id = "Float_LocalFigure0' + escape(String(Int+1)) + '">',
                                '<option>左/Left</option>',
                                '<option>右/Right</option>',
                                '<option>行内/In line</option>',
                                '</select> ',
                                //大きさ変更
                                '幅/Width: <input type="number" id="Width_LocalFigure0' + escape(String(Int+1))
                                +'" min = "10" value = "100">'+'<br>',
                                //その他用のテキストボックス
                                'その他のオプション/Other options: <input type = "text" '+
                                'id="Other_LocalFigure0'+escape(String(Int+1))+ '"> <br>',
                                //画像追加用ボタン
                                '<button onclick="AddText(\'<LocalFigure0'+ escape(String(Int+1))+
                                '>\')"> Add this figure</button>',
                                
                            //最後にdiv閉じタグと改行
                            '</div><br><br><br>'
                            ].join('');
            document.getElementById('ThumbList').insertBefore(span, null);
            UpdateLocalFigNum();
        };
        
      })(f, i);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
      
    }
    
}

//ドラッグされたときに呼ばれる。ドラッグ中ずっと呼ばれ続けるので、Alertとかを呼んではいけない。
function handleDragOver(evt) {
    //alert('Step in HandleDragOver()');
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

//墓場。時が来たら削除
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

//跡地。時が来たら削除
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

//LocalFiguresの番号再設定
function UpdateLocalFigNum(){
    var S_HTMLSource = document.getElementById('ThumbList').outerHTML;
    
    var S_FigID;
    var i = 1;
    //疑似do-while。比較ではなく代入演算子
    while(S_FigID=S_HTMLSource.match(/id="LocalFigure\d{1,}"/)){
        var S_FigNum = String(S_FigID).slice(4,-1);
        
        /*while (S_HTMLSource != S_HTMLSource.replace(S_FigNum, 'Local_Figure'+String(i))){
            S_HTMLSource = S_HTMLSource.replace(S_FigNum, 'Local_Figure'+String(i))
        };*/
        S_HTMLSource = ReplaceAll(S_HTMLSource,S_FigNum,'Local_Figure'+String(i));
        //alert(S_FigNum + '--Local_Figure'+String(i));
        i++;
    }
    
    //S_HTMLSource = S_HTMLSource.replace('Local_Figure', 'LocalFigure');
    S_HTMLSource = ReplaceAll(S_HTMLSource,'Local_Figure', 'LocalFigure')
    document.getElementById('ThumbList').outerHTML = S_HTMLSource;
    //alert(S_HTMLSource);
    return;
}