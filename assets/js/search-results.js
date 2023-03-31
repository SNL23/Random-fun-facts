var testUrl = "https://uselessfacts.jsph.pl/api/v2/facts/random";

var factText = $("#fact");

let gif = $("#content").children("img");
let gifSearch = "http://api.giphy.com/v1/gifs/search"
let gifTranslate = "http://api.giphy.com/v1/gifs/translate"
let linkToGif = ""

let searchParams = {
  q: "test",
  limit: "1",
  lang: "en",
  rating: "pg",
  offset: "0", //this should be randomized from 0 - to something like 25 to keep it showing different images
  apiKey: "vnyyyr1M9Ye4oNnTikmlRcD22yX1SnYZ",
  apiBackup: "7TGNfg5rsSaLDQHtArlclVZcQiRLmsFp"
}

let translateParams = {
  string: "test",
  weirdness: "10", //scale from 0 - 10
  apiKey: "vnyyyr1M9Ye4oNnTikmlRcD22yX1SnYZ",
  apiBackup: "7TGNfg5rsSaLDQHtArlclVZcQiRLmsFp"
}

// function sends a fetch request to get the gif image and display the link
const getGif = function () {
  //builds the api parameters for the gif api
  gifSearch = gifSearch + "?api_key=" + searchParams.apiKey + "&q=" + searchParams.q + "&limit=1&lang=eng&rating=pg&offset=0&"
  fetch(gifSearch)
    .then(function (response) {
      response.json()
        .then(function (data) {

          //pull the gif url from the data and append to the content section
          linkToGif = data.data[0].url
          let link = document.createElement("p")
          document.querySelector("#content").appendChild(link)
          link.innerText = linkToGif
          console.log(linkToGif)
        })
    })
}

var getFact = function () {
  fetch(testUrl).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        factText.text(data.text);
      });
    }
  });
  getGif()
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