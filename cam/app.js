
window.onload = function () {
    var video = document.querySelector("#videoElement");

    if (navigator.mediaDevices.getUserMedia) {       
        navigator.mediaDevices.getUserMedia({video: true})
    .then(function(stream) {
        video.srcObject = stream;
    })
    .catch(function(err) {
        console.log("Something went wrong!");
    });
    }
}

