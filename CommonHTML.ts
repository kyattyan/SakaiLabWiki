function CommonBody_Top(){
    //FileList出力
    document.write('<!--test: top-->\n <div class="ContentWrapper"><div class="MenuBar"><span id="PHP">');
    sendRequest();
    document.write('</span></div>\n');

    document.write('<div class="Main">')

    //編集ボタン
    document.write('<span class="EditButton" onclick="Reedit()">\n'+
        '<img src="http://www.scc.kyushu-u.ac.jp/Sakutai/TestForYatsuduka/Edit.png">\n'+
        '編集/Edit</span>');
    
    
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

function Reedit() :void{

    var Title :string = (<HTMLInputElement>document.getElementById( "PageTitle" )).innerHTML;

    var MainContent :string = (<HTMLInputElement>document.getElementById( "MainContent" )).innerHTML;

    var VirtualForm : HTMLFormElement = document.createElement("form");

    VirtualForm.method="POST";
    VirtualForm.action="http://www.scc.kyushu-u.ac.jp/Sakutai/TestForYatsuduka/Untitled-1.html";

    var VirtualInput_Title :HTMLInputElement = document.createElement("input");
    VirtualInput_Title.name="Title";
    VirtualInput_Title.value=Title;
    VirtualForm.appendChild(VirtualInput_Title);

    var VirtualInput_MainContent :HTMLInputElement = document.createElement("input");
    VirtualInput_MainContent.name="MainContent";
    VirtualInput_MainContent.value=MainContent;
    VirtualForm.appendChild(VirtualInput_MainContent);

    document.body.appendChild(VirtualForm);

    VirtualForm.submit();


}