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
 
(function() {
    var MAX_G = 10,
        HEADER_HEIGHT = 50,
        ballRadius = 20,
        // 여기서부터 수정
        ball1Radius = 20,
        ball2Radius = 20,
        innerRadius = 31.25,
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
        statusGlow = false;
        statusGlow1 = false;
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

        xPos = (outerRadius - ballRadius) * xDiff / MAX_G;
        yPos = (outerRadius - ballRadius) * yDiff / MAX_G;
        
        if (mobileos === "iOS"){
            ball.style.left = centerX - ballRadius - xPos + "px";
            ball.style.top = centerY - ballRadius - yPos + "px";
            ball1.style.left = centerX - ball1Radius - xPos + "px";
            ball2.style.top = centerY- ball2Radius - yPos + "px";
        }else{
            ball.style.left = centerX - ballRadius + xPos + "px";
            ball.style.top = centerY - ballRadius + yPos + "px";
            ball1.style.left = centerX - ball1Radius + xPos + "px";
            ball2.style.top = centerY- ball2Radius + yPos + "px";
        }

        if (inCircleRange(xPos, yPos, innerRadius - ballRadius)) {
            if (statusGlow === false) {
                setGlow(true);
            }
        } else {
            if (statusGlow === true) {
                setGlow(false);
            }
        }

        if (inCircleRange1(xPos,  innerRadius - ball1Radius)) {
            if (statusGlow1 === false) {
                setGlow1(true);
            }
        } else {
            if (statusGlow1 === true) {
                setGlow1(false);
            }
        }

        if (inCircleRange2(yPos, innerRadius - ball2Radius)) {
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
        screenWidth = 250;
        screenHeight = 250;
        screenWidth1 = 250;
        screenHeight1 = 62.5;
        screenWidth2 = 62.5;
        screenHeight2 = 250;
        outerRadius = (screenWidth > screenHeight) ? (screenHeight / 2) : (screenWidth / 2);
        outerRadius1 = (screenWidth1 > screenHeight1) ? (screenHeight1 / 2) : (screenWidth1 / 2);
        outerRadius2 = (screenWidth2 > screenHeight2) ? (screenHeight2 / 2) : (screenWidth2 / 2);

        centerX = screenWidth / 2;
        centerY = (screenHeight / 2);
        centerX1 = screenWidth1 / 2;
        centerX2 = screenWidth2 / 2;
        centerY1 = screenHeight1 /2 ;
        centerY2 = screenHeight2 / 2;
        
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
            ball1 = document.querySelector("#ball1"),
            ball2 = document.querySelector("#ball2"),
            outerCircle = document.querySelector("#outer-circle"),
            bartop = document.querySelector("#bartop"),
            barleft = document.querySelector("#barleft"),
            errorMessage = document.querySelector("#error-message");

        outerCircle.style.left = centerX - outerRadius + "px";
        outerCircle.style.top = centerY - outerRadius + "px";
        outerCircle.style.width = (outerRadius * 2) + "px";
        outerCircle.style.height = (outerRadius * 2) + "px";
        
        bartop.style.left = centerX1 - outerRadius1 + "px";
        bartop.style.top = centerY1 - outerRadius1 + "px";
        bartop.style.width = screenWidth1 + "px";
        bartop.style.height = (outerRadius1 * 2) + "px";

        barleft.style.left = centerX2 - outerRadius2 + "px";
        barleft.style.top = centerY2 - outerRadius2 + "px";
        barleft.style.width = (outerRadius2 * 2) + "px";
        barleft.style.height = screenHeight2 + "px";

        ball.style.left = centerX - ballRadius + "px";
        ball.style.top = centerY - ballRadius + "px";

        ball1.style.left = centerX1 - ball1Radius + "px";
        ball1.style.top = centerY1 - ball1Radius + "px";

        ball2.style.left = centerX2 - ball2Radius + "px";
        ball2.style.top = centerY2 - ball2Radius + "px";
        
        ball.style.display = "block";
        ball1.style.display = "block";
        ball2.style.display = "block";
        
        outerCircle.style.display = "block";
        bartop.style.display = "block";
        barleft.style.display = "block";

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
