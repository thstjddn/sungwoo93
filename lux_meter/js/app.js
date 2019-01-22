window.addEventListener("devicelight", function (event) {
    // Getting lux
    var luminosity = event.value;
    console.log(luminosity + "lx");
});
