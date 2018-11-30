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
    var S_LocalFig = EditerContent.match(/<LocalFigure\d{1,}>/);
    while(S_LocalFig!==null){
        
        var S_LocalFigNumber = String(S_LocalFig).slice(12,-1);
        var I_LocalFigNumber = parseInt(S_LocalFigNumber, 10); 
        //alert(S_LocalFig);
        EditerContent = EditerContent.replace(S_LocalFig, GetLocalFig(I_LocalFigNumber));

        S_LocalFig = EditerContent.match(/<LocalFigure\d{1,}>/);
    }

    //参考文献用制御文字変換
    var S_Reference = EditerContent.match(/\[R\d{1,}\]/);
    while(S_Reference!==null){
        
        var I_RefNumber = parseInt(String(S_Reference).slice(2,-1),10);
        //alert(S_LocalFig);
        EditerContent = EditerContent.replace(S_Reference,'<sup>['+I_RefNumber+']</sup>');

        S_Reference = EditerContent.match(/\[R\d{1,}\]/);
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

    //スクロール位置保存
    var O_OldScroll = $('#liveeditor').scrollTop();
    
    //このフォーカスでスクロールがテキストの一番最後までずれる
    O_textarea.focus();
    
    //カーソル移動、このとき火狐以外はスクロールがカーソルを追従しないため、スクロールが一番下のまま
    O_textarea.setSelectionRange(I_pos + AddedTag.length+2, I_pos + AddedTag.length+2);
    //$(textArea).trigger("blur").trigger("focus");

    //保存したスクロール位置まで移動して、スクロール位置を疑似的にキープする
    document.getElementById('liveeditor').scroll(0, O_OldScroll);
    
    //プレビュー反映
    UpdatePreview();
}

//WidgetNameはFloatやWidthなどの具体的役割のこと。ID名の一部と対応
function FindOutWidgetValue(I_LocalFigNum, S_WidgetName){
    var E_TargettedTag = document.getElementById(S_WidgetName + '_LocalFigure' + I_LocalFigNum);
    var S_TargettedTag = String(E_TargettedTag.value);
    return S_TargettedTag;
}

function Converter_Float(I_LocalFigNum){

    var S_FloatType = FindOutWidgetValue(I_LocalFigNum, 'Float');

    switch(S_FloatType){
        case '左/Left':
            return 'align = "left"';
        case '右/Right':
            return 'align = right';
        case '行内/In line':
            return '';
    }
}

function Converter_Width(I_LocalFigNum){
    var S_Width = FindOutWidgetValue(I_LocalFigNum, 'Width');
    return 'width = "' + S_Width + '"';
}

//返り値はimgタグ内部に追加するCSS、例えば「width = "100" align = "left"」など
function ConvertWidgetToStyle(I_LocalFigNum){
    var S_Style = '';

    S_Style += Converter_Float(I_LocalFigNum);

    S_Style += Converter_Width(I_LocalFigNum);

    S_Style += FindOutWidgetValue(I_LocalFigNum, "Other")

    return S_Style;
}

function GetLocalFig(LocalFigNum){
    //alert('LocalFileReader()');

    var S_AddedTag;
    var S_TargettedParentTag = 'img_LocalFigure'+LocalFigNum;
    var E_TargetedTag = document.getElementById(S_TargettedParentTag);
    var S_LocalFigSrc = E_TargetedTag.src;

    var E_TargettedFloat = document.getElementById('Float_LocalFigure'+LocalFigNum);
    var S_TargettedFloat = E_TargettedFloat.value;

    S_AddedTag = '<img src = "' + S_LocalFigSrc + '"'+ ConvertWidgetToStyle(LocalFigNum) +'>' ;
    //S_AddedTag = S_TargettedParentTag; width = "100" 

    return S_AddedTag;

}

