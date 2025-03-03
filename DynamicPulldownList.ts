﻿//細目編集はこちらから。完全手作業。受け取り側ＰＨＰ(Uploader.php)も要編集


function UpdatePullDownList() :void{
    var IndexOfCategory1 :number = (<HTMLSelectElement> document.getElementById("Category1")).selectedIndex;
    var Category2: HTMLSelectElement =<HTMLSelectElement> document.getElementById("Category2");
    var ListOfDir_level2: string[];
    
    console.log(IndexOfCategory1);

    while(Category2.hasChildNodes()){

        Category2.removeChild(Category2.firstChild);
    }

    switch(IndexOfCategory1){
    case 0://はじめに
        ListOfDir_level2=[" なし none"];
        break;
    case 1://合成
        ListOfDir_level2=[" なし none", "1テクニック Technic", "2精製 Purification", "3再結晶 Recrystalization"];
        break;
    case 2://測定
        ListOfDir_level2=[" なし none", "1分光 Spectroscopy", "2電気化学 EC", "3NMR", "4光反応 Photoreaction", "5赤外吸収 IR", "9その他 Others"];
        break;
    case 3://DFT
        ListOfDir_level2=[" なし none"];
        break;
    case 4://デスクワーク
        ListOfDir_level2=[" なし none", "1雑務全般 General", "2ソフトウェア Software"];
        break;
    case 5://自主ゼミ
        ListOfDir_level2=["02018年", "12019年"];
        break;
    case 6://お勧め論文
        ListOfDir_level2=["1水素発生_H2 evolution", "2酸素発生_O2 evolution", "3二酸化炭素還元_CO2 reduction", "4増感剤_発光体 sensitizers emitters", "5その他触媒反応 Other catalysis", "6錯体化学 Coord. chem.", "9その他お役立ち論文 Others"];
        break;
    case 7://その他
        ListOfDir_level2=[" なし none"];
        break;
    default:
        ListOfDir_level2=["_error"];
        break;
    }

    for(var i :number =0;i<ListOfDir_level2.length;i++){
        var ListOfCategory2: Element =document.createElement("option");

        ListOfCategory2.setAttribute("value", ListOfDir_level2[i]);
        ListOfCategory2.innerHTML=ListOfDir_level2[i].substr(1);

        //console.log(ListOfDirectories[i]);
        
        Category2.appendChild(ListOfCategory2);
    }

}


//(<HTMLInputElement> document.getElementById("Category2")).addEventListener('Change', UpdatePullDownList);
//(<HTMLInputElement> document.getElementById("Category3")).addEventListener('Change', UpdatePullDownList);

//Category1の内容編集箇所。読み込み時に動作
window.onload=
function(){

    (<HTMLSelectElement> document.getElementById("Category1")).addEventListener('change', UpdatePullDownList);

    var Category1 :HTMLSelectElement =<HTMLSelectElement> document.getElementById("Category1");
    var ListOfDirectories: string[] =
    ["0はじめに Read us", "1合成 Synthesis", "2測定 Measurement", "3DFT", "4デスクワーク Desk work",
        "5自主ゼミ Self-seminor", "6お勧め論文 Recomended papers", "9その他 Others"];

    for(var i :number =0;i<ListOfDirectories.length;i++){
        var ListOfCategory1: Element =document.createElement("option");

        ListOfCategory1.setAttribute("value", ListOfDirectories[i]);
        ListOfCategory1.innerHTML=ListOfDirectories[i].substr(1);

        //console.log(ListOfDirectories[i]);

        Category1.appendChild(ListOfCategory1);
    }

    UpdatePullDownList();
};
