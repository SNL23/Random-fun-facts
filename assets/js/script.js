var factBtn = $("#search-button");
var dailyBtn = $("#daily-button");
var randomBtn = $("#random-button");
var baseURL = "./search-results.html";
const contain = document.querySelector('.container')
const cols = document.querySelector('#cols')
const sec1 = document.querySelector('#sec1')
const sec2 = document.querySelector('#sec2')
const sec3 = document.querySelector('#sec3')
const medium = window.matchMedia('(min-width: 1300px)');

//Applies responsiveness through addition of classes when screen size passes the threshold. Looks for match of screen size min width and calls function when it crosses threshold
medium.addEventListener('change', screenHandler);
//sets class attributes of index page elements to make them responsive with Bulma Css
function screenHandler(event) {
  //when page grows passed 1300px, apply these classes
  if (event.matches) {
    contain.setAttribute("class", "container")
    cols.setAttribute("class", "columns is-desktop is-vcentered ex-maxheight")
    sec1.setAttribute("class", "column is-4-desktop")
    sec2.setAttribute("class", "column is-4-desktop")
    sec3.setAttribute("class", "column is-4-desktop")
    //when page shrinks passed 1300px, apply these classes
  } else {
    contain.setAttribute("class", " isflex is-flex-direction-column is-vcentered is-flex-justify-content-center ")
    cols.setAttribute("class", " is-vcentered ex-maxheight")
    sec1.setAttribute("class", "column")
    sec2.setAttribute("class", "column")
    sec3.setAttribute("class", "column")
  }
}

//Grabs input for the Random Facts search and passes data as parameters into the url for the search results page
function getFact(event) {
  event.preventDefault();
  //Get user input
  var searchInputVal = $("#search-input").val();
  //Update URL with input and daily value
  var updatedURL = baseURL + "?q=" + searchInputVal + "&daily=false";
  // Redirect page with new URL and passed in parameters
  location.assign(updatedURL);
}

//Grabs input for the Fact of the Day search and passes data as parameters into the url for the search results page
function dailyFact(event) {
  event.preventDefault();
  //Get user input
  var dailyInputVal = $("#daily-input").val();
  //Update URL with input and daily value
  var updatedURL = baseURL + "?q=" + dailyInputVal + "&daily=true";
  // Redirect page with new URL and passed in parameters
  location.assign(updatedURL);
}

//Grabs input for the Surprise Me search and passes data as parameters into the url for the search results page
function surpriseFact(event) {
  event.preventDefault();
  //Randomly pick iether dogs, cats, or birds
  var animals = ["shibes", "cats", "birds"];
  var randomInput = animals[Math.floor(animals.length * Math.random())];
  //Update URL with input and daily value
  var updatedURL = baseURL + "?q=" + randomInput + "&daily=false";
  // Redirect page with new URL and passed in parameters
  location.assign(updatedURL);
}

//Event Listener function to call on button click/submit
factBtn.on("submit", getFact);
dailyBtn.on("submit", dailyFact);
randomBtn.on("click", surpriseFact);
