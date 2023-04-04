var testUrl = "https://uselessfacts.jsph.pl/api/v2/facts/random";

var factText = $("#fact");

let urlPt1 = "http://shibe.online/api/"
let urlPt2 = "?count=1&urls=true&httpsUrls=true"
let dogUrl = ""

// function sends a fetch request to get the gif image and display the link
const getGif = function () {
  // gets user query from url and builds the api parameters for the shibe api
  let queryString = document.location.href
  queryString = queryString.split("=")[1]  //get q value from url
  dogUrl = urlPt1 + queryString + urlPt2
  //fetch request using the gif api url assembled above
  fetch(gifUrl)
    .then(function (response) {
      response.json()
        .then(function (data) {
          //pull the url from the data and set to img src attribute
          console.log(data[0])
          let img = document.querySelector("#img")
          img.setAttribute("src", data[0])
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

//test area for second function clicking h1
let h1 = document.querySelector("h1")
h1.addEventListener("click", function () {
  console.log("yo")
  let img = document.querySelector("#img")
  img.setAttribute("src", linkToGif)
})

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