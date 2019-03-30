/*-----------------------概要-------------------------
すべてのHTMLに対応する、汎用部分の記述を担う。具体的には
・左に表示するメニューバー（ファイルリスト、新規作成ボタン、ファイルアップロードボタン、削除ボタン）
・右上に表示する編集ボタン
また、それらに使う
・ファイル削除関数
・PHPへのデータのHTTP送信

現在のところ、Commonbody_Bottom()に大した役割はない。
----------------------------------------------------*/
const RootDir = 'http://www.scc.kyushu-u.ac.jp/Sakutai/TestForYatsuduka/';
function CommonBody_Top(){
    //Menuバー
    
    //FileList出力
    document.write('<!--test: top-->\n <div class="ContentWrapper"><div class="MenuBar"><span id="PHP">');
    var FileList: string = GetFileList();

    (<HTMLInputElement>document.getElementById( "PHP" )).innerHTML = FileList;
    document.write('</span>\n');

    //新規作成ボタン
    document.write("<a id = 'NewFile' href = '"+RootDir+"CreateNewFile.html'>");
    document.write("<img src='"+RootDir+"NewFile.png'><br>新規ページ作成/Make a new file");
    document.write("</a>");
    
    document.write("<br>");
    document.write("<br>");
    document.write("<br>");

    //PDFアップロード用ボタン
    document.write("<a id = 'GeneralFileUploader' href = '"+RootDir+"GeneralUploader_Remover.html'>");
    document.write("<img width = '32' src='"+RootDir+"PDF.png'><br>PDFをアップロードする・消す/Upload or delete a pdf file");
    document.write("</a>");
    document.write("<br>");


    


    document.write("</div>");

    document.write('<div class="Main">');

    var AbsolutePath :string = location.href;

    var SplittedPath :string[] = AbsolutePath.split('/');

    //編集ボタン
    //File以降のディレクトリ取得
    var RelativePath :string ="";

    for(var i:number =6;i<SplittedPath.length;i++){
        RelativePath += SplittedPath[i];
        if(i+1==SplittedPath.length){
            break;
        }
        RelativePath += "/";
    }

    //編集ボタン本体
    document.write('<span class="EditButton">'+
        '<a href="'+RootDir+'CreateNewFile.html?'+RelativePath+'">'+
        '<img src="'+RootDir+'Edit.png">\n'+'編集/Edit</a></span>');

    //削除ボタン
    document.write("<span class='DeleteButton'><a href = JavaScript:DeletePage(\'"+RelativePath+"\')>");
    document.write("<img src='"+RootDir+"Delete.jpg'>削除/Delete");
    document.write("</a></span>");
}

function CommonBody_Bottom(){
    document.write("<!--test: bottom-->\n </div></div></div>");
}

function createXmlHttpRequest()
{
    var xmlhttp=null;
    if((<any>window).ActiveXObject)
    {
        try
        {
            xmlhttp=new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch(e)
        {
            try
            {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e2)
            {
            }
        }
    }
    else if((<any>window).XMLHttpRequest)
    {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

//FileListを取得し、その内容を文字列として返す
function GetFileList()
{
    var xmlhttp=createXmlHttpRequest();
    if(xmlhttp!=null)
    {
        xmlhttp.open("POST", ""+RootDir+"FileList.php", false);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.send("RequestType=FileList");
        var res=xmlhttp.responseText;
        console.log(res);
        //document.write(res);
        return res;
        
    }
}

//ファイルパスをPOST送信して、送信先PHPに該当ファイルを__BackUpフォルダにファイル名を変えて移動させる
function DeleteRequest(RelativePath: string){
    var xmlhttp=createXmlHttpRequest();
    if(xmlhttp!=null)
    {
        xmlhttp.open("POST", RootDir+"Files/MoveToBackUp.php", false);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.send("Path="+RelativePath);
        var res=xmlhttp.responseText;
        console.log(res);
        //document.write(res);
        return res;
        
    }

}

function DeletePage(RelativePath: string){
    var Confirm1 = window.confirm("このWebページを削除しますか？\nDo you want to delete this page?");
    if(!Confirm1){
        return;
    }

    var Confirm2 = window.confirm("後悔しませんね?\nYou will never regret, right?");
    if(!Confirm2){
        return;
    }

    var Responce:string = DeleteRequest(RelativePath);

    if(Responce.search("Success")!=-1){
        //alert("削除しました\nThis file has been deleted.");
        var Confirm3 = window.confirm("削除しました。Homeに戻りますか？\nThis file has been deleted. Do you return to home?");
        if(Confirm3){
            location.href = 
            RootDir+'Files/0%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB%20Read%20us/Home.html';
        }
    }else{
        alert("削除失敗しました。");
    }

    
}