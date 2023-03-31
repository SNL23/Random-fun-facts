var testUrl = "https://uselessfacts.jsph.pl/api/v2/facts/random";

var factText = $("#fact");

var getFact = function () {
  fetch(testUrl).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        factText.text(data.text);
      });
    }
  });
};

getFact();

var recentSearches = [];

function renderSearches() {
  for (var i = 0; i < recentSearches.length; i++) {
    var recentSearch = recentSearches[i];
    var li = document.createElement("li");
    li.textContent = recentSearch;
    li.setAttribute("data-index", i);

    search-list.appendChild(li);
  }
}

function init() {
  var storedSearches = JSon.parse(localStorage.getItem ("recentSearches"));

  renderSearches();
}

console.log(recentSearches);