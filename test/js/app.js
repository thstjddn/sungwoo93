/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
$(document).ready(function(){
    var height1 = window.innerWidth * 0.2,
        test = height1 + "px" + ' ' + '50%' + ' ' + 'auto';
    $('#main-detail').css('grid-template-rows', test)
});

(function() {
    var MAX_G = 10,
        HEADER_HEIGHT = 50,
        outerRadius,
        outerRadius1,
        outerRadius2,
        screenWidth,
        screenWidth1,
        screenWidth2,
        screenHeight,
        screenHeight1,
        screenHeight2,
        centerX,
        centerY,
        centerX1,
        centerY1,
        centerX2,
        centerY2,
        mobileos,
        innerRadius,
        ballRadius,
        // 여기서부터 수정
        ball1Radius,
        ball2Radius,
        statusGlow = false,
        statusGlow1 = false,
        statusGlow2 = false;

        
        // 변수 추가 생성

    /**
     * Checks the (x, y) is in the circle with radius r.
     * @private
     * @param {number} x - x coordinate value
     * @param {number} y - y coordinate value
     * @param {number} r - radius value
     */
    function inCircleRange(x, y, r) {
        return (x * x + y * y <= r * r) ? true : false;
    }
    function inCircleRange1(x, r) {
        return(x * x <= r * r) ? true : false;
    }

    function inCircleRange2(y, r) {
        return ( y * y <= r * r) ? true : false;
    }
    
 
    /**
     * Removes all child of the element.
     * @private
     * @param {Object} elm - The object to be emptied
     * @return {Object} The emptied element
     */
    function emptyElement(elm) {
        while (elm.firstChild) {
            elm.removeChild(elm.firstChild);
        }
 
        return elm;
    }
 
    /**
     * Updates the glow status
     * @private
     * @param {boolean} status - The requested status of the glow
     */
    function setGlow(status) {
        var glow = document.querySelector("#glow");
 
        if (statusGlow === status) {
            return;
        }
 
        if (status === true) {
            glow.style.display = "block";
        } else {
            glow.style.display = "none";
        }
        statusGlow = status;
    }
    
    function setGlow1(status) {
        var glow1 = document.querySelector("#glow1");
 
        if (statusGlow1 === status) {
            return;
        }
 
        if (status === true) {
            glow1.style.display = "block";
        } else {
            glow1.style.display = "none";
        }
        statusGlow1 = status;
    }

    function setGlow2(status) {
        var glow2 = document.querySelector("#glow2");
 
        if (statusGlow2 === status) {
            return;
        }
 
        if (status === true) {
            glow2.style.display = "block";
        } else {
            glow2.style.display = "none";
        }
        statusGlow2 = status;
    }
    /**
     * Handles the devicemotion event.
     * As a result, changes the position of ball element and
     * if the position is inside of inner circle, set the ball to glow.
     * @private
     * @param {Object} dataEvent - The event object
     */
    function onOrientationChange(dataEvent) {
        var noGravitation,
            xDiff,
            yDiff,
            xPos,
            yPos,
            ball = document.querySelector("#ball");
            ball1 = document.querySelector("#ball1");
            ball2 = document.querySelector("#ball2");
 
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
        
        if (mobileos === "iOS"){
            ball.style.left = centerX - innerRadius * 0.8 - xPos + "px";
            ball.style.top = centerY - innerRadius * 0.8 - yPos + "px";
            ball1.style.left = centerX - innerRadius * 0.8 - xPos + "px";
            ball2.style.top = centerY- innerRadius * 0.8 - yPos + "px";
        }else{
            ball.style.left = centerX - innerRadius * 0.8 + xPos + "px";
            ball.style.top = centerY - innerRadius * 0.8 + yPos + "px";
            ball1.style.left = centerX - innerRadius * 0.8 + xPos + "px";
            ball2.style.top = centerY- innerRadius * 0.8 + yPos + "px";
        }

        if (inCircleRange(xPos, yPos, innerRadius - innerRadius * 0.8)) {
            if (statusGlow === false) {
                setGlow(true);
            }
        } else {
            if (statusGlow === true) {
                setGlow(false);
            }
        }

        if (inCircleRange1(xPos,  innerRadius - innerRadius * 0.8)) {
            if (statusGlow1 === false) {
                setGlow1(true);
            }
        } else {
            if (statusGlow1 === true) {
                setGlow1(false);
            }
        }

        if (inCircleRange2(yPos, innerRadius - innerRadius * 0.8)) {
            if (statusGlow2 === false) {
                setGlow2(true);
            }
        } else {
            if (statusGlow2 === true) {
                setGlow2(false);
            }
        }
    }
          



    /**
     * Handles the hardware key event.
     * @private
     * @param {Object} event - The hardware key event object
     */
    function keyEventHandler(event) {
        if (event.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {
 
            }
        }
    }
 
    /**
     * Sets the default value to the variables and application environment.
     * @private
     */
    function setDefaultVariables() {
        screenWidth = window.innerWidth * 0.8 * 0.9;
        screenHeight = window.innerHeight * 0.5 * 0.9;
        screenWidth1 = window.innerWidth * 0.8 * 0.9;
        screenHeight1 = window.innerWidth * 0.2 * 0.9;
        screenWidth2 = window.innerWidth * 0.2 * 0.9;
        screenHeight2 = window.innerHeight * 0.5 * 0.9;
        outerRadius = (screenWidth > screenHeight) ? (screenHeight / 2) : (screenWidth / 2);
        outerRadius1 = outerRadius;
        outerRadius2 = outerRadius;
        innerRadius = outerRadius / 4;
        
        ballRadius = innerRadius * 0.9;
        ball1Radius = innerRadius * 0.9;
        ball2Radius = innerRadius * 0.9;

        centerX = screenWidth / 0.9  / 2;
        centerY = (screenHeight / 0.9 / 2);
        centerX1 = screenWidth1 / 0.9 / 2;
        centerX2 = screenWidth2 / 0.9 / 2;
        centerY1 = screenHeight1 / 0.9 /2 ;
        centerY2 = screenHeight2 / 0.9 / 2;
        
        if (screenWidth <= 0 || screenHeight <= 0) {
            return false;
        }
        return true;
    
    }
    /**
     * Sets the default position and style of elements.
     * @private
     */
    function setDefaultViews() {
        var ball = document.querySelector("#ball"),
            ballimg = document.querySelector("#ball img"),
            ball1 = document.querySelector("#ball1"),
            ball1img = document.querySelector("#ball1 img"),
            ball2 = document.querySelector("#ball2"),
            ball2img = document.querySelector("#ball2 img"),

            glowimg = document.querySelector("#glow img"),
            glow1img = document.querySelector("#glow1 img"),
            glow2img = document.querySelector("#glow2 img"),
            

            outerCircle = document.querySelector("#outer-circle"),
            outerCircleimg = document.querySelector("#outer-circle img"),
            bartop = document.querySelector("#bartop"),
            bartopimg = document.querySelector("#bartop img"),
            barleft = document.querySelector("#barleft"),
            barleftimg = document.querySelector("#barleft img"),
            errorMessage = document.querySelector("#error-message");

        // outerCircle.style.left = centerX - outerRadius  + "px";
        // outerCircle.style.top = centerY - outerRadius + "px";
        outerCircle.style.width = (outerRadius * 2) + "px";
        outerCircle.style.height = (outerRadius * 2) + "px";
        
        outerCircleimg.style.width = (outerRadius * 2) + "px";
        outerCircleimg.style.height = (outerRadius * 2) + "px";

        // bartop.style.left = centerX1 - innerRadius * 0.9 + "px";
        // bartop.style.top = centerY1 - innerRadius * 0.9  + "px";
        bartop.style.width = outerRadius * 2 + "px";
        bartop.style.height = innerRadius * 2 + "px";

        bartopimg.style.width = outerRadius * 2 + "px";
        bartopimg.style.height = innerRadius * 2 + "px";

        // barleft.style.left = centerX2 - outerRadius2 + "px";
        // barleft.style.top = innerRadius * 0.9 + "px";
        barleft.style.width = innerRadius * 2 + "px";
        barleft.style.height = outerRadius * 2 + "px";
        
        barleftimg.style.width = innerRadius * 2 + "px";
        barleftimg.style.height = outerRadius * 2 + "px";

        ball.style.left = centerX - innerRadius * 0.8 + "px";
        ball.style.top = centerY - innerRadius * 0.8 + "px";
        ball.style.width = innerRadius * 0.8 * 2 +"px";
        ball.style.height = innerRadius * 0.8 * 2 + "px";

        ballimg.style.width = innerRadius * 0.8 * 2 +"px";
        ballimg.style.height = innerRadius * 0.8 * 2 + "px";

        ball1.style.left = centerX1 + innerRadius * 0.8 + "px";
        ball1.style.top = centerY1 - innerRadius * 0.8 + "px";
        ball1.style.width = innerRadius * 0.8 * 2 +"px";
        ball1.style.height = innerRadius * 0.8 * 2 + "px";

        ball1img.style.width = innerRadius*0.8*2 +"px";
        ball1img.style.height = innerRadius*0.8*2+ "px";
        
        ball2.style.left = centerX2 - innerRadius * 0.8 + "px";
        ball2.style.top = centerY2 - innerRadius * 0.8 + "px";
        ball2.style.width = innerRadius * 0.8 * 2 +"px";
        ball2.style.height = innerRadius * 0.8 * 2 + "px";
        
        ball2img.style.width = innerRadius * 0.8 * 2 +"px";
        ball2img.style.height = innerRadius * 0.8 * 2 + "px";

        glow.style.width = innerRadius * 0.8 * 2 +"px";
        glow.style.height = innerRadius * 0.8 * 2 + "px";

        glowimg.style.width = innerRadius * 0.8 * 2 +"px";
        glowimg.style.height = innerRadius * 0.8 * 2 + "px";

        glow1.style.width = innerRadius * 0.8 * 2 +"px";
        glow1.style.height = innerRadius * 0.8 * 2 + "px";

        glow1img.style.width = innerRadius*0.8*2 +"px";
        glow1img.style.height = innerRadius*0.8*2+ "px";
        
        glow2.style.width = innerRadius * 0.8 * 2 +"px";
        glow2.style.height = innerRadius * 0.8 * 2 + "px";
        
        glow2img.style.width = innerRadius * 0.8 * 2 +"px";
        glow2img.style.height = innerRadius * 0.8 * 2 + "px";

        ball.style.display = "block";
        ball1.style.display = "block";
        ball2.style.display = "block";
        
        outerCircle.style.display = "inline-block";
        bartop.style.display = "inline-block";
        barleft.style.display = "inline-block";

        errorMessage.style.display = "none";
    }
 
    /**
     * Sets the default event handlers to the events.
     * @private
     */
    function setDefaultEvents() {
        document.addEventListener("tizenhwkey", keyEventHandler);
 
        if (window.DeviceMotionEvent) {
            window.addEventListener("devicemotion", onOrientationChange);
        } else {
            return false;
        }
 
        return true;
    }
    
    /**
     * Sets the error message to the error display element.
     * @private
     */
    function setError(text) {
        var errorMessage = emptyElement(document.querySelector("#error-message"));
 
        errorMessage.appendChild(document.createTextNode(text));
    }
 
    /**
     * Initializes the application.
     * @private
     */
    function init() {
        if (setDefaultEvents() && setDefaultVariables()) {
            setDefaultViews();
        } else {
            setError("DeviceMotion Events API is not supported.");
        }
        mobileos = getMobileOperatingSystem();
        console.log(mobileos);

    }
    
    function getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
            // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return "Windows Phone";
        }
    
        if (/android/i.test(userAgent)) {
            return "Android";
        }
    
        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
        }
    
        return "unknown";
    }

    window.onload = init;
}());
