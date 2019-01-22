window.addEventListener("DeviceLightEvent", light, true);

var output = document.querySelector(".output");

function light(event){
    var luxmeter = event.value;
    
    output.innerHTML = "밝기 : " + luxmeter + "\n";
}