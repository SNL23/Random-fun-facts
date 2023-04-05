var searchList = $("#search-list")

var storeData = function (){
    var storedFact = {
        fact: factInfo,
        imageLocation: imgInfo,
        animal: animalType,
    }

    if (recentSearches.length > 4) recentSearches.shift()
    recentSearches.push(storedFact);

    localStorage.setItem("recentSearches",JSON.stringify(recentSearches))
    renderSearches();
    clickNumber(4);
}

var displayResult = function (event) {
    var item = $(event.target)
    if(item.is("a")){
        var index = 4 - item.parent().index()
        clickNumber(index);
        
    }
}

var clickNumber = function (numberClicked){
    $("#img").attr("src", recentSearches[numberClicked].imageLocation)
    $("#fact").text(recentSearches[numberClicked].fact)
}

searchList.on("click",displayResult)