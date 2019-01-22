window.addEventListener("deviceorientation", handleOrientation, true);


var output = document.querySelector('.output');
var output1 = document.querySelector('.output1');
var output2 = document.querySelector('.output2');

function handleOrientation(event) {
    var x = -(event.gamma); 
    var y = event.beta; 

    if(x > 90){
      x = 90;
      y = 180-y;
    };
    if(x < -90){
       x = -90;
       y = 180-y;
    };

    if(y < -90){
      x = -x;
    };
    if (y > 90){
      x = -x;
    };

    
    output.innerHTML  = "X :" + x.toFixed(1) + "\n";
    output1.innerHTML  = "Y :" + y.toFixed(1) + "\n";
}

window.addEventListener('deviceorientation', handleOrientation);