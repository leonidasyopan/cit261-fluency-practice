/* Functions */

function getTeamsList(){    

    /* Saving requests*/
    /*
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
    */

    var teams_deserialized = JSON.parse(localStorage.getItem('PremierTeams'));

    var premierTeams = teams_deserialized.teams;    
    
    /* Creates a Form Select element to allow choosing the Team to display the information */
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
    /*
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
    */

    var teams_deserialized = JSON.parse(localStorage.getItem('PremierTeams'));

    var premierTeams = teams_deserialized.teams;
    
    /* Create a div to hold all the info of the Selected team */
    var output = '';
    output += "<h2>" + premierTeams[i].name + "</h2>";    
    output += '<figure><img src="' + premierTeams[i].crestUrl + '" alt="' + premierTeams[i].name + ' Thumb"></figure>';
    output += '<div id="team-data">';
    output += "<p><strong>Founded:</strong> " + premierTeams[i].founded + "</p>";
    output += "<p><strong>Stadium:</strong> " + premierTeams[i].venue + "</p>";
    output += "<p><strong>Website</strong> " + premierTeams[i].website + "</p>";    
    output += '</div>';    

    document.getElementById("team-info").innerHTML=output;

}

function displayStandings() {
    /* Saving requests*/    
    /*
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
    */

    var standings_deserialized = JSON.parse(localStorage.getItem('PremierStandings'));

    var premierStandings = standings_deserialized.standings[0].table;    

    var output = '';

    /*
    for (var key in premierStandings) {
        if (premierStandings.hasOwnProperty(key)) {
            output += '<p>' + key + " -> " + premierStandings[key] + '</p>';
        }
    }


    for (var i=0; i < premierStandings.length; i++){
        output += '<p>' + premierStandings[i].position + '</p>';
        output += '<p>' + premierStandings[i].team.name + '</p>';
        output += '<p>' + premierStandings[i].playedGames + '</p>';
        output += '<p>' + premierStandings[i].points + '</p>';
        output += '<p>' + premierStandings[i].goalDifference + '</p>';
    }
    */
    
    
    output += '<section>';

    output += '<table><thead><tr><th>Position</th><th></th><th>Club</th><th>Played</th><th>Won</th><th>Draw</th><th>Lost</th><th>Points</th><th>GD</th></tr></thead><tbody>';
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

const showStandings = document.querySelector("#show-standings");

showStandings.addEventListener("click", displayStandings);