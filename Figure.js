﻿//クラス試作・Typescript練習
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
    while (HTMLSource.match(/id="Figure\d{1,}"/)) {
        S_FigureID = HTMLSource.match(/id="Figure\d{1,}"/)[0];
        //console.log(S_FigureID);
        S_FigureID = S_FigureID.slice(4, -1); //(Figure00)
        var S_FigNum;
        var FigWidth;
        var FigFloat;
        var FigOthers;
        S_FigNum = S_FigureID.slice('Figure'.length, -1); //(00)
        console.log(S_FigureID);
        FigWidth = document.getElementById("Width_" + S_FigureID).value;
        //FigFloat = (<HTMLInputElement>document.getElementById("Float_"+S_FigureID)).value
        FigOthers = document.getElementById("Others_" + S_FigureID).value;
        Figures[i - 1] = (new figure(S_FigNum, FigWidth, FigFloat, FigOthers));
        //ここで直後一文字も含めて指定しないと、FIgure1の置換でFigure10も置換される
        HTMLSource = ReplaceAll(HTMLSource, S_FigureID + "\"", "Figure_tmp" + String(i) + "\""); //大体置換
        HTMLSource = ReplaceAll(HTMLSource, S_FigureID + "<br>", "Figure_tmp" + String(i) + "<br>"); //表示部分
        HTMLSource = ReplaceAll(HTMLSource, S_FigureID + ">", "Figure_tmp" + String(i) + ">"); //Add this figure
        HTMLSource = ReplaceAll(HTMLSource, S_FigureID + "\'", "Figure_tmp" + String(i) + "\'"); //delete this figure
        i++;
    }
    HTMLSource = ReplaceAll(HTMLSource, "Figure_tmp", "Figure");
    document.getElementById('ThumbList').outerHTML = HTMLSource;
    var j;
    for (j = 1; j <= Figures.length; j++) {
        document.getElementById("Width_Figure" + j).value = Figures[j - 1].Width;
        //(<HTMLInputElement>document.getElementById("Float_Figure"+j)).value=Figures[j-1].Float;
        document.getElementById("Others_Figure" + j).value = Figures[j - 1].Others;
    }
    return;
}
function DeleteFigure(FigID) {
    //var ThumbList :Element = document.getElementById('ThumbList');
    //番号だけ抜き出し
    var FigNum = parseInt(FigID.slice('Figure'.length));
    if (FigNum == NaN) {
        alert('NaN has been detected.');
        return;
    }
    //ThumbListから削除
    var RemovedThumb = document.getElementById(FigID);
    RemovedThumb.parentNode.removeChild(RemovedThumb);
    UpdateLocalFigNum();
    //TextAreaから削除
    var LiveEditor = document.getElementById('liveeditor');
    var ProcessedLiveEditorText = LiveEditor.value;
    ProcessedLiveEditorText = ReplaceAll(ProcessedLiveEditorText, '<' + FigID + '>', '');
    //消す対象より大きい図番号のタグを1減らす
    var FigureTags = ProcessedLiveEditorText.match(/<Figure\d{1,}>/g);
    if (FigureTags) {
        for (var i = 0; i < FigureTags.length; i++) {
            var NumberOfFigTag = Number(FigureTags[i].slice('<Figure'.length, -1 * '>'.length));
            console.log(NumberOfFigTag);
            if (NumberOfFigTag > FigNum) {
                ProcessedLiveEditorText
                    = ReplaceAll(ProcessedLiveEditorText, '<Figure' + NumberOfFigTag + '>', '<Figure_' + (NumberOfFigTag - 1) + '>');
            }
        }
    }
    ProcessedLiveEditorText = ProcessedLiveEditorText.replace(/<Figure_/g, '<Figure');
    //最終的なテキストをliveeditorに戻す
    LiveEditor.value = ProcessedLiveEditorText;
    return;
}
