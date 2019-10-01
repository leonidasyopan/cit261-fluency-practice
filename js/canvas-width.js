var canvas1 = document.getElementById('firstCanvas');
var canvas2 = document.getElementById('secondCanvas');

var c1 = canvas1.getContext('2d');
var c2 = canvas2.getContext('2d');

// First Wave
c1.beginPath();
for ( var i=1; i <= 50 ; i++) {
    var x = i * 5;
    var y = 130;
    var z = 20;           
    c1.moveTo(x, y);
    x += 5;
    c1.lineTo(x, z);
    x += 5;
    c1.lineTo(x, y);
    c1.strokeStyle = "#2980B9";
    c1.stroke();
}

// Second Wave
c2.beginPath();
for ( var i=1; i <= 50 ; i++) {
    var x = i * 5;
    var y = 20;
    var z = 130;           
    c2.moveTo(x, y);
    x += 5;
    c2.lineTo(x, z);
    x += 5;
    c2.lineTo(x, y);
    c2.strokeStyle = "#3498DB";
    c2.stroke();
}

