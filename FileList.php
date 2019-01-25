
<html>

    <head>
        <meta charset="utf-8">
        <title>作成済みのページリスト</title>

    </head>
    <body>
        <?php
            function SearchDirectory($DirName, $Level){
                //安全装置
                if($Level>10){
                    return;
                }
                //表示しない例外ファイル
                $ExceptionalFiles = ["Uploader.php", "FileExistChecker.php"];

                $Directories = [];
                $DirIndex = 0;
  
                $ExtractedDirname = substr(strrchr($DirName, '/'),2);
                if(!$ExtractedDirname){
                    $ExtractedDirname=$DirName;
                }

                //フォルダ名が"_"から始まる場合は即座に抜ける。_から始まるフォルダはバックアップや古いファイル用
                if(substr($ExtractedDirname, 0, 1)=='_'){
                    return;
                }

                //いやCSSでいいやろ……何のためにclass指定しとるねん
                /*for($i=0;$i<$Level;$i++){
                    echo("&emsp;");
                }*/
                echo("<span class=Dir_".$Level.">");
                echo($ExtractedDirname."\n<br />");
                echo("</span>");

                echo("<span class=File_".$Level.">");
                foreach(glob($DirName.'/*') as $Members){
                    $isExceptional = false;
                    
                    if(is_file($Members)){
                        $ExtractedFilename = substr(strrchr($Members, '/'),1);
                        
                        //例外ファイル処理
                        for($i=0;$i<count($ExceptionalFiles);$i++){
                            if($ExtractedFilename==$ExceptionalFiles[$i]){
                                $isExceptional=true;
                            }
                        }
                        if($isExceptional){
                            //例外ファイルの場合はここで抜ける
                            continue;
                        }

                        
                        /*for($i=0;$i<=$Level;$i++){
                            echo("&emsp;");
                        }*/

                        echo ("<a href=\"http://www.scc.kyushu-u.ac.jp/Sakutai/TestForYatsuduka/");
                        echo ($Members);
                        //echo ("\" target=\"_blank\">");
                        echo ("\">");
                        echo (htmlspecialchars($ExtractedFilename));
                        echo ("</a><br />\n");

                    }else{
                        //ファイル内メンバがディレクトリならそれを別で保管
                        $Directories[$DirIndex] = $Members;
                        $DirIndex++;
                    }
                }
                echo("</span>");

                //保管したディレクトリにさらにもぐる
                for($i=0;$i<$DirIndex;$i++){
                    SearchDirectory($Directories[$i], $Level+1);
                }

                return;
            }

            //Fileディレクトリから上記関数開始
            SearchDirectory('Files',0);
        ?>
    </body>
</html>