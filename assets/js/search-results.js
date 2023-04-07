var factUrl = "https://uselessfacts.jsph.pl/api/v2/facts/";
var factText = $("#fact");
var recentSearches = [];
var factInfo = "";
var imgInfo = "";
var searchList = $("#search-list");
var factBtn = $("#search-button");
var baseURL = "./search-results.html";
var copyFactBtn = $("#copyFact");
var copyImageBtn = $("#copyImage");
let urlPt1 = "https://shibe.online/api/";
let urlPt2 = "?count=1&urls=true&httpsUrls=true";
let dogUrl = "";
let animalType = "";
const head = document.querySelector("header");
const selection = document.querySelector("#form");
const medium = window.matchMedia("(min-width: 770px)");

//Applies responsiveness through addition of classes when screen size passes the threshold. Looks for match of screen size min width and calls function when it crosses threshold
medium.addEventListener("change", screenHandler);
//sets class attributes of index page elements to make them responsive with Bulma Css
function screenHandler(event) {
  //when page grows passed 770px, apply these classes
  if (event.matches) {
    selection.setAttribute(
      "class",
      "column mt-1 is-flex is-justify-content-flex-end");
    head.setAttribute("class", "card columns is-flex is-justify-content-flex-end is-flex-direction-row");
    //when page shrinks passed 770px, apply these classes
  } else {
    selection.setAttribute("class", "column mt-1 is-flex is-justify-content-center ml-2");
    head.setAttribute("class", "card  is-flex is-flex-direction-column is-justify-content-center has-text-centered");
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

// function sends a fetch request to get the animal image and display it
const getImg = function () {
  // gets user query from url and builds the api parameters for the shibe api
  let queryString = document.location.href;
  queryString = queryString.split("=")[1].split("&")[0];
  animalType = queryString;
  dogUrl = urlPt1 + queryString + urlPt2;
  //fetch request using the api url assembled above
  fetch(dogUrl).then(function (response) {
    response.json().then(function (data) {
      //pull the img url from the data and set to img src attribute
      imgInfo = data[0];
      //store the search in the local storage
      storeData();
    });
  });
};

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

//call the main functions to access api's and display info
getImg();
getFact();

//run the search again with this function
function getNewFact(event) {
  event.preventDefault();
  // redirect the page with a new url to trigger js functions for a new random fact and image
  var searchInputVal = $("#search-input").val();
  var updatedURL = baseURL + "?q=" + searchInputVal + "&daily=false";
  location.assign(updatedURL);
}

//Checks if target is an a tag. Gets index number in the list and calls clickNumber
var displayResult = function (event) {
  var item = $(event.target);
  if (item.is("a")) {
    var index = (recentSearches.length - 1) - item.parent().index();
    clickNumber(index);
  }
};

//gets the img link and fact and displays them
var clickNumber = function (numberClicked) {
  $("#img").attr("src", recentSearches[numberClicked].imageLocation);
  $("#fact").text(recentSearches[numberClicked].fact);
};

//copies the fact to the clipboard
function copyFactToClipboard() {
  navigator.clipboard.writeText($("#fact").text());
}

//copies the image to the clipboard
function copyImgToClipboard() {
  navigator.clipboard.writeText($("#img").attr("src"));
}

//event listener for new search submit button on results page
factBtn.on("submit", getNewFact);

//event listener for clicking on a recent search result
searchList.on("click", displayResult);

//event listener for clicking on the save fact to clipboard button
copyFactBtn.on("click", copyFactToClipboard);

//event listener for clicking on the save img to clipboard button
copyImageBtn.on("click", copyImgToClipboard);
