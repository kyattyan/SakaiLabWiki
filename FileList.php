
<html>

    <head>
        <meta charset="utf-8">
        <title>作成済みのページリスト</title>

    </head>
    <body>
        <?php
            function SearchDirectory($DirName, $Level){
                if($Level>10){
                    return;
                }
                $Directories = [];
                $DirIndex = 0;
  
                $ExtractedDirname = substr(strrchr($DirName, '/'),1);
                if(!$ExtractedDirname){
                    $ExtractedDirname=$DirName;
                }

                //フォルダ名が"_"から始まる場合は即座に抜ける。_から始まるフォルダはバックアップや古いファイル用
                if(substr($ExtractedDirname, 0, 1)=='_'){
                    return;
                }

                for($i=0;$i<$Level;$i++){
                    echo("&emsp;");
                }

                echo($ExtractedDirname."\n<br />");

                foreach(glob($DirName.'/*') as $Members){
                    if(is_file($Members)){
                        $ExtractedFilename = substr(strrchr($Members, '/'),1);

                        for($i=0;$i<=$Level;$i++){
                            echo("&emsp;");
                        }

                        echo ("<a href=\"http://www.scc.kyushu-u.ac.jp/Sakutai/TestForYatsuduka/");
                        echo ($Members);
                        echo ("\" target=\"_blank\">");
                        echo (htmlspecialchars($ExtractedFilename));
                        echo ("</a><br />\n");

                    }else{
                        $Directories[$DirIndex] = $Members;
                        $DirIndex++;
                    }
                }

                for($i=0;$i<$DirIndex;$i++){
                    SearchDirectory($Directories[$i], $Level+1);
                }

                return;
            }

            /*foreach(glob('Files/*.html') as $file){
                if(is_file($file)){
                    echo "<a href=\"";
                    echo $file;
                    echo "\" target=\"_blank\">";
                    echo htmlspecialchars($file);
                    echo "</a><br />\n";
                }
            }*/

            SearchDirectory('Files',0);
        ?>
    </body>
</html>