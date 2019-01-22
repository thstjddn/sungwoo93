window.addEventListener("devicelight", handleOrientation, true);

var output = document.querySelector('.output');

function handleOrientation(event){
 // Getting lux
    var luminosity = event.value;
    output.innerHTML = "LX : " + luminosity + "\n";
};

window.addEventListener('devicelight', handleOrientation);