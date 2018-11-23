//このJSの肝の部分。Editer部分のテキストを読み込んで一部文字列を置換後、Preview部分にのHTMLソースとして加える
function UpdatePreview(){
    var EditerContent = $('#liveeditor').val();
        

    //----------------------直接HTML編集防止用----------------------------------------------------------------
  
    //<, >の置換
    //EditerContent= EditerContent.replace(/</g, '&lt;');
    //EditerContent= EditerContent.replace(/>/g, '&gt;');

    //----------------------<,>置換後にすべき置換--------------------------------------------
    
    //オリジナル制御文字の置換
    EditerContent= EditerContent.replace(/{_/g, '<');
    EditerContent= EditerContent.replace(/_}/g, '>');

    //改行文字を<br>に置換
    EditerContent= EditerContent.replace(/\n/g, '<br>');
    
    //ローカルの図の読み込み
    var S_LocalFig = EditerContent.match(/<LocalFig\d{1,}>/);
    var i = 0;
    while(S_LocalFig!==null){
        //alert(i);
        
        var S_LocalFigNumber = String(S_LocalFig).slice(9,-1);
        var I_LocalFigNumber = parseInt(S_LocalFigNumber, 10); 
        //alert(S_LocalFig);
        EditerContent = EditerContent.replace(S_LocalFig, GetLocalFig(I_LocalFigNumber));

        S_LocalFig = EditerContent.match(/<LocalFig\d{1,}>/);
        i++;
    }


    //------特定のタグをはじく。いかなる手段もはじくために、ブラケット置換後に行うこと--------

    //JavaScriptの禁止。
    EditerContent= EditerContent.replace(/script/g,
        '<br><b>Do not use JavaScript or PHP in this editer.</b><br>');

    //PHPの禁止
    EditerContent= EditerContent.replace(/(<\?|<\%|<\?php)/g,
        '<br><b>Do not use PHP in this editer.</b><br>');
    
    $('#livepreview').html(EditerContent);

}

$(function() {
    $('body').keyup(function() {
        UpdatePreview();
    });
});

function downloadfile(){
    //BOM(文字コード指定みたいな感じ)
    var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);

    //各フォームの値を取得
    var title = document.js.title.value;
    var htmlbody = document.js.htmlbody.value;

    //htmlの内容を変数に格納
    var html ="<html><head><title>" + title + "</title></head><body>" + htmlbody + "</body></html>"

    //blobとしてhtmlファイルを生成
    var blob = new Blob([bom, html],{type: "text/html;"})

    //a要素を作成してクリックイベント実行
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.target = '_blank';
    a.download = title + '.html';
    a.click();
}

function openmanual(){
    window.open('manual.html','_blank','top=50,left=50,width=500,height=500,scrollbars=1,location=0,menubar=0,toolbar=0,status=1,directories=0,resizable=1');
    return false;
}

function AddText(Text){
    var textarea = document.querySelector('textarea');

    var sentence = textarea.value;
    var len      = sentence.length;
    var pos      = textarea.selectionStart;

    var before   = sentence.substr(0, pos);
    var after    = sentence.substr(pos, len);

    sentence = before + Text + after;

    textarea.value = sentence;

    UpdatePreview();
}

function AddTag(AddedTag){
    //テキストの追加

    var O_textarea = document.querySelector('textarea');

    var S_sentence = O_textarea.value;
    var I_len      = S_sentence.length;
    var I_pos      = O_textarea.selectionStart;

    var S_before   = S_sentence.substr(0, I_pos);
    var S_Tag_Open = '<' + AddedTag + '>';
    var S_Tag_Close = '</' + AddedTag + '>';
    var S_after    = S_sentence.substr(I_pos, I_len);

    S_sentence = S_before + S_Tag_Open + S_Tag_Close + S_after;

    //テキスト更新
    O_textarea.value = S_sentence;

    //カーソル位置変更
    O_textarea.focus();

    O_textarea.setSelectionRange(I_pos + AddedTag.length+2, I_pos + AddedTag.length+2);

    //プレビュー反映
    UpdatePreview();
}

function GetLocalFig(LocalFigNum){
    //alert('LocalFileReader()');

    var S_AddedTag;
    var S_TargettedParentTag = 'img_LocalFigure'+LocalFigNum;
    var E_TargetedTag = document.getElementById(S_TargettedParentTag);
    var S_LocalFigSrc = E_TargetedTag.src;


    S_AddedTag = '<img width = "100" src = "' + S_LocalFigSrc + '">' ;
    //S_AddedTag = S_TargettedParentTag;

    return S_AddedTag;

}