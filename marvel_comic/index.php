
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie-edge">
    <!--Boostrap CSS-->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    
    <title>Comic Capsule</title>
        <a style="color: #FFD700" href="/wp-content/comic/comic/index.php">Home</a>
        <a>&nbsp</a>
        <a style="color: #FFD700" href="/wp-content/comic/comic/VIPLogin.php">Membership Login</a>
        <a>&nbsp</a>
        <a style="color: #FFD700" href="/wp-content/comic/comic/aboutus.php">About Us</a>
        <a>&nbsp</a>
        <a style="color: #FFD700" href="/wp-content/comic/comic/sitedescription.php">Site Description</a>
        <a>&nbsp</a>
        <a style="color: #FFD700" href="/wp-content/comic/comic/checklist.php">Checklist</a>


    <link rel="stylesheet" href="style.css">

</head>

<body onload="character()">
    <div class="jumbotron">
        <div class="container">
            <h1 class="header-title" style ="color: #FFD700"><img src="coollogo_com-150051843.png" alt="Image" height="100" width="500"</h1>
            <form id="connectionForm">

                <div class="form-group">
                    <input required type="text" name="name" id="name" class="form-control search-box"
                        style = "background-color: #black;"
                        placeholder="(Ex. Spider-Man (Peter Parker), Iron-Man, Black Panther, etc...)">
                        <input type="submit" value="Search" class="btn btn-danger search-button">
                </div>

            </form>
        </div>
    </div>

    <div class="container" id="contentContainer">
        

        <div class="d-flex align-items-center" id="characterSpinnerSection"></div>
        <div class="d-flex align-items-center" id="comicsSpinnerSection"></div>

        <section id="characterSection"></section>
        
        <section id="comicSection>"></section>
        <!--img src="comiccapsule.png" alt="Image" height="700" width="1200" position: "absolute"/-->
        
    </div>

    <script src="main.js"></script>

    <!--jQuery-->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <!--Popper JS-->
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <!--Boostrap JS-->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>

</html>