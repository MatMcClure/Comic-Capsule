function character() {
  let urlQueryParameters = new URLSearchParams(window.location.search),
      queryParameterName = urlQueryParameters.get("name"),
      name = document.getElementById("name").value;

  if (queryParameterName !== null && queryParameterName !== "") {
      document.getElementById("name").value = queryParameterName;
      connection();
  } else if (name !== null && name !== "") {
      document
          .getElementById("connectionForm")
          .addEventListener("submit", connection);
  } else {
      document.getElementById("characterSection").innerHTML = '<h6 style ="color: #FFFFFF" id="characterMainTitle">Enter a hero above!</h6>';
  }
}

function connection() {
  document.getElementById("characterSpinnerSection").innerHTML = "";
  document.getElementById("comicsSpinnerSection").innerHTML = "";

  const xhr = new XMLHttpRequest();
  const name = document.getElementById("name").value;
  const params = "name=" + name;

  xhr.open("GET", "./connections/name-search.php?" + params, true);
  
  xhr.onloadstart = function() {
      document.getElementById("characterSpinnerSection").innerHTML =
      '<strong id="spinnerText" class="text-danger"></strong>' +
      '<div class="text-danger spinner-border ml-auto" role="status" ' +
      'aria-hidden="true" id="spinner"></div>';
  };
  xhr.onerror = function() {
      document.getElementById("characterSection").innerHTML = '<h6 style ="color: #FFFFFF" id="characterMainTitle">An error has occured. Connection failure.</h6>';
  };
  xhr.onload = function() {
      if (this.status == 200) {
          const results = JSON.parse(this.responseText);

          console.log(results);

          if (results["data"].count === 0) {
              document.getElementById("characterSection").innerHTML = 
              '<h6 style ="color: #FFFFFF" id="characterMainTitle"><span>No results for '
              + name + "</span>" + ". Try Again.</h6>";

              document.getElementById("characterSpinnerSection").innerHTML = "";
              document.getElementById("comicsSpinnerSection").innerHTML = "";

          } else if (results == undefined || results.length == 0) {
              document.getElementById("characterSection").innerHTML = 
              '<h2 style ="color: #FFFFFF" id="characterMaintitle">' + "An error has occured on our end. Please try again later.";

              document.getElementById("characterSpinnerSection").innerHTML = "";
              document.getElementById("comicsSpinnerSection").innerHTML = "";

          } else {
              const characterAttributes = results["data"].results[0],
                  characterID = results["data"].results[0].id;
              let output = "";

      output +=
        '<h2 id="characterMainTitle">' +
        "Character" +
        "</h2>" +
        '<div class="card flex-md-row mb-4 box-shadow h-md-250" id="characterCard">' +
        '<div id="characterImage">' +
        '<img class="card-img-right flex-auto d-md-block img-fluid"' +
        ' alt="Picture of ' +
        characterAttributes.name +
        '" src="' +
        characterAttributes.thumbnail["path"] +
        "." +
        characterAttributes.thumbnail["extension"] +
        '">' +
        "</div>" +
        '<div class="card-body d-flex flex-column align-items-start">' +
        '<h3 class="mb-0 text-white" id="characterName">' +
        characterAttributes.name +
        "</h3>" +
        '<p class="card-text text-white mb-3" id="characterDescription">';
      if (characterAttributes.description !== "") {
        output += characterAttributes.description;
      }
      output +=
        "</p>" +
        '<p class="text-muted mb-3" id="comicsAvailable">' +
        "Comics: " +
        characterAttributes.comics.available +
        " | " +
        "Series: " +
        characterAttributes.series.available +
        " | " +
        "Stories: " +
        characterAttributes.stories.available +
        " | " +
        "Events: " +
        characterAttributes.events.available +
        "</p>" +
        '<p class="mb-1 text-muted" id="characterInfoAttribution">' +
        results["attributionText"] +
        "</p>" +
        "</div>" +
        "</div>";
      
      document.getElementById("characterSection").innerHTML = output;
      
      comics(characterID)
          
          }

      } else {
          document.getElementById("characterSection").innerHTML = '<h6 id="characterMainTitle">Insufficient request.</h6>';
      }
  };
  xhr.onloadend = function() {
      document.getElementById("characterSpinnerSection").innerHTML = "";
  };
  xhr.send();
}

