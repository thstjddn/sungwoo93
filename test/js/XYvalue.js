
//x, y의 각도 계산 및 출력하는 js
window.addEventListener("deviceorientation", handleOrientation, true);


var outputx = document.querySelector('.output_x');
var outputy = document.querySelector('.output_y');

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

    
    outputx.innerHTML  = "X :" + x.toFixed(1) + "\n";
    outputy.innerHTML  = "Y :" + y.toFixed(1) + "\n";
}

window.addEventListener('deviceorientation', handleOrientation);