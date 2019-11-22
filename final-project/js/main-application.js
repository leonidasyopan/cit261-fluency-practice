/* Makes API connection and stores the JSON info into LocalStorage */
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
xmlhttp.open("GET","https://api.football-data.org/v2/competitions/2019/standings",true,"383412449bc94f34bccb709be3b40dd3");
xmlhttp.send();


/* Functioms */

function getGamesList(){    

    var games_deserialized = JSON.parse(localStorage.getItem('gamesStored'));

    var games = games_deserialized.games;

    var output = '';
    output += '<p>' + games[i].name + '</p>';    
    
    document.getElementById("game-name").innerHTML=output;
}