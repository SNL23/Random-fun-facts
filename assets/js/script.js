var factBtn = $("#search-button");
var dailyBtn = $("#daily-button");
var randomBtn = $("#random-button");
var baseURL = "./search-results.html";

function getFact(event) {
  event.preventDefault();
  var searchInputVal = $("#search-input").val();

  if (!searchInputVal) return;

  var updatedURL = baseURL + "?q=" + searchInputVal;
  location.assign(updatedURL);
}

function dailyFact(event) {
  event.preventDefault();
  var searchInputVal = $("#daily-input").val();

  if (!searchInputVal) return;

  var updatedURL = baseURL + "?q=" + searchInputVal + "&daily=true";

  location.assign(updatedURL);
}

function surpriseFact(event) {
  event.preventDefault();

  location.assign("search-results.html");
}

factBtn.click(getFact);

var recentSearches = [];

function renderSearches() {
  for (var i = 0; i < recentSearches.length; i++) {
    var recentSearch = recentSearches[i];
    var li = document.createElement("li");
    li.textContent = recentSearches;
    li.setAttribute("data-index", i);

    recentSearches.appendChild(li);
  }
}

function init() {
  var storedSearches = JSon.parse(localStorage.getItem ("recentSearches"));
  
}

var recentSearches = [];

function renderSearches() {
  for (var i = 0; i < recentSearches.length; i++) {
    var recentSearch = recentSearches[i];
    var li = document.createElement("li");
    li.textContent = recentSearches;
    li.setAttribute("data-index", i);

    recentSearches.appendChild(li);
  }
}

function init() {
  var storedSearches = JSon.parse(localStorage.getItem ("recentSearches"));
  
}