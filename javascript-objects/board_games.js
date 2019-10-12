var game = {
  gameName:         "Risk",
  releaseYear:      1959,
  numberOfPlayers:  "2 to 6 Players",
  playingTime:      "120 minutes",
  imageUrl:         "img/risk.jpg",
  displayGame : function() {
    var result = "";

    result += "<h2>" + this.gameName + "</h2>";    
    result += '<img src="' + this.imageUrl + '" alt="' + this.gameName + ' Image">';
    result += "<p><strong>Release Year:</strong> " + this.releaseYear + "</p>";
    result += "<p><strong>Playing Time:</strong> " + this.playingTime + "</p>";
    result += "<p><strong>Number of Players:</strong> " + this.numberOfPlayers + "</p>";    

    return result;
  }
};

document.getElementById("game-info").innerHTML = game.displayGame();

