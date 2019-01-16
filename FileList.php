
<html>
    <body>
        <?php
            foreach(glob('Files/*.html') as $file){
                if(is_file($file)){
                    echo "<a href=\"";
                    echo $file;
                    echo "\" target=\"_blank\">";
                    echo htmlspecialchars($file);
                    echo "</a><br />\n";
                }
            }
        ?>
    </body>
</html>