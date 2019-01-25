<?php
    if(file_exists($_POST["Directory"].$_POST["FileName"])){
        echo("Exist");
    }else{
        echo("OK");
    }

?>