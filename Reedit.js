window.addEventListener('load', InputValuesForReedit);
function InputValuesForReedit() {
    var Query = location.search; //URLの?以降取得
    if (Query == "") {
        return;
    }
    var ExactPath;
    ExactPath = Query.substr(1);
    ExactPath = decodeURI(ExactPath);
    console.log(ExactPath);
    //console.log("Reedit");
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
function SetFileContents(FileContent) {
    var PageTitleTag = '<pagetitle>';
    var PageTitleTag_Close = '</pagetitle>';
    //livepreviewの内容が始まるのがここから。一番上のタイトル込み
    var Idx_ContentBegin = FileContent.search(PageTitleTag);
    //livepreviewの内容終わり
    var Idx_ContentEnd = FileContent.search('<script>CommonBody_Bottom()');
    console.log('Begin: ' + Idx_ContentBegin + '\nEnd: ' + Idx_ContentEnd);
    var MainContent = FileContent.slice(Idx_ContentBegin, Idx_ContentEnd);
    MainContent = MainContent.replace(/<br>/g, '\n');
    //タイトル抜き出し
    var PageTitle = MainContent.slice(PageTitleTag.length, MainContent.search(PageTitleTag_Close));
    //タイトル部分+改行一個除去
    MainContent = MainContent.slice(MainContent.search(PageTitleTag_Close) + PageTitleTag_Close.length + 2);
    document.getElementById("FileName").value = PageTitle;
    document.getElementById("liveeditor").innerHTML = MainContent;
    return;
}
