<?php
    error_reporting(0);
    mb_language("ja");
    mb_internal_encoding('UTF-8');
    
    /*$url=$_POST["data"];
    print $_POST["data"].strval(rand());*/
    //echo('test1<br>');

    switch($_POST["RequestType"]){
        case "FileList":
            include 'FileList.php';
            break;

        default:
            echo "Ileagl request.<br>\n";
            echo "Given value is " . $_POST["RequestType"] ;

    }

    
    //SearchDirectory('Files',0);
    //echo('test2');
?>
