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
    var url = 'https://api.football-data.org/v2/competitions/2021/teams/';
    var xmlhttp = window.XMLHttpRequest
        ? new XMLHttpRequest()
        : new ActiveXObject("Microsoft.XMLHTTP");

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var jsondata = JSON.parse(xmlhttp.responseText);
            var footData  = JSON.stringify(jsondata);    

            localStorage.setItem('PremierTeams', footData);
        }
    }

    xmlhttp.open('GET', url);
    xmlhttp.setRequestHeader("X-Auth-Token", "383412449bc94f34bccb709be3b40dd3");
    xmlhttp.send();
    

    var teams_deserialized = JSON.parse(localStorage.getItem('PremierTeams'));

    var premierTeams = teams_deserialized.teams;

    var manCity = premierTeams[5];
    
    var output = '';
    for (var key in manCity) {
        if (manCity.hasOwnProperty(key)) {
            output += '<p>' + key + " -> " + manCity[key] + '</p>';
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
