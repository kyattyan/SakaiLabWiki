function CommonBody_Top(){
    document.write('<!--test: top-->\n <div class="ContentWrapper"><div class="MenuBar"><span id="PHP">');
    sendRequest();
    document.write('</span></div><div class="Main">');
}

function CommonBody_Bottom(){
    document.write("<!--test: bottom-->\n </div></div>");
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