var factBtn = $("#search-button");

function getFact(event) {
  event.preventDefault();

  location.assign("search-results.html");
}

factBtn.click(getFact);
