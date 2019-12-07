/* Functions */

/* Changing Tabs */
function openTab(evt, tabName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("app-page");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active-red", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active-red";
}

function getTeamsList(){    

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
    
    /* Creates a Form Select element to allow choosing the Team to display the information */
    var output = '';
    output = '<div id="choose-team-div">';    
    output += '<form>';
    output +='<select id="team_select" onchange="teamSelect()" >';
    output += '<option value="choose">Choose Game</option>';
    for (var i=0; i < premierTeams.length; i++){
        output += '<option value="'+i+'">'+ premierTeams[i].name+'</option>';
    }
    output += '</select>';
    output += '</form>';
    output += '</div>';
    
    document.getElementById("teams-list").innerHTML=output;
    buttonONbuttonOff();
}

/* Takes the name of the team from the selection chosen in order to be used to display its info */
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

    var teamId = premierTeams[i].id;
    
    /* Create a div to hold all the info of the Selected team */
    var output = '';    
    output += "<h2>" + premierTeams[i].name + "</h2>";    
    output += '<figure class="my-team-image"><img src="' + premierTeams[i].crestUrl + '" alt="' + premierTeams[i].name + ' Thumb"></figure>';
    output += '<div id="team-data">';
    output += "<p><strong>Founded:</strong> " + premierTeams[i].founded + "</p>";
    output += "<p><strong>Stadium:</strong> " + premierTeams[i].venue + "</p>";
    output += "<p><strong>Website</strong> " + premierTeams[i].website + "</p>";    
    output += '</div>';        

    document.getElementById("team-info").innerHTML=output;

    var showSquadTable = document.querySelector("#show-squad-table");

    showSquadTable.setAttribute("class", "");

    showSquadTable.classList.add(teamId);        
    
    buttonONbuttonOff();
    runTeamPlayersBeforeShow();
    
    document.getElementById("team-squad").innerHTML = " ";
}

/* Hides or Shows Team Information button */
function buttonONbuttonOff() {
    var showSquadTable = document.querySelector("#show-squad-table");
    var teamInfoDiv = document.querySelector("#team-info");
    // var cleanSquadButton = teamInfoDiv.innerHTML.trim();
    if (teamInfoDiv.hasChildNodes()) {
        showSquadTable.style.display = "block";
    } else {
        showSquadTable.style.display = "none";
    }
}

function runTeamPlayersBeforeShow() {
    var teamId = document.querySelector("#show-squad-table").classList[0];
    var url = 'https://api.football-data.org/v2/teams/' + teamId + '/' ;
    var xmlhttp = window.XMLHttpRequest
        ? new XMLHttpRequest()
        : new ActiveXObject("Microsoft.XMLHTTP");

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var jsondata = JSON.parse(xmlhttp.responseText);
            var footData  = JSON.stringify(jsondata);    

            localStorage.setItem('teamInformation', footData);
        }
        
    }

    xmlhttp.open('GET', url);
    xmlhttp.setRequestHeader("X-Auth-Token", "383412449bc94f34bccb709be3b40dd3");
    xmlhttp.send();      

    var standings_deserialized = JSON.parse(localStorage.getItem('teamInformation'));

    var teamInfo = standings_deserialized.squad;  
}

