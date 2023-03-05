<!DOCTYPE html>
<html lang="en">

<head>
    <a style="color: #FFD700" href="/wp-content/comic/comic/index.php">Home</a>
    <a>&nbsp</a>
    <a style="color: #FFD700" href="/wp-content/comic/comic/index.php?"name=" + name">Comics</a>
    <a>&nbsp</a>
    <a style="color: #FFD700" href="/wp-content/comic/comic/aboutus.php">About Us</a>
    <a>&nbsp</a>
    <a style="color: #FFD700" href="/wp-content/comic/comic/sitedescription.php">Site Description</a>
    <a>&nbsp</a>
    <a style="color: #FFD700" href="/wp-content/comic/comic/checklist.php">Checklist</a>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie-edge">
    <!--Boostrap CSS-->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    
    <title>Comic Capsule</title>

    <link rel="stylesheet" href="style.css">

</head>

<body onload="singleComic()" class="single-comic__body")>
    <div class="jumbotron">
        <div class="d-flex align-items-center container" id="comicsSpinnerSection"></div>
        <div class="container single-comic__container" id="singleComicContainerDiv">

        </div>
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