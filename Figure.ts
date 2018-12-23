//クラス試作・Typescript練習

const FLOAT_LEFT: string ="左/Left";
const FLOAT_RIGHT: string ="右/Right";
const FLOAT_IN_LINE: string ="行内/In line";


enum fig_float_E{
    Left,
    Right,
    InLine
}

class fig_float{
    private Float: fig_float_E;
    
    public SetFloatByStr(Str: string): fig_float_E{
        switch(Str){
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
    }

    public Str(): string{
        switch(this.Float){
            case fig_float_E.Left:
                return FLOAT_LEFT;

            case fig_float_E.Right:
                return FLOAT_RIGHT;

            case fig_float_E.InLine:
                return FLOAT_IN_LINE;
        }
    }    
}

class figure{
    //private Src: string;

    constructor(public Number_S: string, public Width: number, public Float: fig_float, public Others){
    }
    public SetFloatByString(Str: string){

    }
}

function UpdateLocalFigNum_Rev(){
    var HTMLSource: string;
    HTMLSource = document.getElementById('ThumList').outerHTML;
    var Figures: figure[];


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