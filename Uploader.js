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
          
            span.innerHTML = ['Figure'+ escape(String(Int+1)) + ': <img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '", id="LocalFig',Int+1,'"/>',
                            //表示位置用コンボボックス
                            '表示位置/Float: <select name="Float_LocalFig' + escape(String(Int+1)) + '" size = "1" ',
                            'id = "Float_LocalFig"' + escape(String(Int+1)) + '">',
                            '<option>左/Left</option>',
                            '<option>右/Right</option>',
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

  
