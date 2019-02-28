<?php
    /*define("TESTFILE","TEST.txt");
    $s = "上書き";
    print_r("file_put_tcontents関数\n");
    file_put_contents(TESTFILE,$s);
    var_dump(file_get_contents(TESTFILE));*/
    
    //この方法は普通にURLの長さ上限に引っかかった
    //echo($_GET['title']);
    //echo($_GET['html']);

    //file_put_contents($_GET['title'],$_GET['html']);

    # 文字列変換用連想配列
    $Symbols = array(
        '_Sp_'  =>  ' ',
        '_Sl_'  =>  '/',
        '_LBr_' =>  '<',
        '_RBr_' =>  '>',
        '_DQu_' =>  '"',
        '_Eq_'  =>  '='  
    );

    $Keys = array_keys($Symbols);

    # Content-type を出力
    header("Content-type:text/plain");
    
    # 変換した文字列を復号
    $DecordedText=$_POST["HTML_Source"];
    for($i=0;$i<count($Keys);$i++){
        $DecordedText=str_replace($Keys[$i],$Symbols[$Keys[$i]],$DecordedText);
    }

	
	# 名前を指定してフォーム情報を取得する
    $HTML_Source = 
        "<head>\n".
        "    <meta charset = \"UTF-8\">\n".
        "    <script type=\"text/javascript\" src=\"http://www.scc.kyushu-u.ac.jp/Sakutai/TestForYatsuduka/CommonHTML.js\"></script>".
        "    <link rel = \"stylesheet\" type = \"text/css\" href = \"http://www.scc.kyushu-u.ac.jp/Sakutai/TestForYatsuduka/OriginalTags.css\">".
        "    <link rel = \"stylesheet\" type = \"text/css\" href = \"http://www.scc.kyushu-u.ac.jp/Sakutai/TestForYatsuduka/Main.css\">".
        "<title>".
        $_POST["FileName"].
        "</title>".
        "</head>\n".
        "<body>\n".
        "   <script>CommonBody_Top();</script>\n".
        "   <div class=\"Contents\">".
            $DecordedText .
        "   </div>".
        "   <script>CommonBody_Bottom();</script>\n".
        "</body>";
        

    #$HTML_Source = "<head><meta charset = \"UTF-8\"></head>" . $_POST["HTML_Source"];
    $FileName = $_POST["FileName"];

	# 拡張子を取得する
	//$file_ext = pathinfo($HTML_Source["name"], PATHINFO_EXTENSION);

	# アップロード可能な拡張子であるか調べる
	/*if(FileExtensionGetAllowUpload($file_ext)){

		# 現在の時間を取得する
		//$time_now = time();

		# 保存先のファイルパスを生成する（実戦運用する場合、排他処理を考慮して保存先のファイル名を生成する必要があります）
		$file_name_new = "./" . $time_now . "." . $file_ext;
	
		# ファイルの移動を行う
		move_uploaded_file ($HTML_Source["tmp_name"], $file_name_new);
    }*/
    if(file_exists($_POST["Directory"].$FileName)){
        $EscapePath="./__BackUp/". date("ymd_His"). $FileName;
        rename($_POST["Directory"].$FileName, $EscapePath);
    }
    
    
    file_put_contents($_POST["Directory"].$FileName,$HTML_Source);

    echo("Your file is succesfully uploaded as ".$_POST["Directory"].$FileName);
    
?>