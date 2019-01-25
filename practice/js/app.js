import {statusGlow_main,statusGlow_x,setGlowy,inCircleRange_main,inCircleRange_x,inCircleRange_y,setGlow,setGlowx,setGlowy} from './glowmotion.js'
import {outerRadius, innerRadius, centerX_main,centerY_main, setDefaultVariables, setDefaultViews} from './setdefault.js'
    
    var MAX_G = 10, /** 중력 */
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
        // iOS와 android의 센서 동작 인식이 다르기 때문에 모바일 운영체제를 선택하는 함수
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
    

    function emptyElement(elm) {
        while (elm.firstChild) {
            elm.removeChild(elm.firstChild);
        }
 
        return elm;
    }
     // 오류가 있다면 에러메세지 출력하는 함수
    function setError(text) {
        var errorMessage = emptyElement(document.querySelector("#error-message"));
        errorMessage.appendChild(document.createTextNode(text));
    }

    function keyEventHandler(event) {
        if (event.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {
 
            }
        }
    }
    
 
    
    //devicemotion을 이용해 위치별로 공을 움직이게 해주는 함수
    function onOrientationChange(dataEvent) {
        var noGravitation,
            xDiff,
            yDiff,
            xPos,
            yPos,
            ball_main = document.querySelector("#ball_main");
            ball_x = document.querySelector("#ball_x");
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
        
        // ios는 android와 움직임 인식하는 방식이 달라서 기존 어플들과의 통일성을 위해 기기가 ios라면 움직임을 변경해줌
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

        if (inCircleRange_main(xPos, yPos, innerRadius - innerRadius * 0.8)) {
            if (statusGlow_main === false) {
                setGlow(true);
            }
        } else {
            if (statusGlow_main === true) {
                setGlow(false);
            }
        }

        if (inCircleRange_x(xPos,  innerRadius - innerRadius * 0.8)) {
            if (statusGlow_x === false) {
                setGlowx(true);
            }
        } else {
            if (statusGlow_x === true) {
                setGlowx(false);
            }
        }

        if (inCircleRange_y(yPos, innerRadius - innerRadius * 0.8)) {
            if (statusGlow_y === false) {
                setGlowy(true);
            }
        } else {
            if (statusGlow_y === true) {
                setGlowy(false);
            }
        }
    }