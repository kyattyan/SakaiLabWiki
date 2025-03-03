﻿//HTMLが読み込まれたときに実行……なのだが、このファイルに記述すべきではないかも。今後要注意。
//早くも障害発生。このファイルが無駄にでかくなりつつある。要リファクタリング
$(function() {
    $('body').ready(function() {
        // ------------------------------------------------------------
		// サポートチェック
		// ------------------------------------------------------------
		if(!(window.addEventListener)) return;
        if(!(window.FormData)) return;

        if (window.File && window.FileReader && window.FileList && window.Blob) {
            //alert('Great success! All the File APIs are supported.');
        } else {
            alert('The File APIs are not fully supported in this browser.');
        }

        
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

        // chrome向け
        var element = document.getElementById("paste_zone");
        element.addEventListener("paste", function(e){
            // 画像以外がペーストされたときのために、元に戻しておく
            //document.getElementById("paste_zone").innerHTML ='ああ';


            e.stopPropagation();
            e.preventDefault();
            
            // 画像の場合
            // e.clipboardData.types.length == 0
            // かつ
            // e.clipboardData.types[0] == "Files"
            // となっているので、それ以外を弾く
            if (!e.clipboardData 
                    || !e.clipboardData.types
                    || (e.clipboardData.types.length != 1)
                    || (e.clipboardData.types[0] != "Files")) {
                    return true;
            }
  
            var reader = new FileReader();
            // ファイルとして得る
            // (なぜかgetAsStringでは上手くいかなかった)
            var imageFile = e.clipboardData.items[0].getAsFile();

            // Closure to capture the file information.
            reader.onload = ImagesMounter(imageFile, 1);
    
            // Read in the image file as a data URL.
            reader.readAsDataURL(imageFile);
              
     
            // FileReaderで読み込む
            //var fr = new FileReader();
            /*fr.onload = function(e) {
                // onload内ではe.target.resultにbase64が入っているのであとは煮るなり焼くなり
                var base64 = e.target.result;
                document.querySelector("#outputImage").src = base64;
                document.querySelector("#outputText").textContent = base64;
            };*/

            //fr.readAsDataURL(imageFile);
            
        });

        // Firefox,IE向け
        /*element.addEventListener("input", function(e){
            // 仮のエレメントを作り、張り付けた内容にimgタグがあるか探す
            var temp = document.createElement("div");
            temp.innerHTML = this.innerHTML;
            var pastedImage = temp.querySelector("img");
            
            // イメージタグがあればsrc属性からbase64が得られるので
            // あとは煮るなり焼くなり
            if (pastedImage) {
                var base64 = pastedImage.src;
                
                document.querySelector("#outputImage").src = base64;
                document.querySelector("#outputText").textContent = base64;
            }
            
            // contenteditableの内容は戻しておく
            this.innerHTML = "paste image here";
        })*/

        UpdatePreview();
    });
});

//全置換用。なんで全部置換されないのか謎。
//逆にその理由が分かればこの関数は削除
function ReplaceAll_(ReplacedStr, ReplacedFrom, ReplacedTo){
    while(ReplacedStr!=ReplacedStr.replace(ReplacedFrom, ReplacedTo)){
        ReplacedStr=ReplacedStr.replace(ReplacedFrom, ReplacedTo);
    }
    return ReplacedStr;
}


//-----------------------------ここより、ローカルファイル用---------------------------------------------------------
//Reedit.tsにも、前提・抽出元が異なるが動作は同じ関数あるので、そちらも参照すること。言語が同じだったらまとめてた……。
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
      reader.onload = ImagesMounter(f, i);

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

