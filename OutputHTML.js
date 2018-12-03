function OutputHTML(){
    //メモ
    //ActiveXObject: IEでのみ使用可能。産廃。
    //WSH: コマンドプロンプト上のみ？Win環境前提
    //require("fs"): 同じくWeb上では使えない？
        //詳細->https://nodejs.org/api/fs.html#fs_file_system
    //要するに、クライアントサイドでテキストファイルを作ってアップロードするしかない？
    
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
    a.href='Uploader.php?html='+html+'&Filname='+title;
    a.target = '_blank';
    //a.download = title + '.html';
    a.click();


}