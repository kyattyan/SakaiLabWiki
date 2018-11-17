<!doctype html>
<html>
    <head>
    </head>
    <body>

    
        <?php

            # Content-type を出力
            header("Content-type:text/html");

            # 名前を指定してファイル情報を取得する
            $input_file = $_FILES["input_file"];
            # $input_file1 = $_FILES["input_file1"];

            # 同名のパラメータがある場合、１つの連想配列を取得できる（この時点では配列ではない）
            # $input_files = $_FILES["input_files"];


            echo "name:" . $input_file["name"] . "\n";
            echo "type:" . $input_file["type"] . "\n";
            echo "size:" . $input_file["size"] . "\n";
            echo "tmp_name:" . $input_file["tmp_name"] . "\n";
            echo "error:" . $input_file["error"] . "\n";
        ?>
    </body>
</html>

