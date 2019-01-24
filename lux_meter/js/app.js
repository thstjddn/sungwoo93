if("ondevicelight" in window) 
{
   // API supported.
   window.addEventListener("devicelight", function(event) {
        //light level is returned in lux unit.
        console.log("The current level of ambient light is " + event.value + " lux");
    });
} 
else 
{
   // API not supported
   console.log("API not supported");
}

if("onlightlevel" in window)
{
    window.addEventListener("lightlevel", function(event) {
        //light value can be dim,normal or bright
        console.log("The type of ambient light available is " + event.value);
    });
}
else
{
    console.log("API not supported");
}