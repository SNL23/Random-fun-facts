var factBtn = $("#search-button");
var dailyBtn = $("#daily-button");
var randomBtn = $("#random-button");

function getFact(event) {
  event.preventDefault();

  location.assign("search-results.html");
}

factBtn.click(getFact);
dailyBtn.click(getFact);
randomBtn.click(getFact);
