var factBtn = $("#search-button");
var dailyBtn = $("#daily-button");
var randomBtn = $("#random-button");
var baseURL = "./search-results.html";
const contain = document.querySelector('.container')
const cols = document.querySelector('#cols')
const sec1 = document.querySelector('#sec1')
const sec2 = document.querySelector('#sec2')
const sec3 = document.querySelector('#sec3')


// looks for match of screen size min width and calls function when it crosses threshold
const medium = window.matchMedia('(min-width: 1300px)');
medium.addEventListener('change', screenHandler);

//sets class attributes of heading elements to make it responsive with Bulma Css
function screenHandler(event) {
  if (event.matches) {
    contain.setAttribute("class", "columns is-desktop ex-maxheight")
    cols.setAttribute("class", "columns is-desktop is-vcentered ex-maxheight")
    sec1.setAttribute("class", "column is-4-desktop")
    sec2.setAttribute("class", "column is-4-desktop")
    sec3.setAttribute("class", "column is-4-desktop")
    bigger
  } else {
    contain.setAttribute("class", " isflex is-flex-direction-column is-vcentered is-flex-justify-content-center ")
    cols.setAttribute("class", " is-vcentered ex-maxheight")
    sec1.setAttribute("class", "column")
    sec2.setAttribute("class", "column")
    sec3.setAttribute("class", "column")
  }
}


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
