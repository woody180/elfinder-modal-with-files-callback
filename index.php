<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <script src="filemanager/extend/js/jquery-3.6.0.min.js"></script>
    <script src="filemanager/extend/js/jquery-ui.js"></script>

    <!-- UIkit CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.6.21/dist/css/uikit.min.css" />

    <!-- UIkit JS -->
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.6.21/dist/js/uikit.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.6.21/dist/js/uikit-icons.min.js"></script>


    <title>Document</title>
</head>
<body>


    <section class="uk-section">
        <div class="uk-container">

            <div class="uk-flex uk-flex-column uk-flex-center uk-flex-middle">
                <img class="uk-display-block uk-margin uk-border-rounded" width="200" src="https://picsum.photos/200/300" alt="">

                <button class="uk-button uk-button-primary uk-border-rounded">Open file manager</button>
            </div>

        </div>
    </section>
    

    <script src="filemanager/extend/js/filemanager.js"></script>
    <script>
        const filemanager = new Filemanager();
        const img  = document.querySelector('img');
        const button = document.querySelector('button');

        button.onclick = e => {
            e.preventDefault();

            filemanager.fmOpen(files => {
                const src = files[0];
                img.src = src;
            })
        }
    </script>
</body>
</html>