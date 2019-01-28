import {statuslist, inCircleRange,setGlow} from './glowoption.js'
import {outerRadius, innerRadius, centerX_main,centerY_main, setDefaultVariables, setDefaultViews} from './setdefault.js'
    
    var MAX_G = 10, // gravity
        mobileos; 

    window.onload = init;
    
    function init() {
        if (setDefaultEvents() && setDefaultVariables()) {
            setDefaultViews();
        } else {
            setError("DeviceMotion Events API is not supported.");
        }
        mobileos = getMobileOperatingSystem();
    }

    function getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
        if (/windows phone/i.test(userAgent)) {
            return "Windows Phone";
        }
        if (/android/i.test(userAgent)) {
            return "Android";
        }    
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
        }    
        return "unknown";
    }
    
    function setDefaultEvents() {
        document.addEventListener("tizenhwkey", keyEventHandler);
 
        if (window.DeviceMotionEvent) {
            window.addEventListener("devicemotion", onOrientationChange);
        } else {
            return false;
        }
 
        return true;
    }
    
    // if device doesn't have api or can't operate it, replace the error message.
    function emptyElement(elm) {
        while (elm.firstChild) {
            elm.removeChild(elm.firstChild);
        }
        return elm;
    }
    function setError(err) {
        var errorMessage = emptyElement(document.querySelector("#error-message"));
        errorMessage.appendChild(document.createTextNode(err));
    }
    //

    function keyEventHandler(event) {
        if (event.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {
 
            }
        }
    }
    
    //make a ball move
    function onOrientationChange(dataEvent) {
        var noGravitation,
            xDiff,
            yDiff,
            xPos,
            yPos,
            ball_main = document.querySelector("#ball_main"),
            ball_x = document.querySelector("#ball_x"),
            ball_y = document.querySelector("#ball_y");
 
        noGravitation = dataEvent.acceleration;
        dataEvent = dataEvent.accelerationIncludingGravity;
        
        xDiff = dataEvent.x - noGravitation.x;
        if (Math.abs(xDiff) > MAX_G) {
            xDiff = xDiff / Math.abs(xDiff) * MAX_G;
        }
        yDiff = -1 * (dataEvent.y - noGravitation.y);
        if (Math.abs(yDiff) > MAX_G) {
            yDiff = Diff / Math.abs(yDiff) * MAX_G;
        }

        xPos = (outerRadius - innerRadius * 0.8) * xDiff / MAX_G;
        yPos = (outerRadius - innerRadius * 0.8) * yDiff / MAX_G;
        
        // difference between ios and android that calculate a movement of smartphone sensor , so write out the code below.
        if (mobileos === "iOS"){
            ball_main.style.left = centerX_main - innerRadius * 0.8 - xPos + "px";
            ball_main.style.top = centerY_main - innerRadius * 0.8 - yPos + "px";
            ball_x.style.left = centerX_main - innerRadius * 0.8 - xPos + "px";
            ball_y.style.top = centerY_main- innerRadius * 0.8 - yPos + "px";
        }else{
            ball_main.style.left = centerX_main - innerRadius * 0.8 + xPos + "px";
            ball_main.style.top = centerY_main - innerRadius * 0.8 + yPos + "px";
            ball_x.style.left = centerX_main - innerRadius * 0.8 + xPos + "px";
            ball_y.style.top = centerY_main - innerRadius * 0.8 + yPos + "px";
        }
        if (inCircleRange(xPos,yPos, (innerRadius - innerRadius * 0.8))){
            return setGlow(statuslist[0], statuslist[1], statuslist[2]);
        }
    }