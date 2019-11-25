/* Makes API connection and stores the JSON info into LocalStorage */
/*
var xmlhttp;
if (window.XMLHttpRequest){
    xmlhttp = new XMLHttpRequest();
} else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var jsondata = JSON.parse(xmlhttp.responseText); //retrieve result as a JavaScript object
        
        var games_serialized = JSON.stringify(jsondata);

        localStorage.setItem('gamesStored', games_serialized);
                    
    }
}
xmlhttp.open("GET","https://api.footystats.org/league-matches?key=example&league_id=2012",true);
xmlhttp.send();
*/

/* Functioms */

function getGamesList(){    

    /* Saving requests*/
    /*
    var url = 'https://api.football-data.org/v2/teams/65/';
    var xmlhttp = window.XMLHttpRequest
        ? new XMLHttpRequest()
        : new ActiveXObject("Microsoft.XMLHTTP");

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var jsondata = JSON.parse(xmlhttp.responseText);
            var footData  = JSON.stringify(jsondata);    

            localStorage.setItem('manCityTeam', footData);
        }
    }

    xmlhttp.open('GET', url);
    xmlhttp.setRequestHeader("X-Auth-Token", "383412449bc94f34bccb709be3b40dd3");
    xmlhttp.send();
    */

    var team_deserialized = JSON.parse(localStorage.getItem('manCityTeam'));

    var squad = team_deserialized.squad;
    
    var output = '';
    for (i = 0; i < squad.length; i++) {
        var player = squad.i;
        for (var key in player) {
            if (player.hasOwnProperty(key)) {
                output += '<p>' + key + " -> " + player[key] + '</p>';
            }
        }
    }

    
    /* Listing keys of the oject 
    for (var key in players) {
        if (players.hasOwnProperty(key)) {
            output += '<p>' + key + " -> " + players[key] + '</p>';
        }
    }
    */
    
    
    document.getElementById("player-name").innerHTML=output;
}

const showPlayerButton = document.querySelector("#show-player");

showPlayerButton.addEventListener("click", getGamesList);
