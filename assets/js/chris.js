

var storeData = function (){
    var storedFact = {
        fact: factText.text(),
        imageLocation: img.getAttribute("src"),
        animal: animalType,
    }

    if (recentSearches.length > 4) recentSearches.shift()
    recentSearches.push(storedFact);

    localStorage.setItem("recentSearches",JSON.stringify(recentSearches))
    renderSearches();
}
