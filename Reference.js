function AddReferenceToText(I_RefNumber){

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
                'Authors: <input type="text" Name="Authors" style="width: 60%;"><br>'+
                'Journal: <input type="text" Name="J_Name" > '+
                'Vol: <input type="number" Name="J_Vol" value="1" width = "80" min = "1" max = "200"> '+
                'Published year: <input type="number" Name="J_Year" value="2000" min="1800" max="2100"> '+
                'page: <input type="number" Name="J_PageBegin" value="1" min="1" max="99999">'+
                '-<input type="number" Name="J_PageEnd" value="1" min="1" max="99999">.'+
                '</span><br>';
            break;
        case  '本/Book':
            
            break;
        case 'URL':
            
            break;
        case 'その他/The other':
            
            break;
        default:
            alert('Error: ileagal reference type.\n Input type is '+ S_ReferenceType);
            break;
    
    }
    S_AddedHTML+='<button onclick="AddText(\'<sup>R_0</sup>\')">Add this reference</button><br><br>';
    AddInnerHTML(S_AddedHTML,'RefList');
}