function ImagesMounter(theFile, Int){
    return function(e) {
        // Render thumbnail.
          var span = document.createElement('span');
          
          //'Figure'+ escape(String(Int+1)) + 
          span.innerHTML = [
                          //<div>タグ追加
                          '<div class = "Figure" id="Figure0',escape(String(Int+1)),'">\n'+
                          'Figure0'+ escape(String(Int+1)) + '<br>',
                              //イメージ本体
                              '<img class="thumb" align = "left" src="', e.target.result,
                              '" title="', escape(theFile.name),
                              '" id="img_Figure0'+escape(String(Int+1))+'">',
                              //表示位置用コンボボックス 使われないので削除
                              //'表示位置/Float: <select name="Float" size = "1" ',
                              //'id = "Float_Figure0' + escape(String(Int+1)) + '">',
                              //'<option>左/Left</option>',
                              //'<option>右/Right</option>',
                              //'<option>行内/In line</option>',
                              //'</select>',
                              //大きさ変更
                              '幅/Width: <input type="number" id="Width_Figure0' + escape(String(Int+1))
                              +'" min = "10" value = "100">',
                              //その他用のテキストボックス。隠れアイテムになっている
                              '<!--その他のオプション/Other options: --><input type = "text" class="HiddenItems"'+
                              'id="Others_Figure0'+escape(String(Int+1))+ '"><br>',
                              //画像追加用ボタン
                              '<button class="AddFigureButton" onclick="AddText(\'<Figure0'+ escape(String(Int+1))+
                              '>\')"> Add </button> ',
                              //画像削除用ボタン
                              '<button class="DeleteFigureButton" onclick="DeleteFigure(\'Figure0'+ escape(String(Int+1))+
                              '\')"> Delete </button><br>',

                          //最後にdiv閉じタグと改行
                          '<br><br></div>'
                          ].join('');
          document.getElementById('ThumbList').insertBefore(span, null);
          UpdateLocalFigNum();
      };
}

//墓場。時が来たら削除
/*
function FindNextNum(){
    SetNextNum();
    //サムネイルリスト部分のHTMLの生のコード取得
    var S_LowHTML = document.getElementById('ThumbList');
    //var S_FullComment_Next = String(S_LowHTML).match(/<!--Next:\d{1,}-->/);
    var S_FullComment_Next = String(S_LowHTML.outerHTML).match(/<!--Next:\d{1,}-->/);
    //alert(S_FullComment_Next);
    var S_Next = String(S_FullComment_Next).slice(9,-3);
    return parseInt(S_Next,10);
}*/

//跡地。時が来たら削除
/*
function SetNextNum(){

    var S_LowHTML = document.getElementById('ThumbList').outerHTML;

    //一番最初のFigureを検索
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
   
}*/


/*
//Figuresの番号再設定
function UpdateLocalFigNum(){
    var S_HTMLSource = document.getElementById('ThumbList').outerHTML;
    
    var S_FigID;
    var i = 1; //while出てからも使用

    //input系の値一時避難場所
    var S_Width=[];
    
    //疑似do-while。比較ではなく代入演算子
    while(S_FigID=S_HTMLSource.match(/id="Figure\d{1,}"/)){
        var S_FigNum = String(S_FigID).slice(4,-1);
        //alert(S_FigNum);
        S_Width.push(document.getElementById("Width_"+S_FigNum).value);
        
        
        /*while (S_HTMLSource != S_HTMLSource.replace(S_FigNum, 'tmp_Figure'+String(i))){
            S_HTMLSource = S_HTMLSource.replace(S_FigNum, 'tmp_Figure'+String(i))
        };* /
        S_HTMLSource = ReplaceAll_(S_HTMLSource,S_FigNum,'tmp_Figure'+String(i));
        //alert(S_FigNum + '--tmp_Figure'+String(i));
        i++;
    }
    
    //S_HTMLSource = S_HTMLSource.replace('tmp_Figure', 'Figure');
    S_HTMLSource = ReplaceAll_(S_HTMLSource,'tmp_Figure', 'Figure');
    document.getElementById('ThumbList').outerHTML = S_HTMLSource;

    //避難した値を戻す
    var j;
    for(j=1;j<i;j++){
        //alert(j);
        document.getElementById("Width_Figure"+j).value=S_Width[j-1];
        //alert(S_Width[j-1]);
    }

    //alert(S_HTMLSource);
    return;
}*/



