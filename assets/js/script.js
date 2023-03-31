var factBtn = $("#search-button");

function getFact(event) {
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