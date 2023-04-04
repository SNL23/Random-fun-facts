let newInput = $("#search-button").children().children("input")
let newSearch = ""

document.querySelector("button").addEventListener("click", function (event) {
    event.preventDefault()
    newSearch = newInput.val()
    console.log(newSearch)
    console.log(event.target)
    if (event.target = "button") {
        console.log("buton")
    }
})