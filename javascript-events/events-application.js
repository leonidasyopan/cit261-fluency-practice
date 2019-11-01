/* Lateral Menu handling application */ 

// Set variables for the elements of the menu
const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".menu");
let menuStatus = false;

menu.style.marginLeft = "-300px";

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
        menu.style.marginLeft = "-300px";
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
    var output = "<p>Mouse Hovering events</p>";
    eventsPlaceholder.innerHTML = output;
}

hoverEvents.addEventListener("click", loadHoverEvents);
hoverEvents.addEventListener("click", stopDefAction);

/* Media events */

const mediaEvents = document.querySelector("#event-media");

function loadMediaEvents() {
    var output = "";
    output += '<video id="video-box" width="320" height="240" controls onpause="pauseMessage()" onplay="playMessage()">';
    output += '<source src="neymar-goal.mp4" type="video/mp4">';
    output += 'Your browser does not support the video tag.';
    output += '</video>';
    output += '<p id="video-message"></p>'

    eventsPlaceholder.innerHTML = output;
}

const videoMessage = document.querySelector("#video-message");

function pauseMessage() {
    var output =  "The video is paused.";
    videoMessage.innerHTML = output;
}

function playMessage() {
    var output =  "The video is palying.";
    videoMessage.innerHTML = output;
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