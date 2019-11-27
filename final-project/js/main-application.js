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
    
    /* Creates a Form Select element to allow choosing the Game to display the information*/
    var output = '';
    output = '<div id="choose-team-div">';
    output += '<p id="select-paragraph">Select Team: </p>';
    output += '<form>';
    output +='<select id="team_select" onchange="teamSelect()" >';
    output += '<option value="choose">Choose Game</option>';
    for (var i=0; i < premierTeams.length; i++){
        output += '<option value="'+i+'">'+ premierTeams[i].name+'</option>';
    }
    output += '</select>';
    output += '</form>';
    output += '</div>';

    
    /* Listing keys of the oject 
    for (var key in players) {
        if (players.hasOwnProperty(key)) {
            output += '<p>' + key + " -> " + players[key] + '</p>';
        }
    }
    */
    
    
    document.getElementById("teams-list").innerHTML=output;
}

/* Takes the name of the game from the selection chosen in order to be used to display its info */
function teamSelect(){
	var selectBox = document.getElementById("team_select");
	var teamIndex = selectBox.options[selectBox.selectedIndex].value;
	getTeamInfo(teamIndex);
}

function getTeamInfo(i){

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
    
    var output = '';
    output += "<h2>" + premierTeams[i].name + "</h2>";    
    output += '<img src="' + premierTeams[i].crestUrl + '" alt="' + premierTeams[i].name + ' Thumb">';
    output += '<div id="team-data">';
    output += "<p><strong>Founded:</strong> " + premierTeams[i].founded + "</p>";
    output += "<p><strong>Website</strong> " + premierTeams[i].website + "</p>";
    output += '</div>';
    output += '<div id="game-description">';
    output += "<p><strong>Description:</strong> " + premierTeams[i].description + "</p>";
    output += '</div>';
    output += '</div>';

    document.getElementById("team-info").innerHTML=output;

}

// const showPlayerButton = document.querySelector("#show-player");
