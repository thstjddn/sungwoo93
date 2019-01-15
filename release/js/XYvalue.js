window.addEventListener("deviceorientation", handleOrientation, true);


var output = document.querySelector('.output');

function handleOrientation(event) {
  var x = -(event.gamma);  // In degree in the range [-180,180]
  var y = event.beta; // In degree in the range [-90,90]
  
  output.innerHTML  = "X : " + x.toFixed(1) + "\n";
  output.innerHTML += "Y : " + y.toFixed(1) + "\n";

  // Because we don't want to have the device upside down
  // We constrain the x value to the range [-90,90]
  if (x >  90) { x =  90};
  if (x < -90) { x = -90};

}

window.addEventListener('deviceorientation', handleOrientation);