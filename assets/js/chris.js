var factBtn = $("#search-button");

var baseURL = "./search-results.html";

function getFact(event) {
  event.preventDefault();
  var searchInputVal = $("#search-input").val();

  if (!searchInputVal) return;

  var updatedURL = baseURL + "?q=" + searchInputVal + "&daily=false";
  location.assign(updatedURL);
}

factBtn.on("submit", getFact);
