window.addEventListener("deviceorientation", handleOrientation, true);

function handleOrientation(event) {
  var x = event.beta; 
  var y = event.gamma; 

  output.innerHTML  = "beta : " + x + "\n";
  output.innerHTML += "gamma: " + y + "\n";

  if (x >  90) { x =  90};
  if (x < -90) { x = -90};
}
window.addEventListener('deviceorientation', handleOrientation);