
window.addEventListener('load', InputValuesForReedit);

function InputValuesForReedit() : void{
    var Query: string = location.search;//URLの?以降取得
    if(Query==""){
        return;
    }
    
    var ExactPath: string;
    ExactPath = Query.substr(1);
    ExactPath = decodeURI(ExactPath);

    console.log(ExactPath);
    //console.log("Reedit");

    var Path : FormData = new FormData();



    Path.append("Path", ExactPath);



    var Request :XMLHttpRequest =new XMLHttpRequest();

    Request.open("POST" , "http://www.scc.kyushu-u.ac.jp/Sakutai/TestForYatsuduka/Files/GetFileContent.php");
    
    Request.send(Path);
    
    Request.onload=function(){
        SetFileContents(Request.responseText);

        //無理やりPreviewを発火させる

        var Evt :Event =document.createEvent("HTMLEvents");
        Evt.initEvent('input', true, true);
        
        document.getElementById("liveeditor").dispatchEvent(Evt);
        console.log('Reset');
    };

}

function SetFileContents(FileContent: string) :void{

    const PageTitleTag :string = '<pagetitle>';
    const PageTitleTag_Close: string ='</pagetitle>'

    //livepreviewの内容が始まるのがここから。一番上のタイトル込み
    var Idx_ContentBegin: number = FileContent.search(PageTitleTag);

    //livepreviewの内容終わり
    var Idx_ContentEnd: number = FileContent.search('<script>CommonBody_Bottom()');

    console.log('Begin: '+Idx_ContentBegin+'\nEnd: '+Idx_ContentEnd);

    var MainContent :string = FileContent.slice(Idx_ContentBegin, Idx_ContentEnd);

    MainContent=MainContent.replace(/<br>/g, '\n');

    //タイトル抜き出し
    var PageTitle :string = MainContent.slice(PageTitleTag.length, MainContent.search(PageTitleTag_Close));

    //タイトル部分+改行一個除去
    MainContent = MainContent.slice(MainContent.search(PageTitleTag_Close)+PageTitleTag_Close.length+2);

    (<HTMLInputElement>document.getElementById("FileName")).value = PageTitle;
    document.getElementById("liveeditor").innerHTML=MainContent;

    

    return;
}