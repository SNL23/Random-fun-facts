var factBtn = $("#search-button");
var dailyBtn = $("#daily-button");
var randomBtn = $("#random-button");
var baseURL = "./search-results.html";

function getFact(event) {
  event.preventDefault();
  var searchInputVal = $("#search-input").val();

  if (!searchInputVal) return;

  var updatedURL = baseURL + "?q=" + searchInputVal + "&daily=false";
  location.assign(updatedURL);
}

function dailyFact(event) {
  event.preventDefault();
  var dailyInputVal = $("#daily-input").val();

  if (!dailyInputVal) return;

  var updatedURL = baseURL + "?q=" + dailyInputVal + "&daily=true";

  location.assign(updatedURL);
}

function surpriseFact(event) {
  event.preventDefault();

  var animals = ["shibes", "cats", "birds"];

  var randomInput = animals[Math.floor(animals.length * Math.random())];

  var updatedURL = baseURL + "?q=" + randomInput + "&daily=false";

  location.assign(updatedURL);
}

factBtn.on("submit", getFact);
dailyBtn.on("submit", dailyFact);
randomBtn.on("click", surpriseFact);
