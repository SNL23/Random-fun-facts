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
