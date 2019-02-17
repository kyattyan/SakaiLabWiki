window.addEventListener('load', InputValuesForReedit);
function InputValuesForReedit() {
    var Query = location.search; //URLの?以降取得
    if (Query == "") {
        return;
    }
    document.getElementById('liveeditor').innerHTML = "Now loading.......";
    var ExactPath;
    ExactPath = Query.substr(1);
    ExactPath = decodeURI(ExactPath);
    console.log(ExactPath);
    console.log("Reedit");
    var Directories = ExactPath.split('/');
    for (var i = 0; i < Directories.length - 1; i++) {
        document.getElementById('Category' + (i + 1)).value = Directories[i];
        //changeイベント発火させて子カテゴリ更新
        var Evt = document.createEvent("HTMLEvents");
        Evt.initEvent('change', true, true);
        document.getElementById('Category' + (i + 1)).dispatchEvent(Evt);
        console.log(Directories[i]);
    }
    var Path = new FormData();
    Path.append("Path", ExactPath);
    var Request = new XMLHttpRequest();
    Request.open("POST", "http://www.scc.kyushu-u.ac.jp/Sakutai/TestForYatsuduka/Files/GetFileContent.php");
    Request.send(Path);
    Request.onload = function () {
        SetFileContents(Request.responseText);
        //無理やりPreviewを発火させる
        var Evt = document.createEvent("HTMLEvents");
        Evt.initEvent('input', true, true);
        document.getElementById("liveeditor").dispatchEvent(Evt);
        console.log('Reset');
    };
}
//-----------------------------------------------------------------------------
//-----------------------------取り扱い要注意-----------------------------------
//-----------------------------------------------------------------------------
function SetFileContents(FileContent) {
    var PageTitleTag = '<pagetitle><span id="PageTitle">';
    var PageTitleTag_Close = '</span></pagetitle>';
    //livepreviewの内容が始まるのがここから。一番上のタイトル込み
    var Idx_ContentBegin = FileContent.search(PageTitleTag);
    //livepreviewの内容終わり
    var Idx_ContentEnd = FileContent.search('<script>CommonBody_Bottom()');
    console.log('Begin: ' + Idx_ContentBegin + '\nEnd: ' + Idx_ContentEnd);
    var MainContent = FileContent.slice(Idx_ContentBegin, Idx_ContentEnd);
    //改行タグ→改行文字
    MainContent = MainContent.replace(/<br>/g, '\n');
    MainContent = MainContent.replace(/<!--Esc-->/g, '<Esc>\n');
    //タイトル抜き出し
    var PageTitle = MainContent.slice(PageTitleTag.length, MainContent.search(PageTitleTag_Close));
    //タイトル部分+改行一個除去
    MainContent = MainContent.slice(MainContent.search(PageTitleTag_Close) + PageTitleTag_Close.length + 2);
    //spanタグ除去
    MainContent = MainContent.slice('<span id="MainContent">'.length, -1 * '</span>   </div>   '.length);
    //console.log("a\n");
    //図抜き出し
    for (var i = 1; MainContent.match(/<img src=".+".+>/) && i < 10; i++) {
        console.log(i + '\n');
        //console.log(MainContent.match(/<img src="/));
        var Figure = MainContent.match(/<img src=".+".+>/)[0];
        MainContent = MainContent.replace(Figure, '<Figure' + i + '>');
        //値を拾ったら消す。残りはOthersに入れる
        var Figure_src = Figure.match(/"[^"]+"/)[0].slice(1, -1);
        Figure = Figure.replace(Figure.match(/"[^"]+"/)[0], '');
        var Figure_width = Figure.match(/width="\d{1,}"/)[0].slice('width="'.length, -1);
        Figure = Figure.replace(Figure.match(/width="\d{1,}"/)[0], '');
        var Figure_Float = "";
        if (Figure.match(/align="[^"]+"/)) {
            Figure_Float = Figure.match(/align="[^"]+"/)[0].slice('align="'.length, -1);
            Figure = Figure.replace(Figure.match(/align="[^"]+"/)[0], '');
        }
        //残りかす消去
        Figure = Figure.replace('<img src=', '');
        Figure = Figure.replace('>', '');
        var Figure_Other = "";
        while (Figure[0] == " ") {
            Figure = Figure.replace(' ', '');
        }
        Figure_Other = Figure;
        ResetFigure(Figure_src, i, Figure_width, Figure_Float, Figure_Other);
    }
    document.getElementById("FileName").value = PageTitle;
    document.getElementById("liveeditor").textContent = MainContent;
    return;
}
//やるべきことはUploader.js内のhandleFileSelect()と同じなのだが、抽出元が違うため、異なる関数を用意
//非効率の極み
function ResetFigure(FigureDataURL, FigureNumber, Width, Float, Others) {
    //入力ウィジェット作成
    var span = document.createElement('span');
    span.innerHTML = [
        //<div>タグ追加
        '<div class = "Figure" id="Figure', FigureNumber, '">\n' +
            'Figure' + FigureNumber + '<br>',
        //イメージ本体
        '<img class="thumb" align = "left" src="', FigureDataURL,
        '" title="SucceededFigure',
        '" id="img_Figure' + FigureNumber + '">',
        //表示位置用コンボボックス
        '表示位置/Float: <select name="Float" size = "1" ',
        'id = "Float_Figure' + FigureNumber + '">',
        '<option>左/Left</option>',
        '<option>右/Right</option>',
        '<option>行内/In line</option>',
        '</select>',
        //大きさ変更
        '幅/Width: <input type="number" id="Width_Figure' + FigureNumber
            + '" min = "10" value = "100">' + '<br>',
        //その他用のテキストボックス
        'その他のオプション/Other options: <input type = "text" ' +
            'id="Others_Figure' + FigureNumber + '"> <br>',
        //画像追加用ボタン
        '<button onclick="AddText(\'<Figure' + FigureNumber +
            '>\')"> Add this figure</button> ',
        //画像削除用ボタン
        '<button onclick="DeleteFigure(\'Figure' + FigureNumber +
            '\')"> Delete this figure</button>',
        //最後にdiv閉じタグと改行
        '<br><br></div>'
    ].join('');
    document.getElementById('ThumbList').insertBefore(span, null);
    //ゴミゴミの実のゴミコード
    switch (Float) {
        case '':
            Float = '行内/In line';
            break;
        case 'left':
            Float = '左/Left';
            break;
        case 'right':
            Float = '右/Right';
            break;
    }
    //入力ウィジェットの値代入
    document.getElementById('Width_Figure' + FigureNumber).value = Width;
    document.getElementById('Float_Figure' + FigureNumber).value = Float;
    document.getElementById('Others_Figure' + FigureNumber).value = Others;
    //(<HTMLInputElement>document.getElementById('Width_Figure'+ FigureNumber)).value;
}
