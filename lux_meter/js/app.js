window.addEventListener("devicelight", handleOrientation, true);

var output = document.querySelector('.output');

function handleOrientation(event){
 // Getting lux
    var luminosity = event.value;
    output.innerHTML = "LX : " + luminosity + "\n";
};

function init(){
    handleOrientation(event);
}
window.addEventListener('devicelight', handleOrientation);

window.onload = init;