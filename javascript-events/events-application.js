let menuButton = document.querySelector(".menu-button");

let menu = document.querySelector(".menu");

let menuStatus = false;

menu.style.marginLeft = "-300px";

function stopDefAction(evt) {
    evt.preventDefault();
}

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

menuButton.onclick = menuToggle;

