const contain = document.querySelector('.container')
const cols = document.querySelector('#cols')
const sec1 = document.querySelector('#sec1')
const sec2 = document.querySelector('#sec2')
const sec3 = document.querySelector('#sec3')


// looks for match of screen size min width and calls function when it crosses threshold
const medium = window.matchMedia('(min-width: 1300px)');
medium.addEventListener('change', screenHandler);

//sets class attributes of heading elements to make it responsive with Bulma Css
function screenHandler(event) {
    if (event.matches) {
        contain.setAttribute("class", "columns is-desktop ex-maxheight")
        cols.setAttribute("class", "columns is-desktop is-vcentered ex-maxheight")
        sec1.setAttribute("class", "column is-4-desktop")
        sec2.setAttribute("class", "column is-4-desktop")
        sec3.setAttribute("class", "column is-4-desktop")
        bigger
    } else {
        contain.setAttribute("class", " isflex is-flex-direction-column is-vcentered is-flex-justify-content-center ")
        cols.setAttribute("class", " is-vcentered ex-maxheight")
        sec1.setAttribute("class", "column")
        sec2.setAttribute("class", "column")
        sec3.setAttribute("class", "column")
    }
} 