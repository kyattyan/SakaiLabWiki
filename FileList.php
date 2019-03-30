
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

                $ReturnValue="";

                //システムのフォルダへのパス
                $AbsolutePathToSystem = "http://www.scc.kyushu-u.ac.jp/Sakutai/TestForYatsuduka/";
                //安全装置
                if($Level>10){
                    return;
                }
                //表示しない例外ファイル
                $ExceptionalFiles = [
                    "Uploader.php",
                    "FileExistChecker.php",
                    "GetFileContent.php",
                    "GeneralUploader.php",
                    "MoveToBackUp.php"
                ];

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
                        $ReturnValue.=("&emsp;");
                    }*/
                    
                    //簡易的なJSで要素の状態を変更し、疑似的な折りたたみメニュー
                    $ReturnValue.="<div onclick = \"obj = document.getElementById('Open_".$DirName."').style;
                        obj.display=(obj.display=='none')?'inherit':'none';
                        obj2 = document.getElementById('Allow_".$DirName."');
                        obj2.innerHTML = (obj.display=='none')?'▶':'▽';
                        console.log(obj2.innerHTML);
                        \" class=Dir_".$Level.">";
                    $ReturnValue.="<span id = 'Allow_".$DirName."'>▶</span>";
                    $ReturnValue.=$ExtractedDirname."\n<br />";
                    $ReturnValue.="</div>";
                }

                
                if($Level==0){
                    $ReturnValue.="<div>";
                }else{
                    $ReturnValue.="<div style='display:none' id='Open_".$DirName."'>";
                }
                $ReturnValue.="<span class='File_".$Level."'>";
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
                            $ReturnValue.=("&emsp;");
                        }*/

                        //拡張子に依存してaタグ内の挙動、表示を変更
                        $ReturnValue.= "<a href=\"".$AbsolutePathToSystem;
                        $ReturnValue.= $Members;
                        switch($Extension){
                            case "html":
                                $ReturnValue.= "\">";
                                $ReturnValue.= htmlspecialchars($ExtractedFilename);
                                break;
                            case "pdf":
                                $ReturnValue.= "\" target=\"_blank\">";
                                $ReturnValue.= htmlspecialchars($ExtractedFilename);
                                $ReturnValue.= '<img width="16" src="'.$AbsolutePathToSystem.'PDF.png">';
                                break;
                            default:
                                //拡張子ありで表示
                                $ReturnValue.= "\">";
                                $ReturnValue.= htmlspecialchars($Filename);
                        }
                        $ReturnValue.= "</a><br />\n";

                    }else{
                        //ファイル内メンバがディレクトリならそれを別で保管
                        $Directories[$DirIndex] = $Members;
                        $DirIndex++;
                    }
                }
                $ReturnValue.="</span>";//<span calss="File_Level〇〇">に対応

                //保管したディレクトリにさらにもぐる
                for($i=0;$i<$DirIndex;$i++){
                    $ReturnValue.= SearchDirectory($Directories[$i], $Level+1);
                }
                $ReturnValue.="</div>";//<div id='Open_".$DirName.">"に対応

                return $ReturnValue;
            }

            //Fileディレクトリから上記関数開始
            echo(SearchDirectory('Files',0));
        ?>
    </body>
</html>