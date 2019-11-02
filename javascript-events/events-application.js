/* Lateral Menu handling application */ 

// Set variables for the elements of the menu
const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".menu");
let menuStatus = false;

menu.style.marginLeft = "-280px";

function stopDefAction(evt) {
    evt.preventDefault();
}

// Function for toggling the menu in or out 
function menuToggle() {    
    if(menuStatus == false) {
        menu.style.marginLeft = "0px";
        menu.style.transitionProperty = "margin";
        menu.style.transitionDuration = "500ms";
        menuStatus = true;
    } else {
        menu.style.marginLeft = "-280px";
        menuStatus = false;
    }
}

menuButton.addEventListener("click", menuToggle);
menuButton.addEventListener("click", stopDefAction);

/* General Elements and Functions */ 

const eventsPlaceholder = document.querySelector("#events-placeholder");

/* Mouse Hovering events */

const hoverEvents = document.querySelector("#event-hover");

function loadHoverEvents() {
    var output = '';
    output += '<h2 class="please-hover">Please, hover over the boxes.</h2>';
    output += '<h3 class="please-hover">Every time they will have different heights and take a different amount of time to transit.</h3>';
    output += '<div id="squares-container">';
    output += '<div class ="colored-square" id="red-square" onmouseover="squareOut(this)" onmouseout="squareBack(this)"></div>';
    output += '<div class ="colored-square" id="blue-square" onmouseover="squareOut(this)" onmouseout="squareBack(this)"></div>';
    output += '<div class ="colored-square" id="green-square" onmouseover="squareOut(this)" onmouseout="squareBack(this)"></div>';
    output += '<div class ="colored-square" id="purple-square" onmouseover="squareOut(this)" onmouseout="squareBack(this)"></div>';
    output += '<div class ="colored-square" id="yellow-square" onmouseover="squareOut(this)" onmouseout="squareBack(this)"></div>';
    output += '</div>';

    eventsPlaceholder.innerHTML = output;
}

hoverEvents.addEventListener("click", loadHoverEvents);
hoverEvents.addEventListener("click", stopDefAction);

function squareOut(x) {
    var height = Math.floor(Math.random() * 500);
    var time = Math.floor(Math.random() * 2000);
    x.style.height = height + "px";
    x.style.transitionProperty = "height";
    x.style.transitionDuration = time + "ms";   
}

function squareBack(x) {
    var time = Math.floor(Math.random() * 2000);
    x.style.height = "50px";
    x.style.transitionProperty = "height";
    x.style.transitionDuration = time + "ms";
}

/* Media events */

const mediaEvents = document.querySelector("#event-media");

function loadMediaEvents() {
    var output = "";
    output += '<video id="video-box" autoplay loop controls onpause="pauseMessage()" onplay="playMessage()">';
    output += '<source src="neymar-goal.mp4" type="video/mp4">';
    output += 'Your browser does not support the video tag.';
    output += '</video>';
    output += '<div id="video-message">Play the video.</div>'

    eventsPlaceholder.innerHTML = output;
}

function pauseMessage() {
    var output =  "<p>The video is paused.</p>";
    document.querySelector("#video-message").innerHTML = output;
}

function playMessage() {
    var output =  "<p>The video is playing.</p>";
    document.querySelector("#video-message").innerHTML = output;
}

mediaEvents.addEventListener("click", loadMediaEvents);
mediaEvents.addEventListener("click", stopDefAction);


/* Focus and Blur events */

const focusEvents = document.querySelector("#event-focus");

function loadFocusEvents() {
    var output = "<p>Focus and Blur events</p>";
    eventsPlaceholder.innerHTML = output;
}

focusEvents.addEventListener("click", loadFocusEvents);
focusEvents.addEventListener("click", stopDefAction);


/* Keyboard events */

const keyboardEvents = document.querySelector("#event-keyboard");

function loadKeyboardEvents() {
    var output = "<p>Keyboard events</p>";
    eventsPlaceholder.innerHTML = output;
}

keyboardEvents.addEventListener("click", loadKeyboardEvents);
keyboardEvents.addEventListener("click", stopDefAction);