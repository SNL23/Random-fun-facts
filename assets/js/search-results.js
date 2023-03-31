var testUrl = "https://uselessfacts.jsph.pl/api/v2/facts/random";

var factText = $("#fact");

let gif = $("#content").children("img");
let gifSearch = "http://api.giphy.com/v1/gifs/search"
let gifTrending = "http://api.giphy.com/v1/gifs/trending"
let gifUrl = ""
let linkToGif = ""

let trendingParams = {
  offset: 0,
  apiKey: "vnyyyr1M9Ye4oNnTikmlRcD22yX1SnYZ",
  apiBackup: "7TGNfg5rsSaLDQHtArlclVZcQiRLmsFp"
}

let searchParams = {
  q: "test",
  offset: "0",
  apiKey: "vnyyyr1M9Ye4oNnTikmlRcD22yX1SnYZ",
  apiBackup: "7TGNfg5rsSaLDQHtArlclVZcQiRLmsFp"
}


// function sends a fetch request to get the gif image and display the link
const getGif = function () {
  //gets user query from url and builds the api parameters for the gif api
  let queryString = document.location.href
  queryString = queryString.split("=")[1].split("&")[0]  //get q value from url
  //conditional statement to use the gif api with trending or search endpoints
  if (queryString === "surprise") {
    //use the trending endpoint
    trendingParams.offset = Math.floor(100 * Math.random()) //randomize result index
    gifUrl = gifTrending + "?api_key=" + trendingParams.apiKey + "&limit=1&offset=" + trendingParams.offset + "&rating=pg"
    console.log("surprise me - execute trending api instead of search api")
  } else {
    // use the search endpoint
    searchParams.offset = Math.floor(100 * Math.random()) //randomize result index
    searchParams.q = queryString
    gifUrl = gifSearch + "?api_key=" + searchParams.apiKey + "&q=" + searchParams.q + "&limit=1&lang=eng&rating=pg&offset=" + searchParams.offset
  }
  //fetch request using the gif api url assembled above
  fetch(gifUrl)
    .then(function (response) {
      response.json()
        .then(function (data) {
          //pull the gif url from the data and append to the content section
          linkToGif = data.data[0].url
          let link = document.createElement("p")
          document.querySelector("#content").appendChild(link)
          link.innerText = linkToGif
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

    search - list.appendChild(li);
  }
}

function init() {
  var storedSearches = JSon.parse(localStorage.getItem("recentSearches"));

  renderSearches();
}

console.log(recentSearches);