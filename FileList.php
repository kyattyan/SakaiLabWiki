
<!-----------------------概要-------------------------
Filesディレクトリ以下のファイル、ディレクトリを列挙し、
さらにサブディレクトリ内部のファイル、ディレクトリも回帰的に列挙する。
さらに、ファイルに対しては対応するリンクを付けた<a>を付ける。
また、それぞれに対応するCSSクラスを付与している。
順番はファイル（アルファベット順）→ディレクトリ（アルファベット順）。

拡張子によって細かい挙動を変える
・HTMLはそのままリンク
・PDFは別タグで開くリンク、PDFのアイコンを付ける
・その他は拡張子を付けて普通のリンク

10階層までしか探索しない安全装置を付けている。外す必要は今のところない。

表示しない例外は
・個別に指定した($ExceptionalFiles)PHPファイルなど
・最初の2文字がアンダーバーから始まるディレクトリとその内部
----------------------------------------------------->

<html>

    <head>
        <meta charset="utf-8">
        <title>作成済みのページリスト</title>

    </head>
    <body>
        <?php
            function SearchDirectory($DirName, $Level){

                //システムのフォルダへのパス
                $AbsolutePathToSystem = "http://www.scc.kyushu-u.ac.jp/Sakutai/TestForYatsuduka/";
                //安全装置
                if($Level>10){
                    return;
                }
                //表示しない例外ファイル
                $ExceptionalFiles = ["Uploader.php", "FileExistChecker.php", "GetFileContent.php"];

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

                if($ExtractedDirname!="Files"){
                    //いやCSSでいいやろ……何のためにclass指定しとるねん
                    /*for($i=0;$i<$Level;$i++){
                        echo("&emsp;");
                    }*/
                    echo("<span class=Dir_".$Level.">");
                    echo($ExtractedDirname."\n<br />");
                    echo("</span>");
                }


                echo("<span class=File_".$Level.">");
                foreach(glob($DirName.'/*') as $Members){
                    $isExceptional = false;
                    
                    if(is_file($Members)){
                        $FileName = basename($Members); #上階層のディレクトリを除いた、拡張子ありのファイル名
                        $ExtractedFilename = substr($FileName, 0, strrpos($FileName, '.') ); # 拡張子削除
                        $Extension = substr($FileName, strrpos($FileName, '.') +1); #拡張子
                        
                        //例外ファイル処理
                        for($i=0;$i<count($ExceptionalFiles);$i++){
                            if($ExtractedFilename.'.'.$Extension==$ExceptionalFiles[$i]){
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

                        //拡張子に依存してaタグ内の挙動、表示を変更
                        echo ("<a href=\"".$AbsolutePathToSystem);
                        echo ($Members);
                        switch($Extension){
                            case "html":
                                echo ("\">");
                                echo (htmlspecialchars($ExtractedFilename));
                                break;
                            case "pdf":
                                echo ("\" target=\"_blank\">");
                                echo (htmlspecialchars($ExtractedFilename));
                                echo ('<img width="16" src="'.$AbsolutePathToSystem.'PDF.png">');
                                break;
                            default:
                                //拡張子ありで表示
                                echo ("\">");
                                echo (htmlspecialchars($Filename));
                        }
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