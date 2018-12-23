//クラス試作・Typescript練習
var FLOAT_LEFT = "左/Left";
var FLOAT_RIGHT = "右/Right";
var FLOAT_IN_LINE = "行内/In line";
var fig_float_E;
(function (fig_float_E) {
    fig_float_E[fig_float_E["Left"] = 0] = "Left";
    fig_float_E[fig_float_E["Right"] = 1] = "Right";
    fig_float_E[fig_float_E["InLine"] = 2] = "InLine";
})(fig_float_E || (fig_float_E = {}));
var fig_float = /** @class */ (function () {
    function fig_float() {
    }
    fig_float.prototype.SetFloatByStr = function (Str) {
        switch (Str) {
            case FLOAT_LEFT:
                this.Float = fig_float_E.Left;
                break;
            case FLOAT_RIGHT:
                this.Float = fig_float_E.Right;
                break;
            case FLOAT_IN_LINE:
                this.Float = fig_float_E.InLine;
                break;
        }
        return this.Float;
    };
    fig_float.prototype.Str = function () {
        switch (this.Float) {
            case fig_float_E.Left:
                return FLOAT_LEFT;
            case fig_float_E.Right:
                return FLOAT_RIGHT;
            case fig_float_E.InLine:
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
function UpdateLocalFigNum_Rev() {
    var HTMLSource;
    HTMLSource = document.getElementById('ThumList').outerHTML;
    var Figures;
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
