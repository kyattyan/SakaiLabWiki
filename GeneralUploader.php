
<header>
    <title>General file uploader</title>
    <meta charset="utf-8">
</header>
<?php
    $tempfile = $_FILES['File']['tmp_name'];
    $FileName = $_FILES['File']['name'];
    $Category1 = $_POST['Category1'];
    $Category2 = $_POST['Category2'];
    $AllowedExtension = ['PDF', 'pdf', 'zip', 'ZIP', 'xlsx'];
    $AbsolutePathToSystem = "http://www.scc.kyushu-u.ac.jp/Sakutai/TestForYatsuduka/";

    if (is_uploaded_file($tempfile)) {
        $Extension = substr($FileName, strrpos($FileName, '.') +1);

        $ExtensionIsAllowed = false;
        for($i=0; $i<count($AllowedExtension);$i++){
            if($Extension===$AllowedExtension[$i]){
                $ExtensionIsAllowed = true;
            }
        }
        if(!$ExtensionIsAllowed){
            echo('この拡張子のファイルはアップロードできません。');
            
        }else{
            $AbsoluteFilePath = './';

            if($Category1!=' なし none'){
                $AbsoluteFilePath=$AbsoluteFilePath.$Category1.'/';
            }
            if($Category2!=' なし none'){
                $AbsoluteFilePath=$AbsoluteFilePath.$Category2.'/';
            }
            $AbsoluteFilePath = $AbsoluteFilePath. $FileName;

            if ( move_uploaded_file($tempfile , $AbsoluteFilePath )) {
                echo $FileName . "をアップロードしました。";
            } else {
                echo "ファイルをアップロードできません。";
            }    
        }

    } else {
        echo "ファイルが選択されていません。";
    } 

?>
<br>
<a href="../GeneralFileUploader.html">戻る/Back</a><br>
<a href="0はじめに%20Read%20us/Home.html">Home</a>