const head = document.querySelector('header')
const selection = document.querySelector('#form')
// looks for match of screen size min width and calls function when it crosses threshold
const medium = window.matchMedia('(min-width: 770px)');
medium.addEventListener('change', screenHandler);

//sets class attributes of heading elements to make it responsive with Bulma Css
function screenHandler(event) {
    if (event.matches) {
        selection.setAttribute("class", "column mt-1 is-flex is-justify-content-flex-end")
        head.setAttribute("class", "card columns is-flex is-justify-content-flex-end is-flex-direction-row")
    } else {
        selection.setAttribute("class", "column mt-1 is-flex is-justify-content-center ml-2")
        head.setAttribute("class", "card  is-flex is-flex-direction-column is-justify-content-center has-text-centered")
    }
} 