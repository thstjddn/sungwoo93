window.addEventListener("deviceorientation", handleOrientation, true);


var output = document.querySelector('.output');
var output1 = document.querySelector('.output1');
var output2 = document.querySelector('.output2');

function handleOrientation(event) {
    var x = -(event.gamma);  // In degree in the range [-180,180]
    var y = event.beta; // In degree in the range [-90,90]
    var z = event.alpha;

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

    // if (z < 30 || z>350) {
    //   y = -180 - y;
    // }

    
    output.innerHTML  = "X :" + x.toFixed(1) + "\n";
    output1.innerHTML  = "Y :" + y.toFixed(1) + "\n";
    // output2.innerHTML = "Z :" + z + "\n";

    // Because we don't want to have the device upside down
    // We constrain the x value to the range [-90,90]


}

window.addEventListener('deviceorientation', handleOrientation);