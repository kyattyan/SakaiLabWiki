//クラス試作・Typescript練習
var FLOAT_LEFT = "左/Left";
var FLOAT_RIGHT = "右/Right";
var FLOAT_IN_LINE = "行内/In line";
var fig_float_type;
(function (fig_float_type) {
    fig_float_type[fig_float_type["Left"] = 0] = "Left";
    fig_float_type[fig_float_type["Right"] = 1] = "Right";
    fig_float_type[fig_float_type["InLine"] = 2] = "InLine";
})(fig_float_type || (fig_float_type = {}));
var fig_float = /** @class */ (function () {
    function fig_float() {
    }
    fig_float.prototype.SetFloatByStr = function (Str) {
        switch (Str) {
            case FLOAT_LEFT:
                this.Float = fig_float_type.Left;
                break;
            case FLOAT_RIGHT:
                this.Float = fig_float_type.Right;
                break;
            case FLOAT_IN_LINE:
                this.Float = fig_float_type.InLine;
                break;
        }
        return this.Float;
    };
    fig_float.prototype.Str = function () {
        switch (this.Float) {
            case fig_float_type.Left:
                return FLOAT_LEFT;
            case fig_float_type.Right:
                return FLOAT_RIGHT;
            case fig_float_type.InLine:
                return FLOAT_IN_LINE;
        }
    };
    return fig_float;
}());
var figure = /** @class */ (function () {
    //private Src: string;
    function figure(Number_S, Width, Float, Others) {
        this.Number_S = Number_S;
        this.Width = Width;
        this.Float = Float;
        this.Others = Others;
    }
    figure.prototype.SetFloatByString = function (Str) {
    };
    return figure;
}());
function ReplaceAll(ReplacedStr, ReplacedFrom, ReplacedTo) {
    while (ReplacedStr != ReplacedStr.replace(ReplacedFrom, ReplacedTo)) {
        ReplacedStr = ReplacedStr.replace(ReplacedFrom, ReplacedTo);
    }
    return ReplacedStr;
}
function UpdateLocalFigNum() {
    var HTMLSource;
    HTMLSource = document.getElementById('ThumbList').outerHTML;
    //console.log(HTMLSource);
    var Figures = new Array();
    var S_FigureID;
    var i = 1;
    while (HTMLSource.match(/id="LocalFigure\d{1,}"/)) {
        S_FigureID = HTMLSource.match(/id="LocalFigure\d{1,}"/)[0];
        console.log(S_FigureID);
        S_FigureID = S_FigureID.slice(4, -1); //(LocalFigure00)
        var S_FigNum;
        var FigWidth;
        var FigFloat;
        var FigOthers;
        S_FigNum = S_FigureID.slice(15, -1); //(00)
        console.log(S_FigureID);
        FigWidth = document.getElementById("Width_" + S_FigureID).value;
        FigFloat = document.getElementById("Float_" + S_FigureID).value;
        FigOthers = document.getElementById("Others_" + S_FigureID).value;
        Figures[i - 1] = (new figure(S_FigNum, FigWidth, FigFloat, FigOthers));
        HTMLSource = ReplaceAll(HTMLSource, S_FigureID, "Local_Figure" + String(i));
        i++;
    }
    HTMLSource = ReplaceAll(HTMLSource, "Local_Figure", "LocalFigure");
    document.getElementById('ThumbList').outerHTML = HTMLSource;
    var j;
    for (j = 1; j <= Figures.length; j++) {
        document.getElementById("Width_LocalFigure" + j).value = Figures[j - 1].Width;
        document.getElementById("Float_LocalFigure" + j).value = Figures[j - 1].Float;
        document.getElementById("Others_LocalFigure" + j).value = Figures[j - 1].Others;
    }
    return;
}
/*
function UpdateLocalFigNum(){
    var S_HTMLSource = document.getElementById('ThumbList').outerHTML;
    
    var S_FigID;
    var i = 1; //while出てからも使用

    //input系の値一時避難場所
    var S_Width=[];
    
    //疑似do-while。比較ではなく代入演算子
    while(S_FigID=S_HTMLSource.match(/id="LocalFigure\d{1,}"/)){
        var S_FigNum = String(S_FigID).slice(4,-1);
        alert(S_FigNum);
        S_Width.push(document.getElementById("Width_"+S_FigNum).value);
        
        
        /*while (S_HTMLSource != S_HTMLSource.replace(S_FigNum, 'Local_Figure'+String(i))){
            S_HTMLSource = S_HTMLSource.replace(S_FigNum, 'Local_Figure'+String(i))
        };*
        S_HTMLSource = ReplaceAll(S_HTMLSource,S_FigNum,'Local_Figure'+String(i));
        //alert(S_FigNum + '--Local_Figure'+String(i));
        i++;
    }
    
    //S_HTMLSource = S_HTMLSource.replace('Local_Figure', 'LocalFigure');
    S_HTMLSource = ReplaceAll(S_HTMLSource,'Local_Figure', 'LocalFigure');
    document.getElementById('ThumbList').outerHTML = S_HTMLSource;

    //避難した値を戻す
    var j;
    for(j=1;j<i;j++){
        alert(j);
        document.getElementById("Width_LocalFigure"+j).value=S_Width[j-1];
        alert(S_Width[j-1]);
    }

    //alert(S_HTMLSource);
    return;
}
*/ 
