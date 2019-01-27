<?php

    if(!file_exists($_POST["Path"])){
        echo("No sach file or directory");
        return;
    }

    readfile($_POST["Path"]);
?>