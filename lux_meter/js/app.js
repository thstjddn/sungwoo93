window.addEventListener("devicelight", function (event) {
    // Getting lux
    var luminosity = event.value;
    alert(luminosity);
});

window.addEventListener('devicelight', function(event) {
    var bodyBg= document.body.style;
    if (event.value < 100) {
          alert('Hey, you! You are working in the Dim environment');
          bodyBg.backgroundColor="lightgrey";
    } else {
          bodyBg.backgroundColor="#fff";
    }
});