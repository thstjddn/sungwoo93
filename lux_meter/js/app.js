window.addEventListener("devicelight", handleOrientation, true);

function handleOrientation(event){
 // Getting lux
    var luminosity = event.value;
    alert(luminosity);
};
   