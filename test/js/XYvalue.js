window.addEventListener("deviceorientation", handleOrientation, true);

function handleOrientation(event) {
    var x = -event.gamma; 
    var y = event.beta; 
  
    output.innerHTML  = "X : " + x + "\n";
    output.innerHTML += "Y : " + y + "\n";

    if (x >  90) { x =  90};
    if (x < -90) { x = -90};
}
window.addEventListener('deviceorientation', handleOrientation);