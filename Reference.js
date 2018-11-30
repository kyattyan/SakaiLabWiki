function UpdateRefNumbers(){

}

function AddInnerHTML(S_AddedStr, S_AddedElementID){
    var E_Span = document.createElement('span');
    E_Span.innerHTML = S_AddedStr;
    //alert(S_AddedElementID);
    document.getElementById(S_AddedElementID).insertBefore(E_Span, null);   
    return;
}

function NewReference(){
    var S_ReferenceType = document.getElementById('AddedReferenceType').value;
    var S_AddedHTML='';
    switch(S_ReferenceType){
        case '論文/Journal':
            S_AddedHTML+='<span id="Refrence0">Refernce 0　　'+
                'Authors: <input type="text" Name="Authors" style="width: 50%;"> '+
                'doi: <input type="text" Name="doi" style="width: 25%;"><br>'+
                'Journal: <input type="text" Name="J_Name" > '+
                'Vol: <input type="number" Name="J_Vol" value="1" width = "80" min = "1" max = "200"> '+
                'Published year: <input type="number" Name="J_Year" value="2000" min="1800" max="2100"> '+
                'page: <input type="number" Name="J_PageBegin" value="1" min="1" max="99999">'+
                '-<input type="number" Name="J_PageEnd" value="1" min="1" max="99999">.'+
                '<br>';
            break;
        case  '本/Book':
            S_AddedHTML+='<span id="Refrence0">Refernce 0　　'+
                'Title: <input type="text" Name="B_Title"  style="width: 50%;"> '+
                'Author: <input type="text" Name="Authors"  style="width: 25%;"> '+
                'Publisher: <input type="text" Name="B_Publisher" > '+
                '<br>';
            break;
        case 'URL':
            S_AddedHTML+='<span id="Refrence0">Refernce 0　　'+
                'URL: <input type="text" Name="U_URL"  style="width: 70%;"><br>'+
                '閲覧日/Date you saw: Y<input type="number" Name="U_SeenDate_Y" value = "2018" min="2018" max="3000"> '+
                'M<input type="number" Name="U_SeenDate_M" value="1" min="1" max="12"> '+
                'D<input type="number" Name="U_SeenDate_D" value="1" min="1" max="31"> '+
                '<br>';
            break;
        case 'その他/The other':
            
            break;
        default:
            alert('Error: ileagal reference type.\n Input type is '+ S_ReferenceType);
            break;
    
    }
    S_AddedHTML+='<button onclick="AddText(\'[R0]\')">Add this reference</button> '+
        '<button onclick="RemoveRef(\'0\')">Remove this reference</button></span><br><br>';
    AddInnerHTML(S_AddedHTML,'RefList');
}

function RemoveRef(I_RefNumber){
    
}