function getTeamPlayers(){
    var teamId = document.querySelector("#show-squad-table").classList[0];
    var url = 'https://api.football-data.org/v2/teams/' + teamId + '/' ;
    var xmlhttp = window.XMLHttpRequest
        ? new XMLHttpRequest()
        : new ActiveXObject("Microsoft.XMLHTTP");

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var jsondata = JSON.parse(xmlhttp.responseText);
            var footData  = JSON.stringify(jsondata);    

            localStorage.setItem('teamInformation', footData);
        }
        
    }

    xmlhttp.open('GET', url);
    xmlhttp.setRequestHeader("X-Auth-Token", "383412449bc94f34bccb709be3b40dd3");
    xmlhttp.send();      

    var standings_deserialized = JSON.parse(localStorage.getItem('teamInformation'));

    var teamInfo = standings_deserialized.squad;  

    /* Create a div to hold all the info of the players of the selected team */
    var output = '';
    output += '<section>';
    output += '<h3>Team Squad</h3>'
    output += '<table id="table-squad"><thead><tr><th>Player Name</th><th>Position</th><th>Nationality</th><th>Shirt Number</th></tr></thead><tbody>';
    for (var i=0; i < teamInfo.length; i++){
        var playerShirt = teamInfo[i].shirtNumber;
        if( playerShirt === null ) {
            playerShirt = "N/A"
        } else {
            playerShirt = teamInfo[i].shirtNumber;
        }

        var playerNationality = teamInfo[i].nationality;
        var playerNationalityURL = playerNationality.replace(/\s+/g, '-').toLowerCase();

        output += '<tr>';
        output += '<td>' + teamInfo[i].name + '</td>';
        output += '<td>' + teamInfo[i].position + '</td>';
        output += '<td>' + '<figure class="player-nationality-image"><img src="img/country-flags/' + playerNationalityURL + '.svg" alt="' + playerNationality + '"></figure>'; + '</td>';
        output += '<td>' + playerShirt + '</td>';
        output += '</tr>';
    }    
    output += '</tbody></table>';

    document.getElementById("team-squad").innerHTML=output;

}

function slideShieldOn() {
    const myTeamImage = document.querySelector(".my-team-image");
    myTeamImage.style.marginLeft = "-400px";

    const teamDataDiv = document.querySelector("#team-data");
    teamDataDiv.style.opacity = "0";
    // teamDataDiv.classList.add("animate-team-data");
}

function slideShieldOut() {
    const myTeamImage = document.querySelector(".my-team-image");
    myTeamImage.style.marginLeft = "0";

    const teamDataDiv = document.querySelector("#team-data");
    teamDataDiv.style.opacity = "1";
}

function displayStandings() {
    /* Saving requests*/    
    
    var url = 'https://api.football-data.org/v2/competitions/2021/standings/';
    var xmlhttp = window.XMLHttpRequest
        ? new XMLHttpRequest()
        : new ActiveXObject("Microsoft.XMLHTTP");

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var jsondata = JSON.parse(xmlhttp.responseText);
            var footData  = JSON.stringify(jsondata);    

            localStorage.setItem('PremierStandings', footData);
        }
    }

    xmlhttp.open('GET', url);
    xmlhttp.setRequestHeader("X-Auth-Token", "383412449bc94f34bccb709be3b40dd3");
    xmlhttp.send();
    

    var standings_deserialized = JSON.parse(localStorage.getItem('PremierStandings'));

    var premierStandings = standings_deserialized.standings[0].table;    

    var output = ''; 
    output += '<h2>Premier League Standings</h2>'
    output += '<section>';
    output += '<table id="table-standings"><thead><tr><th>#</th><th></th><th>Club</th><th> P </th><th> W </th><th> D </th><th> L </th><th>Pts</th><th>GD</th></tr></thead><tbody>';
    for (var i=0; i < premierStandings.length; i++){
        output += '<tr>';
        output += '<td>' + premierStandings[i].position + '</td>';
        output += '<td><figure class="figure-standings"><img src="' + premierStandings[i].team.crestUrl + '" alt="' + premierStandings[i].team.name + ' Thumb"></figure></td>';
        output += '<td>' + premierStandings[i].team.name +  '</td>';
        output += '<td>' + premierStandings[i].playedGames + '</td>';
        output += '<td>' + premierStandings[i].won + '</td>';
        output += '<td>' + premierStandings[i].draw + '</td>';
        output += '<td>' + premierStandings[i].lost + '</td>';
        output += '<td>' + premierStandings[i].points + '</td>';
        output += '<td>' + premierStandings[i].goalDifference + '</td>';
        output += '</tr>';
    }    
    output += '</tbody></table>';
    output += '<p id="legends"><strong>P</strong> = Played, <strong>W</strong> = Won, <strong>D</strong> = Draw, <strong>L</strong> = Lost, <strong>Pts</strong> = Points</p>';
    output += '</section>';    

    document.getElementById("premier-standings").innerHTML=output;
}

