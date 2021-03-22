//クラス試作・Typescript練習

const FLOAT_LEFT: string ="左/Left";
const FLOAT_RIGHT: string ="右/Right";
const FLOAT_IN_LINE: string ="行内/In line";


enum fig_float_type{
    Left,
    Right,
    InLine
}

class fig_float{
    private Float: fig_float_type;
    
    public SetFloatByStr(Str: string): fig_float_type{
        switch(Str){
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
    }

    public Str(): string{
        switch(this.Float){
            case fig_float_type.Left:
                return FLOAT_LEFT;

            case fig_float_type.Right:
                return FLOAT_RIGHT;

            case fig_float_type.InLine:
                return FLOAT_IN_LINE;
        }
    }    
}

class figure{
    //private Src: string;

    constructor(public Number_S: string, public Width: string, public Float: string, public Others: string){
    }
    public SetFloatByString(Str: string){

    }
}

function ReplaceAll(ReplacedStr, ReplacedFrom, ReplacedTo){
    while(ReplacedStr!=ReplacedStr.replace(ReplacedFrom, ReplacedTo)){
        ReplacedStr=ReplacedStr.replace(ReplacedFrom, ReplacedTo);
    }
    return ReplacedStr;
}


function UpdateLocalFigNum(){
    var HTMLSource: string;
    HTMLSource = document.getElementById('ThumbList').outerHTML;
    //console.log(HTMLSource);
    var Figures: figure[]=new Array();

    var S_FigureID: string;

    var i:number =1;
    
    while(HTMLSource.match(/id="LocalFigure\d{1,}"/)){
        
        S_FigureID=HTMLSource.match(/id="LocalFigure\d{1,}"/)[0]
        console.log(S_FigureID);
        
        S_FigureID = S_FigureID.slice(4,-1); //(LocalFigure00)

        var S_FigNum: string
        var FigWidth: string;
        var FigFloat: string;
        var FigOthers: string;

        S_FigNum = S_FigureID.slice(15,-1); //(00)
        console.log(S_FigureID);
        FigWidth = (<HTMLInputElement>document.getElementById("Width_"+S_FigureID)).value
        FigFloat = (<HTMLInputElement>document.getElementById("Float_"+S_FigureID)).value
        FigOthers = (<HTMLInputElement>document.getElementById("Others_"+S_FigureID)).value

        Figures[i-1]=(new figure(S_FigNum,FigWidth,FigFloat,FigOthers));

        HTMLSource=ReplaceAll(HTMLSource, S_FigureID, "Local_Figure"+String(i));
        
        i++;
    }

    HTMLSource=ReplaceAll(HTMLSource, "Local_Figure", "LocalFigure");
    
    document.getElementById('ThumbList').outerHTML = HTMLSource;

    var j:number;
    for(j=1;j<=Figures.length;j++){
        (<HTMLInputElement>document.getElementById("Width_LocalFigure"+j)).value=Figures[j-1].Width;
        (<HTMLInputElement>document.getElementById("Float_LocalFigure"+j)).value=Figures[j-1].Float;
        (<HTMLInputElement>document.getElementById("Others_LocalFigure"+j)).value=Figures[j-1].Others;
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
