//細目編集はこちらから。完全手作業。受け取り側ＰＨＰ(Uploader.php)も要編集
function UpdatePullDownList() {
    var IndexOfCategory1 = document.getElementById("Category1").selectedIndex;
    var Category2 = document.getElementById("Category2");
    var ListOfDir_level2;
    console.log(IndexOfCategory1);
    while (Category2.hasChildNodes()) {
        Category2.removeChild(Category2.firstChild);
    }
    switch (IndexOfCategory1) {
        case 0: //はじめに
            ListOfDir_level2 = [" なし none"];
            break;
        case 1: //合成
            ListOfDir_level2 = [" なし none", "1テクニック Technic", "2精製 Purification", "3再結晶 Recrystalization"];
            break;
        case 2: //測定
            ListOfDir_level2 = [" なし none", "1分光 Spectroscopy", "2電気化学 EC", "3光反応 Photoreaction", "9その他 Others"];
            break;
        case 3: //DFT
            ListOfDir_level2 = [" なし none"];
            break;
        case 4: //デスクワーク
            ListOfDir_level2 = [" なし none", "1雑務全般 General", "2ソフトウェア Software"];
            break;
        case 5: //その他
            ListOfDir_level2 = [" なし none"];
            break;
        default:
            ListOfDir_level2 = ["_error"];
            break;
    }
    for (var i = 0; i < ListOfDir_level2.length; i++) {
        var ListOfCategory2 = document.createElement("option");
        ListOfCategory2.setAttribute("value", ListOfDir_level2[i]);
        ListOfCategory2.innerHTML = ListOfDir_level2[i].substr(1);
        //console.log(ListOfDirectories[i]);
        Category2.appendChild(ListOfCategory2);
    }
}
//(<HTMLInputElement> document.getElementById("Category2")).addEventListener('Change', UpdatePullDownList);
//(<HTMLInputElement> document.getElementById("Category3")).addEventListener('Change', UpdatePullDownList);
//Category1の内容編集箇所。読み込み時に動作
window.onload =
    function () {
        document.getElementById("Category1").addEventListener('change', UpdatePullDownList);
        var Category1 = document.getElementById("Category1");
        var ListOfDirectories = ["0はじめに Read us", "1合成 Synthesis", "2測定 Measurement", "3DFT", "4デスクワーク Desk work",
            "9その他 Others"];
        for (var i = 0; i < ListOfDirectories.length; i++) {
            var ListOfCategory1 = document.createElement("option");
            ListOfCategory1.setAttribute("value", ListOfDirectories[i]);
            ListOfCategory1.innerHTML = ListOfDirectories[i].substr(1);
            //console.log(ListOfDirectories[i]);
            Category1.appendChild(ListOfCategory1);
        }
        UpdatePullDownList();
    };
