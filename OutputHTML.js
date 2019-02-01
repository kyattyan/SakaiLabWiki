function OutputHTML(){
    //メモ
    //ActiveXObject: IEでのみ使用可能。産廃。
    //WSH: コマンドプロンプト上のみ？Win環境前提
    //require("fs"): 同じくWeb上では使えない？
        //詳細->https://nodejs.org/api/fs.html#fs_file_system
    //要するに、クライアントサイドでテキストファイルを作ってアップロードするしかない？
    //URLに引数指定してPHP: URLが長い、と言われてはじかれる
    
    /*var S_FileName = $("FileName").value;
    var S_FileContent = $("livepreview").value;
    //謎
    var Fi_OutputFile = new ApplicationCache(Scripting.FileSystemObject, );
    //var Fi_OutputFile = O_FS.OpenTextFile(S_FileName);

    /*var Fc_ErrorHandle = function(err){
        if (err) {
            alert('保存できませんでした');
        } else {
            alert('保存できました');
        }
    }
    if(Fi_OutputFile.open()){

    }else{

    }
    //fs.writeFile(S_FileName, S_FileContent, 'UTF-8', Fc_ErrorHandle);

    //var Fi_OutputFile = O_FS.CreateTextFile('HTMLFiles\\' + S_FileName);

    Fi_OutputFile.Write(S_FileContent);

    FS_OutputFile.close();*/

    /*
    //BOM(文字コード指定みたいな感じ)
    var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);

    //各フォームの値を取得
    var title = document.js.title.value;
    //var htmlbody = document.js.htmlbody.value;

    //プレビュー画面のソースを取得
    var htmlbody = document.getElementById("livepreview").innerHTML;

    //htmlの内容を変数に格納
    var html ="<html><head><title>" + title + "</title></head><body>" + htmlbody + "</body></html>"

    //blobとしてhtmlファイルを生成
    var blob = new Blob([bom, html],{type: "text/html;"})

    //a要素を作成してクリックイベント実行
    var a = document.createElement("a");
    //a.href = URL.createObjectURL(blob);
    a.href='Uploader.php?html='+html+'&title='+title+".html";
    a.target = '_blank';
    //a.download = title + '.html';
    a.click();
    */

    //空フォーム作成→データ追加

    var form_data = new FormData();
    var Directory ="";
    var ProcessedContent = "";

    if(document.getElementById("Category1").value!=" なし none"){
        Directory+=document.getElementById("Category1").value+"/";
    }
    if(document.getElementById("Category2").value!=" なし none"){
        Directory+=document.getElementById("Category2").value+"/";
    }

    
    form_data.append("FileName", document.getElementById('FileName').value+".html");
    form_data.append("Directory", Directory);
    console.log("Target directory is "+ Directory);

    //alert(document.getElementById('livepreview').innerHTML);

    // ------------------------------------------------------------
    // ファイルがあるかサーバーに確認、あるなら上書きするかユーザーに確認
    // ------------------------------------------------------------

    var FileExistCheck = new XMLHttpRequest();

    FileExistCheck.open("POST" , "http://www.scc.kyushu-u.ac.jp/Sakutai/TestForYatsuduka/Files/FileExistChecker.php");

    // ------------------------------------------------------------
    // XMLHttpRequest オブジェクトを作成
    // ------------------------------------------------------------
    var xhr = new XMLHttpRequest();

    // ------------------------------------------------------------
    // XHR 通信に成功すると実行されるイベント
    // ------------------------------------------------------------
    xhr.onload = function (e){

        // レスポンスボディを取得する
        var Res =xhr.responseText; 

        console.log(Res);
        alert(Res);

    };

    // ------------------------------------------------------------
    // 「POST メソッド」「接続先 URL」を指定
    // ------------------------------------------------------------
    xhr.open("POST" , "http://www.scc.kyushu-u.ac.jp/Sakutai/TestForYatsuduka/Files/Uploader.php");



    // ------------------------------------------------------------
    // ファイルチェック開始、FormDataを送信
    // ------------------------------------------------------------

    FileExistCheck.send(form_data);


    // ------------------------------------------------------------
    // 「送信データに FormData を指定」「XHR 通信を開始する」
    // ------------------------------------------------------------
    
    // ------------------------------------------------------------
    // ファイル名チェックの結果が返ってきたら実行
    // ------------------------------------------------------------
    FileExistCheck.onload = function (){
        var Res_Check = FileExistCheck.responseText;

        console.log(Res_Check);
        if(Res_Check=="Exist"){
            var Confirm=window.confirm("指定したファイルは既に存在します。上書きしますか？\nThe file you named already exists. Do you overwrite it?");
            
            //ファイルが既に存在し、なおかつキャンセルされたら何もせず返す
            if(!Confirm){
                return;
            }
        }
        //それ以外(新規ファイル名、OKが押された場合)の時、送信開始
        ProcessedContent = document.getElementById('livepreview').innerHTML;
        ProcessedContent = ReplaceSymbolsAndSpace(ProcessedContent);
        form_data.append("HTML_Source", document.getElementById('livepreview').innerHTML);
        xhr.send(form_data);
    }


    //alert('Res');
}

function ReplaceSymbolsAndSpace(Str){

    

    var SymbolList = {
        ' ':    '_Sp_',
        '/':    '_Sl_',
        '<':    '_LBr_',
        '>':    '_RBr_',
        '\"':   '_DQu',
        '=':    '_Eq_'
    }

    var Keys = Object.keys(SymbolList);

    for(var i=0;i<Keys.length;i++){
        var j =0;
        console.log(Keys[i]+'-'+SymbolList[Keys[i]]);
        while(Str.search(Keys[i])!=-1){
            Str = Str.replace(Keys[i], SymbolList[Keys[i]]);
            j++
            if(j>100){
                console.log('j>100');
                break;
            }
        }
    }

    console.log(Str);

    return Str;

}