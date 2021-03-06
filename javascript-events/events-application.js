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
    output += '<h1 class="please-hover">Guess the Height Game</h1>';
    output += '<h2 class="please-hover">Hover over the boxes in order.</h2>';
    output += '<h4 class="please-hover">Every time they will have different heights and take a different amount of time to transit.</h4>';
    output += '<h3 class="please-hover">Which colors will surpass the mark? Which will be the tallest?</h3>';
    output += '<div id="squares-container">';
    output += '<div class ="colored-square" id="red-square" onmouseover="squareOut(this)" onmouseout="squareBack(this)"></div>';
    output += '<div class ="colored-square" id="blue-square" onmouseover="squareOut(this)" onmouseout="squareBack(this)"></div>';
    output += '<div class ="colored-square" id="green-square" onmouseover="squareOut(this)" onmouseout="squareBack(this)"></div>';
    output += '<div class ="colored-square" id="purple-square" onmouseover="squareOut(this)" onmouseout="squareBack(this)"></div>';
    output += '<div class ="colored-square" id="yellow-square" onmouseover="squareOut(this)" onmouseout="squareBack(this)"></div>';
    output += '</div>';
    output += '<hr id="dotted-line">';

    eventsPlaceholder.innerHTML = output;   

    /* Set general properties for the boxes */
    const coloredBoxes = document.querySelectorAll(".colored-square");
    coloredBoxes.forEach(div => {
        div.style.width = "15%";
        div.style.height = "50px";        
    });

    /* Center all the headings */
    const pleaseHover = document.querySelectorAll(".please-hover");
    pleaseHover.forEach(div => {
        div.style.textAlign = "center";
        div.style.marginBottom = "20px";      
    });
    
    /* Set the general CSS properties of the boxes */
    document.querySelector("#squares-container").style.display = 'flex';
    document.querySelector("#squares-container").style.justifyContent = 'space-between';
    document.querySelector("#squares-container").style.marginTop = '40px';
    document.querySelector("#squares-container").style.height = '200px';

    /* Set the CSS color of the boxes */
    document.querySelector("#red-square").style.backgroundColor = '#E74C3C';
    document.querySelector("#blue-square").style.backgroundColor = '#3498DB';
    document.querySelector("#green-square").style.backgroundColor = '#2ECC71';
    document.querySelector("#purple-square").style.backgroundColor = '#B07BC5';
    document.querySelector("#yellow-square").style.backgroundColor = '#F1C40F';

    /* Sets all CSS properties of the dotted line */ 
    document.querySelector("#dotted-line").style.position = 'relative';
    document.querySelector("#dotted-line").style.zIndex = '20';
    document.querySelector("#dotted-line").style.borderTop = '10px dashed red';
}

hoverEvents.addEventListener("click", loadHoverEvents);
hoverEvents.addEventListener("click", stopDefAction);

function squareOut(x) {
    var height = Math.floor(Math.random() * 500);
    var time = Math.floor(Math.random() * 2000);
    x.style.height = height + "px";
    x.style.transitionProperty = "height";
    x.style.transitionDuration = time + "ms";
    
    /* Display height within the box */
    x.innerHTML = height + "px";

    /* Styles the text within the box */
    x.style.textAlign = "center";
    x.style.color = "#ffffff";
    x.style.fontWeight = "bold";
    x.style.padding = "10px";
    x.style.fontSize = "1.5em";
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
    output += '<section id="video-section">';
    output += '<h2>Analyze every detail of this Amazing Goal by Neymar.</h2>';
    output += '<h3>Pause the game at your will.</h3>';
    output += '<video id="video-box" autoplay loop controls onpause="pauseMessage()" onplay="playMessage()">';
    output += '<source src="neymar-goal.mp4" type="video/mp4">';
    output += 'Your browser does not support the video tag.';
    output += '</video>';
    output += '<div id="video-message">Play the video.</div>'
    output += '</section>';

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
    var output = "";
    output += '<section id="subscription-section">';
    output += '<h2>Amazing News Website</h2>';
    output += '<form action="" method="post" id="subscription-form">';
    output += '<fieldset><legend>Subscribe to our news!</legend>';
    output += '<label for="name">Name:</label>';
    output += '<input id="name" type="text" name="name" onfocus="formFocus(this)" onblur="formBlur(this)">';
    output += '<label for="email">E-mail:</label>';
    output += '<input id="email" type="email" name="email" onfocus="formFocus(this)" onblur="formBlur(this)">';
    output += '<input type="submit" value="Subscribe!" id="submit-button">';
    output += '</fieldset></form>';
    output += '</section>';
    output += '<figure><img src="good-job-smiley.png" alt="Good Job Smiley" id="smiley"></figure>';

    eventsPlaceholder.innerHTML = output;

    document.querySelector("#submit-button").addEventListener("click", stopDefAction);
    document.querySelector("#submit-button").addEventListener("click", popUpSmiley);
}

focusEvents.addEventListener("click", loadFocusEvents);
focusEvents.addEventListener("click", stopDefAction);

function popUpSmiley() {
    var smiley = document.getElementById("smiley");
    smiley.classList.add("smiley-animation");
}

function formFocus(x) {
    x.style.backgroundColor = "#AEE8AE";  
}

function formBlur(x) {
    x.style.backgroundColor = "";  
}

/* Keyboard events */

const keyboardEvents = document.querySelector("#event-keyboard");

function loadKeyboardEvents() {
    var output = "";
    output += '<section id="keyboard-section">';
    output += '<h2>Application to Test Keyboard Keys</h2>';
    output += "<p>Inside the box, press any key. If it's working we're going to tell you!</p>";
    output += '<input type="text" size="40" onkeydown="whatKey(event)">';
    output += '<div id="keyResult"></div>'
    output += '</section>';
    
    eventsPlaceholder.innerHTML = output;
}

function whatKey(evt) {
    var x = evt.key;
    document.getElementById("keyResult").innerHTML = 'Your ' + '<span id="keyLook">' + x + '</span> is working fine!';

    if (evt.value >= 1) {
        evt.value = "";
    }
}

keyboardEvents.addEventListener("click", loadKeyboardEvents);
keyboardEvents.addEventListener("click", stopDefAction);