function comics(characterID) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", './connections/character.php?character-ID=' + characterID, true);
  xhr.onloadstart = function() {
      document.getElementById("comicsSpinnerSection").innerHTML =
      '<strong id="spinnerText" class="text-danger"></strong>' +
      '<div class=spinner-border "text-danger ml-auto" role="status" ' +
      'aria-hidden="true" id="spinner"></div>';
  };
  xhr.onerror = function() {
      document.getElementById("characterSection").innerHTML = '<h6 id="characterMainTitle">An error has occured. Connection failure.</h6>';
      document.getElementById("comicSection").innerHTML = '<h6 id="characterMainTitle">An error has occured. Connection failure.</h6>';
  };
  xhr.onload = function() {
      if (this.status == 200) {
          const results = JSON.parse(this.responseText),
              comics = results["data"].results,
              comicSection = document.getElementById("comicSection");

          console.log(results);

          if (results["data"] == 0) {
              let output = "";
              comicSection.innerHTML = output;
              comicSection.innerHTML = "<h6>No comics available.</h6>";
          } else {
              
              let output = "", creators = "";
              

              output +=
              '<h2 id="comicMainTitle">Comics</h2>' + '<div class="card-columns">';

              for (const i in comics) {
                if (comics.hasOwnProperty(i)) {
                  const comic = comics[i];
      
              output +=
                  '<div class="card">' +
                  '<a href="./comic.php?comic-id=' +
                  comic.id +
                  '"><img src="' +
                  comic.thumbnail["path"] +
                  "." +
                  comic.thumbnail["extension"] +
                  '" class="card-img-top" alt="' +
                  comic.title +
                  '"></a>' +
                  '<div class="card-body">' +
                  '<h5 class="card-title text-white">' +
                  comic.title +
                  "</h5>";
  
              if (comic.description != null) {
                  output +=
                  '<p style="font-size: 12px;" class="card-text text-white">' +
                  comic.description +
                  "</p>";
              }
  
              output +=
                  '<p style="font-size: 12px;" class="card-text text-white">Characters: ';
  
              for (const k in comic.characters.items) {
                  if (comic.characters.items.hasOwnProperty(k)) {
                  const character = comic.characters.items[k];
                  output += character.name.concat(", ");
                  }
              }
  
              output += "</p>";
              output +=
                  '<p style="font-size: 12px;" class="card-text text-white">Creators: ';
  
              for (const j in comic.creators.items) {
                  if (comic.creators.items.hasOwnProperty(j)) {
                  const creator = comic.creators.items[j];
  
                  output += creator.name.concat(" (" + creator.role + "), ");
                  }
              }
  
              output += "</p>";
              output +=
                  "</div>" +
                  '<div class="card-footer">' +
                  '<small style="line-height: 1;" class="text-white">' +
                  results["attributionText"] +
                  "</small>" +
                  "</div>" +
                  "</div>";
              }
          }
  
              output += "</div>";
              
              characterSection.innerHTML = output;

      }


      } else {
          document.getElementById("characterSection").innerHTML = '<h6 id="characterMainTitle">Insufficient request.</h6>';
          document.getElementById("comicSection").innerHTML = '<h6 id="characterMainTitle">Insufficient request.</h6>';
      }
  };
  xhr.onloadend = function() {
      document.getElementById("comicsSpinnerSection").innerHTML =
      '<strong id="spinnerText" class="text-success"></strong>';
  };
  xhr.send();
}

function singleComic() {
const urlQueryParameters = new URLSearchParams(window.location.search),
  comicID = urlQueryParameters.get("comic-id");
  singleComicContainerDiv = document.getElementById(
    "singleComicContainerDiv"
  );

const xhr = new XMLHttpRequest();

xhr.open('GET', "./connections/single-comic.php?comic-id=" + comicID, true);
//xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"); 
xhr.onloadstart = function () {
  document.getElementById("comicsSpinnerSection").innerHTML =
    '<strong id="spinnerText" class="text-danger"></strong>' +
    '<div class="spinner-border text-danger ml-auto" role="status" ' +
    'aria-hidden="true" id="spinner"></div>';
};

xhr.onerror = function () {
  singleComicContainerDiv.innerHTML =
    '<h6 style ="color: #FFFFFF" id="characterMainTitle">An error has occured. Connection failure.</h6>';
};

xhr.onload = function () {
  if (this.status == 200) {
    const results = JSON.parse(this.responseText),
      comicInfo = results["data"].results[0],
      comicImage =
        comicInfo.thumbnail["path"] + "." + comicInfo.thumbnail["extension"],
      comicDescription = comicInfo.description,
      comicCharacters = comicInfo.characters.items,
      comicCreators = comicInfo.creators.items;
    
    let output = "";
    
      output +=
        '<h1 style ="color: #FFFFFF" class="header-title single-comic__main-title">' +
        comicInfo.title +
        "</h1>" +
        '<div class="card mb-3">' +
        '<div class="row no-gutters">' +
        '<div class="col-md-4">' +
        '<img src="' +
        comicImage +
        '" class="card-img" alt="...">' +
        "</div>" +
        '<div class="col-md-8">' +
        '<div style ="color: #FFFFFF" class="card-body-white">' +
        '<h5 style ="color: #FFFFFF" class="card-title-white">' +
        comicInfo.title +
        "</h5>";

      if (comicDescription !== null && comicDescription !== "") {
        output += '<p class="card-text-white">' + comicDescription + "</p>";
      }

      output +=
        '<p class="card-text-white">' +
        '<small class="text-white">' +
        " <strong>Characters:</strong> ";
      for (const i in comicCharacters) {
        if (comicCharacters.hasOwnProperty(i)) {
          const character = comicCharacters[i];
          output +=
            '<a href="./index.php?name=' +
            character.name +
            '">' +
            character.name +
            "</a>, ";
        }
      }

      output +=
        "</small>" +
        "</p>" +
        '<p class="card-text">' +
        '<small class="text-white">' +
        " <strong>Creators:</strong> ";
      for (const i in comicCreators) {
        if (comicCreators.hasOwnProperty(i)) {
          const creator = comicCreators[i];
          var url = new URL(creator.resourceURI),
            creatorID = url.pathname.substring(
              url.pathname.lastIndexOf("/") + 1
            );
          output +=
            '<a href="./creator.php?creator-id=' +
            creatorID +
            '">' +
            creator.name.concat(" (" + creator.role + "), ") +
            "</a>, ";
        }
      }

      output +=
        "</small>" +
        "</p>" +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="card-footer text-muted text-right"> ' +
        results["attributionText"] +
        "</div>" +
        "</div>";

      singleComicContainerDiv.innerHTML = output;


  } else {
    singleComicContainerDiv.innerHTML =
    '<h2 id="characterMainTitle">Request not received</h2>';
  }
}

xhr.onloadend = function () {
  document.getElementById("comicsSpinnerSection").innerHTML =
    '<strong id="spinnerText" class="text-danger"></strong>';
}

xhr.send()
}


