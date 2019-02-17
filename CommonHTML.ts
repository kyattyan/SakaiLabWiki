function CommonBody_Top(){
    //Menuバー
    
    //FileList出力
    document.write('<!--test: top-->\n <div class="ContentWrapper"><div class="MenuBar"><span id="PHP">');
    sendRequest();
    document.write('</span>\n');

    //新規作成ボタン
    document.write("<a id = 'NewFile' href = 'http://www.scc.kyushu-u.ac.jp/Sakutai/TestForYatsuduka/Untitled-1.html'>");
    document.write("<img src='http://www.scc.kyushu-u.ac.jp/Sakutai/TestForYatsuduka/NewFile.png'><br>新規ページ作成/Make a new file");
    document.write("</a></div>");

    document.write('<div class="Main">');

    var AbsolutePath :string = location.href;

    var SplittedPath :string[] = AbsolutePath.split('/');

    //File以降
    var RelativePath :string ="";

    //console.log(SplittedPath);

    for(var i:number =6;i<SplittedPath.length;i++){
        RelativePath += SplittedPath[i];
        if(i+1==SplittedPath.length){
            break;
        }
        RelativePath += "/";
    }

    console.log(RelativePath);

    //編集ボタン
    document.write('<span class="EditButton">'+
        '<a href=http://www.scc.kyushu-u.ac.jp/Sakutai/TestForYatsuduka/Untitled-1.html?'+
        RelativePath+'>'+
        '<img src="http://www.scc.kyushu-u.ac.jp/Sakutai/TestForYatsuduka/Edit.png">\n'+
        '編集/Edit</a></span>');
    
    
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

function sendRequest()
{
    //var moji="あいうえお";
    var xmlhttp=createXmlHttpRequest();
    if(xmlhttp!=null)
    {
        xmlhttp.open("POST", "http://www.scc.kyushu-u.ac.jp/Sakutai/TestForYatsuduka/CommonPHP.php", false);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //var data="data="+moji;
        var RequestType :string = "RequestType=FileList";
        xmlhttp.send(RequestType);
        var res=xmlhttp.responseText;
        console.log(res);
        //document.write(res);
        (<HTMLInputElement>document.getElementById( "PHP" )).innerHTML = res;
    }
}