function displayMatches() {
    /* Saving requests*/    
    
    var url = 'https://api.football-data.org/v2/competitions/2021/matches?matchday=15';
    var xmlhttp = window.XMLHttpRequest
        ? new XMLHttpRequest()
        : new ActiveXObject("Microsoft.XMLHTTP");

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var jsondata = JSON.parse(xmlhttp.responseText);
            var footData  = JSON.stringify(jsondata);    

            localStorage.setItem('PremierMatches', footData);
        }
    }

    xmlhttp.open('GET', url);
    xmlhttp.setRequestHeader("X-Auth-Token", "383412449bc94f34bccb709be3b40dd3");
    xmlhttp.send();
    

    var matches_deserialized = JSON.parse(localStorage.getItem('PremierMatches'));

    var premierMatches = matches_deserialized; 

    var output = ''; 
    output += '<h2>Matchday 15</h2>'
    output += '<section>';

    var teams_deserialized = JSON.parse(localStorage.getItem('PremierTeams'));

    var premierTeams = teams_deserialized.teams;
    
    output += '<table id="table-matches"><thead><tr><th>Date/Time</th><th>Home</th><th></th><th>X</th><th></th><th>Away</th></tr></thead><tbody>';
    for (var i=0; i < premierMatches.matches.length; i++){
        // Convert the time to local time and separate time and day       
        var utcDate = premierMatches.matches[i].utcDate;
        var localDate = new Date(utcDate);
        var time = localDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        // var time = localDate.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');

        var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][localDate.getMonth()];
        var strDate = month + ' ' + localDate.getDate();

        var awayId = premierMatches.matches[i].awayTeam.id;
        var homeId = premierMatches.matches[i].homeTeam.id;
        var awayURL = '';
        var homeURL = '';


        for(let i = 0; i < premierTeams.length; i++){
            if(premierTeams[i].id == awayId) {
                awayURL = premierTeams[i].crestUrl;
            } else if (premierTeams[i].id == homeId) {
                homeURL = premierTeams[i].crestUrl;
            }
        }
        
        output += '<tr>';
        output += '<td>' + strDate + ' at ' + time + '</td>';
        output += '<td>' + premierMatches.matches[i].homeTeam.name + '</td>';
        output += '<td><figure class="figure-matches"><img src="' + homeURL + '" alt="' + premierTeams.name + ' Thumb"></figure></td>';
        output += '<td> X </td>';
        output += '<td><figure class="figure-matches"><img src="' + awayURL + '" alt="' + premierTeams.name + ' Thumb"></figure></td>';            
        output += '<td>' + premierMatches.matches[i].awayTeam.name + '</td>';     
        output += '</tr>';
    }

    
/*
    output += '<table id="table-matches"><thead><tr><th>Home</th><th>Day</th><th>Time</th><th>Away</th></tr></thead><tbody>';
    for (var i=0; i < premierMatches.matches.length; i++){
        // Convert the time to local time and separate time and day       
        var utcDate = premierMatches.matches[i].utcDate;
        var localDate = new Date(utcDate);
        var time = localDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        // var time = localDate.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');

        var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][localDate.getMonth()];
        var strDate = month + ' ' + localDate.getDate();
        
        output += '<tr>';
        output += '<td>' + premierMatches.matches[i].awayTeam.name + '</td>';
        output += '<td>' + strDate +  '</td>';
        output += '<td>' + time + '</td>';
        output += '<td>' + premierMatches.matches[i].homeTeam.name + '</td>';     
        output += '</tr>';
    }    
*/
    output += '</tbody></table>';
    output += '</section>'

    document.getElementById("current-matches").innerHTML=output;
}


window.addEventListener('DOMContentLoaded', displayStandings, false);
window.addEventListener('DOMContentLoaded', displayMatches, false);
window.addEventListener('DOMContentLoaded', getTeamsList, false);

const teamInfoDiv = document.querySelector("#team-info");

teamInfoDiv.addEventListener('mouseover', slideShieldOn)
teamInfoDiv.addEventListener('mouseout', slideShieldOut)