function comicCreator() {
const urlQueryParameters = new URLSearchParams(window.location.search),
  creatorID = urlQueryParameters.get("creator-id");

const xhr = new XMLHttpRequest();

xhr.open("GET", "./connections/creator.php?creator-id=" + creatorID, true)

xhr.onloadstart = function () {
  document.getElementById("comicCreatorSpinnerSection").innerHTML =
    '<strong id="spinnerText" class="text-danger"></strong>' +
    '<div class="spinner-border text-danger ml-auto" role="status" ' +
    'aria-hidden="true" id="spinner"></div>';
}

xhr.onerror = function () {
  comicCreatorContainerDiv.innerHTML =
    '<h6 style ="color: #FFFFFF" id="characterMainTitle">An error has occured. Connection failure.</h6>';
};

xhr.onload = function () {
  if (this.status == 200) {
    const results = JSON.parse(this.responseText),
      creatorInfo = results["data"].results[0],
      creatorFullName = creatorInfo.fullName,
      creatorImage = 
        creatorInfo.thumbnail["path"] + "." +
        creatorInfo.thumbnail["extension"],
      comicCreatorContainerDiv = document.getElementById("comicCreatorContainerDiv"),
      creatorComics = creatorInfo.comics.items;
      console.log(results);
    let output = "";

    output +=
      '<h1 class="header-title single-comic__main-title"></h1>' +
      '<div class="card mb-3">' +
      '<div class="row no-gutters">' +
      '<div class="col-md-4">' +
      '<img src="' +
      creatorImage +
      '" class="card-img" alt="' + creatorFullName + '">' +
      "</div>" + 
      '<div class="col-md-8">' +
      '<div class="card-body">' +
      '<h5 <h6 style ="color: #FFFFFF" class="card-title">' +
      creatorFullName +
      "</h5>";
    output +=
      '<p class="text-white mb-3">' +
      "Comics: " +
      creatorInfo.comics["available"] +
      " | " +
      "Series: " +
      creatorInfo.series["available"] +
      " | " +
      "Stories: " +
      creatorInfo.stories["available"] +
      " | " +
      "Events: " +
      creatorInfo.events["available"] +
      "</p>";
    output +=
      "</div>" + 
      "</div>" + 
      "</div>" + 
      '<div class="card-footer text-muted text-right"> ' +
      results["attributionText"] +
      "</div>" +
      "</div>"; 

    output +=
      '<h1 class="header-title single-comic__main-title"></h1>' +
      '<div class="row" id="comicColumns"></div>';

    comicCreatorContainerDiv.innerHTML = output;

    for (const i in creatorComics) {
      if (creatorComics.hasOwnProperty(i)) {
        const comic = creatorComics[i];
        //creatorSingleComic(comic.resourceURI);
      }
    }
  } else {
      comicCreatorContainerDiv.innerHTML = '<h1 class="header-title single-comic__main-title"></h1>';
  } 
}

xhr.onloadend = function () {
  document.getElementById("comicCreatorSpinnerSection").innerHTML = "";
}

xhr.send()

}