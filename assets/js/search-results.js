var factUrl = "https://uselessfacts.jsph.pl/api/v2/facts/";

var factText = $("#fact");

let urlPt1 = "https://shibe.online/api/";
let urlPt2 = "?count=1&urls=true&httpsUrls=true";
let dogUrl = "";
let animalType = "";

var recentSearches = [];
var factInfo = "";
var imgInfo = "";

const head = document.querySelector("header");
const selection = document.querySelector("#form");
// looks for match of screen size min width and calls function when it crosses threshold
const medium = window.matchMedia("(min-width: 770px)");
medium.addEventListener("change", screenHandler);

//sets class attributes of heading elements to make it responsive with Bulma Css
function screenHandler(event) {
  if (event.matches) {
    selection.setAttribute(
      "class",
      "column mt-1 is-flex is-justify-content-flex-end"
    );
    head.setAttribute(
      "class",
      "card columns is-flex is-justify-content-flex-end is-flex-direction-row"
    );
  } else {
    selection.setAttribute(
      "class",
      "column mt-1 is-flex is-justify-content-center ml-2"
    );
    head.setAttribute(
      "class",
      "card  is-flex is-flex-direction-column is-justify-content-center has-text-centered"
    );
  }
}

// Retrieves information stored in localStorage
init();

function init() {
  var storedSearches = JSON.parse(localStorage.getItem("recentSearches"));
  // if stored searches exists, set the stored array to the working array
  if (storedSearches) recentSearches = storedSearches;
}

// retrieve the fact from the random fact api
var getFact = function () {
  // get the url from the page
  var dailyString = document.location.href;
  // see if the daily value in the url is set to "true"
  dailyString = dailyString.split("=")[2];
  if (dailyString === "true") {
    // set the api uri to the fact of the day
    factUrl = factUrl + "today";
  } else {
    // get a random fact
    factUrl = factUrl + "random";
  }

  // fetch the data
  fetch(factUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        // set the data text to factInfo
        factInfo = data.text;
      });
    }
  });
};

// function sends a fetch request to get the gif image and display the link
const getImg = function () {
  // gets user query from url and builds the api parameters for the shibe api
  let queryString = document.location.href;

  queryString = queryString.split("=")[1].split("&")[0]; //get q value from url
  animalType = queryString;
  dogUrl = urlPt1 + queryString + urlPt2;
  //fetch request using the api url assembled above
  fetch(dogUrl).then(function (response) {
    response.json().then(function (data) {
      //pull the url from the data and set to img src attribute
      imgInfo = data[0];
      storeData();
    });
  });
};

getImg();
getFact();

// Store the data retrieved from both api to an object and store the object into storage
var storeData = function () {
  var storedFact = {
    fact: factInfo,
    imageLocation: imgInfo,
    animal: animalType,
  };

  // maximum of 10 results, if more than 10 results, then remove the first entry
  if (recentSearches.length > 9) recentSearches.shift();
  // add the latest object
  recentSearches.push(storedFact);

  // store the array as a JSON string
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  // call to render searches
  renderSearches();

  // if there are less than 10 searches
  if (recentSearches.length < 10) {
    // show the latest search
    clickNumber(recentSearches.length - 1);
  } else {
    // show the tenth search
    clickNumber(9);
  }
};

// append all the searches in the recentSearches array to the sidebar
function renderSearches() {
  for (var i = recentSearches.length - 1; i >= 0; i--) {
    var recentSearch = recentSearches[i];
    $("#search-list").append(
      '<li class = "menu-item block"><a>' + recentSearch.animal + "</a></li>"
    );
  }
}

// To enable the use of the search bar in the header
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

var searchList = $("#search-list");

var displayResult = function (event) {
  var item = $(event.target);
  if (item.is("a")) {
    var index = 9 - item.parent().index();
    clickNumber(index);
  }
};

var clickNumber = function (numberClicked) {
  $("#img").attr("src", recentSearches[numberClicked].imageLocation);
  $("#fact").text(recentSearches[numberClicked].fact);
};

searchList.on("click", displayResult);

var copyFactBtn = $("#copyFact");

function copyToClipboard() {
  navigator.clipboard.writeText($("#fact").text());
}

copyFactBtn.on("click", copyToClipboard);

var copyImageBtn = $("#copyImage");

function copyToClipboard() {
  navigator.clipboard.writeText($("#img").attr("src"));
}

copyImageBtn.on("click", copyToClipboard);
