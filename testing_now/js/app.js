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
        ballRadius = 32,
        innerRadius = 40,
        outerRadius,
        screenWidth,
        screenHeight,
        centerX,
        centerY,
        statusGlow = false;
 
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
            data1 = 0,
            data2 = 0,
            ball = document.querySelector("#ball");
 
        noGravitation = dataEvent.acceleration;
        dataEvent = dataEvent.accelerationIncludingGravity;
 
        xDiff = dataEvent.x - noGravitation.x;
        if (Math.abs(xDiff) > MAX_G) {
            xDiff = xDiff / Math.abs(xDiff) * MAX_G;
        }
        yDiff = -1 * (dataEvent.y - noGravitation.y);
        if (Math.abs(yDiff) > MAX_G) {
            yDiff = yDiff / Math.abs(yDiff) * MAX_G;
        }
 
        xPos = (outerRadius - ballRadius) * xDiff / MAX_G;
        yPos = (outerRadius - ballRadius) * yDiff / MAX_G;
        console.log(xPos)
        console.log(xDiff)
        setInterval(function(){
            data1 = xPos;
            data2 = yPos;
    
            document.getElementById("xvar").innerHTML = data1 +"도";
            document.getElementById("yvar").innerHTML = data2 +"도";
        },200)
 
        ball.style.left = centerX - ballRadius + xPos + "px";
        ball.style.top = centerY - ballRadius + yPos + "px";
 
        if (inCircleRange(xPos, yPos, innerRadius - ballRadius)) {
            if (statusGlow === false) {
                setGlow(true);
            }
        } else {
            if (statusGlow === true) {
                setGlow(false);
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
        screenWidth = window.innerWidth;
        screenHeight = window.innerHeight - HEADER_HEIGHT;
        outerRadius = (screenWidth > screenHeight) ? (screenHeight / 2) : (screenWidth / 2);
        centerX = screenWidth / 2;
        centerY = (screenHeight / 2) + HEADER_HEIGHT;
 
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
            outerCircle = document.querySelector("#outer-circle"),
            errorMessage = document.querySelector("#error-message");
 
        outerCircle.style.left = centerX - outerRadius + "px";
        outerCircle.style.top = centerY - outerRadius + "px";
        outerCircle.style.width = (outerRadius * 2) + "px";
        outerCircle.style.height = (outerRadius * 2) + "px";
        ball.style.left = centerX - ballRadius + "px";
        ball.style.top = centerY - ballRadius + "px";
 
        ball.style.display = "block";
        outerCircle.style.display = "block";
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
    }

    window.onload = init;
}());