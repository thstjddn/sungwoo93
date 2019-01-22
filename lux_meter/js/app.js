window.addEventListener("DeviceLightEvent", Light, true);

var output = document.querySelector(".output");

function(DeviceLightEvent){
    var Light = DeviceLightEvent.value;
    
    output.innerHTML = "밝기 : " + Light + "\n";
}