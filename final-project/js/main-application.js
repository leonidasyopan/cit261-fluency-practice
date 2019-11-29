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
    output += '<figure id="my-team-image"><img src="' + premierTeams[i].crestUrl + '" alt="' + premierTeams[i].name + ' Thumb"></figure>';
    output += '<div id="team-data">';
    output += "<p><strong>Founded:</strong> " + premierTeams[i].founded + "</p>";
    output += "<p><strong>Stadium:</strong> " + premierTeams[i].venue + "</p>";
    output += "<p><strong>Website</strong> " + premierTeams[i].website + "</p>";    
    output += '</div>';        

    document.getElementById("team-info").innerHTML=output;
    
    getTeamPlayers(teamId);
}

function getTeamPlayers(team){    
    var teamId = team;
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

        output += '<tr>';
        output += '<td>' + teamInfo[i].name + '</td>';
        output += '<td>' + teamInfo[i].position + '</td>';
        output += '<td>' + teamInfo[i].nationality + '</td>';
        output += '<td>' + playerShirt + '</td>';
        output += '</tr>';
    }    
    output += '</tbody></table>';

    document.getElementById("team-squad").innerHTML=output;

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
    output += '<section>';
    output += '<table id="table-standings"><thead><tr><th>Position</th><th></th><th>Club</th><th>Played</th><th>Won</th><th>Draw</th><th>Lost</th><th>Points</th><th>GD</th></tr></thead><tbody>';
    for (var i=0; i < premierStandings.length; i++){
        output += '<tr>';
        output += '<td>' + premierStandings[i].position + '</td>';
        output += '<td><figure id="figure-standings"><img src="' + premierStandings[i].team.crestUrl + '" alt="' + premierStandings[i].team.name + ' Thumb"></figure></td>';
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
    output += '</section>';    

    document.getElementById("premier-standings").innerHTML=output;
}

function displayMatches() {
    /* Saving requests*/    
    
    var url = 'https://api.football-data.org/v2/competitions/2021/matches?matchday=14';
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
    output += '<section>';
    output += '<table id="table-matches"><thead><tr><th>Home</th><th>Day</th><th>Time</th><th>Away</th></tr></thead><tbody>';
    for (var i=0; i < premierMatches.matches.length; i++){
        /* Convert the time to local time and separate time and day */        
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
    output += '</tbody></table>';
    output += '</section>'

    document.getElementById("current-matches").innerHTML=output;
}


window.addEventListener('DOMContentLoaded', displayStandings, false);
window.addEventListener('DOMContentLoaded', displayMatches, false);
window.addEventListener('DOMContentLoaded', getTeamsList, false);