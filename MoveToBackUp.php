<!-----------------------概要-------------------------
POST送信でファイルのアドレス（Filesディレクトリから見た相対パス）を受け取り、
そのファイルを日時をファイル名に添えて__BackUpフォルダに移動する。
----------------------------------------------------->

<?PHP
    $OldPath = $_POST[Path];

    if(!file_exists($OldPath)){
        echo('Error: The file cannot be found.');
        return;
    }
    $FileName = basename($OldPath);
    $NewPath="./__BackUp/". date(DATE_ATOM). $FileName;

    if(rename($OldPath, $NewPath)){
        echo('Success');
    }else{
        echo('Failed to move');
    }
?>