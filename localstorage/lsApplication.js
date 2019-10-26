/* Creates a simple form bringing the information from the JSON file as a drop list (select list) */
function getGamesList(){
    /* This is a standard XMLHttp Request with a fallout for Miscrosoft Internet Explorer */
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

            var games_deserialized = JSON.parse(localStorage.getItem('gamesStored'));

            var games = games_deserialized.games;

            /* Creates a Form Select element to allow choosing the Game to display the information*/
            var output = '<p id="select-paragraph">Select your game: </p>';
			output += '<form>';
            output +='<select id="games_select" onchange="gamesSelect()" >';
            output += '<option value="choose">Choose Game</option>';
            for (var i=0; i < games.length; i++){
                output += '<option value="'+i+'">'+ games[i].name+'</option>';
            }
			output += '</select>';
            output += '</form>';

            /* Creates a Form Select element to choose which game is to be deleted from list */
            output += '<p id="delete-paragraph">Delete game from list: </p>';
            output += '<form>';
            output +='<select id="game_delete" onchange="gameDelete()">';
            output += '<option value="choose">Choose Game</option>';
            for (var i=0; i < games.length; i++){
                output += '<option value="'+i+'">'+ games[i].name+'</option>';
            }
            output += '</select>';
            output += '</form>';
            
            document.getElementById("game-name").innerHTML=output;
        }
    }
	xmlhttp.open("GET","https://www.boardgameatlas.com/api/search?order_by=popularity&ascending=false&pretty=true&client_id=SB1VGnDv7M",true);
	xmlhttp.send();
}

/* Takes the name of the game from the selection chosen in order to be used to display its info */
function gamesSelect(){
	var selectBox = document.getElementById("games_select");
	var gameIndex = selectBox.options[selectBox.selectedIndex].value;
	getGamesInfo(gameIndex);
}

function gameDelete(){

    var selectBox = document.getElementById("game_delete");    
	var gameIndex = selectBox.options[selectBox.selectedIndex].value;  
    
    // Parseing the Stored info into an Object in order to be edited
    var games_deserialized = JSON.parse(localStorage.getItem('gamesStored'));

    var games = games_deserialized.games;

    games.splice(Number(gameIndex), 1);        

    // Stringfying the Object again so it can be stored back into LocalStorage
    var newGames = JSON.stringify(games_deserialized);

    // Storing back into LocalStorage
    localStorage.setItem('gamesStored', newGames);
    
}

/* Displays the whole info brought from LocalStorge */
function getGamesInfo(i){

    var games_deserialized = JSON.parse(localStorage.getItem('gamesStored'));

    var games = games_deserialized.games;
    
    var output = '';
    output += "<h2>" + games[i].name + "</h2>";    
    output += '<img src="' + games[i].images.medium + '" alt="' + games[i].name + ' Thumb">';
    output += '<div id="game-information">';
    output += '<div id="game-data">';
    output += "<p><strong>Year Published:</strong> " + games[i].year_published + "</p>";
    output += "<p><strong>Number of Players:</strong> " + games[i].min_players + " to " + games[i].max_players + "</p>";
    output += "<p><strong>Play Time:</strong> " + games[i].min_playtime + " to " + games[i].max_playtime + " minutes</p>";
    output += "<p><strong>Recommended Age:</strong> " + games[i].min_age + "</p>";
    output += "<p><strong>Price:</strong> " + games[i].price + "</p>";
    output += '</div>';
    output += '<div id="game-description">';
    output += "<p><strong>Description:</strong> " + games[i].description + "</p>";
    output += '</div>';
    output += '</div>';

    document.getElementById("game-info").innerHTML=output;

}





