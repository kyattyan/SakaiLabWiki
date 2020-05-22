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
    
    while(HTMLSource.match(/id="Figure\d{1,}"/)){
        
        S_FigureID=HTMLSource.match(/id="Figure\d{1,}"/)[0];
        //console.log(S_FigureID);
        
        S_FigureID = S_FigureID.slice(4,-1); //(Figure00)

        var S_FigNum: string
        var FigWidth: string;
        var FigFloat: string;
        var FigOthers: string;

        S_FigNum = S_FigureID.slice('Figure'.length,-1); //(00)
        console.log(S_FigureID);
        FigWidth = (<HTMLInputElement>document.getElementById("Width_"+S_FigureID)).value
        //FigFloat = (<HTMLInputElement>document.getElementById("Float_"+S_FigureID)).value
        FigOthers = (<HTMLInputElement>document.getElementById("Others_"+S_FigureID)).value

        Figures[i-1]=(new figure(S_FigNum,FigWidth,FigFloat,FigOthers));

        //ここで直後一文字も含めて指定しないと、FIgure1の置換でFigure10も置換される
        HTMLSource=ReplaceAll(HTMLSource, S_FigureID+"\"", "Figure_tmp"+String(i)+"\""); //大体置換
        HTMLSource=ReplaceAll(HTMLSource, S_FigureID+"<br>", "Figure_tmp"+String(i)+"<br>"); //表示部分
        HTMLSource=ReplaceAll(HTMLSource, S_FigureID+">", "Figure_tmp"+String(i)+">"); //Add this figure
        HTMLSource=ReplaceAll(HTMLSource, S_FigureID+"\'", "Figure_tmp"+String(i)+"\'"); //delete this figure

        i++;
    }

    HTMLSource=ReplaceAll(HTMLSource, "Figure_tmp", "Figure");
    
    document.getElementById('ThumbList').outerHTML = HTMLSource;

    var j:number;
    for(j=1;j<=Figures.length;j++){
        (<HTMLInputElement>document.getElementById("Width_Figure"+j)).value=Figures[j-1].Width;
        //(<HTMLInputElement>document.getElementById("Float_Figure"+j)).value=Figures[j-1].Float;
        (<HTMLInputElement>document.getElementById("Others_Figure"+j)).value=Figures[j-1].Others;
    }

    return;
}

function DeleteFigure(FigID :string):void{
    //var ThumbList :Element = document.getElementById('ThumbList');
    
    //番号だけ抜き出し
    var FigNum :number = parseInt(FigID.slice('Figure'.length));

    if(FigNum==NaN){
        alert('NaN has been detected.');
        return;
    }

    //ThumbListから削除
    var RemovedThumb :Element = document.getElementById(FigID);
    RemovedThumb.parentNode.removeChild(RemovedThumb);

    UpdateLocalFigNum();

    //TextAreaから削除
    var LiveEditor :HTMLInputElement = <HTMLInputElement>document.getElementById('liveeditor');
    var ProcessedLiveEditorText :string = LiveEditor.value;
    ProcessedLiveEditorText = ReplaceAll(ProcessedLiveEditorText, '<'+FigID+'>', '');

    //消す対象より大きい図番号のタグを1減らす
    var FigureTags :RegExpMatchArray = ProcessedLiveEditorText.match(/<Figure\d{1,}>/g);

    if(FigureTags){
        for(var i:number =0;i<FigureTags.length;i++){
            var NumberOfFigTag :number = Number (FigureTags[i].slice('<Figure'.length, -1*'>'.length));
            console.log(NumberOfFigTag);

            if(NumberOfFigTag>FigNum){
                ProcessedLiveEditorText 
                    = ReplaceAll(ProcessedLiveEditorText,'<Figure'+NumberOfFigTag+'>', '<Figure_'+ (NumberOfFigTag-1) +'>');
            }
        }    
    }

    ProcessedLiveEditorText = ProcessedLiveEditorText.replace(/<Figure_/g, '<Figure');


    //最終的なテキストをliveeditorに戻す
    LiveEditor.value=ProcessedLiveEditorText;


    return;
}