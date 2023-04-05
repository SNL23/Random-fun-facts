var factUrl = "https://uselessfacts.jsph.pl/api/v2/facts/random";

var factText = $("#fact");

let urlPt1 = "https://shibe.online/api/"
let urlPt2 = "?count=1&urls=true&httpsUrls=true"
let dogUrl = ""
let animalType = ""

var recentSearches = [];

init();

function init() {
  var storedSearches = JSON.parse(localStorage.getItem("recentSearches"));
  if(storedSearches) recentSearches = storedSearches;
}

var getFact = function () {
  fetch(factUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        factText.text(data.text);
      });
    }
  });
  getImg()
};

// function sends a fetch request to get the gif image and display the link
const getImg = function () {
  // gets user query from url and builds the api parameters for the shibe api
  let queryString = document.location.href;

  queryString = queryString.split("=")[1].split("&")[0]  //get q value from url
  animalType = queryString;
  dogUrl = urlPt1 + queryString + urlPt2
  //fetch request using the api url assembled above
  fetch(dogUrl)
    .then(function (response) {
      response.json()
        .then(function (data) {
          //pull the url from the data and set to img src attribute
          let img = document.querySelector("#img")
          img.setAttribute("src", data[0])
          storeData()
        })
    })
}



getFact();


function renderSearches() {
  for (var i = recentSearches.length - 1; i >=0  ; i--) {
    var recentSearch = recentSearches[i];
    $("#search-list").append("<li class = \"menu-item\"><a>" + recentSearch.animal + "</a></li>");

  }
}


// To enable the use of the search bar at the top of the
var factBtn = $("#search-button");

var baseURL = "./search-results.html";

function getNewFact(event) {
  event.preventDefault();
  var searchInputVal = $("#search-input").val();

  if (!searchInputVal) return;

  var updatedURL = baseURL + "?q=" + searchInputVal + "&daily=false";
  location.assign(updatedURL);
}

factBtn.on("submit", getNewFact);