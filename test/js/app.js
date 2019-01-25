
import {inCircleRange_main, inCircleRange_x, inCircleRange_y, setGlow, setGlowx, setGlowy} from './glowoption.js'
// 기본 변수 설정
(function() {
    var MAX_G = 10, /** 중력 */
        outerRadius, /** 큰 원의 반지름 */
        screenWidth_main, /** 원이 포함된 화면의 너비*/
        screenWidth_x, /** 상단 화면의 너비*/
        screenWidth_y, /** 좌측 화면의 너비*/
        screenHeight_main, /** 원이 포함된 화면의 높이 */
        screenHeight_x, /** 상단 화면의 높이 */
        screenHeight_y, /** 좌측 화면의 높이 */
        centerX_main, /** 우측 하단의 가로 중앙 */
        centerY_main, /** 우측 하단의 세로 중앙 */
        centerX_x, /** 상단의 가로 중앙 */
        centerY_x, /** 상단의 세로 중앙*/
        centerX_y, // 좌측의 가로 중앙
        centerY_y, // 좌측의 세로 중앙
        mobileos, // 모바일 os가 무엇인지를 받아오는 변수
        innerRadius, //이동하는 원의 반지름
        statusGlow_main = false,
        statusGlow_x = false,
        statusGlow_y = false;
    
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
    
    function setDefaultVariables() {
        screenWidth_main = window.innerWidth * 0.8 * 0.9;
        screenHeight_main = window.innerHeight * 0.5 * 0.9;
        screenWidth_x = window.innerWidth * 0.8 * 0.9;
        screenHeight_x = window.innerWidth * 0.2 * 0.9;
        screenWidth_y = window.innerWidth * 0.2 * 0.9;
        screenHeight_y = window.innerHeight * 0.5 * 0.9;
        outerRadius = (screenWidth_main > screenHeight_main) ? (screenHeight_main / 2) : (screenWidth_main / 2);
        innerRadius = outerRadius / 4;
        
        // jQuery로 모바일로 출력되는 화면에 맞춰서 전체 화면의 비율을 정함
        $(document).ready(function(){
            var height_top = window.innerWidth * 0.2,
                grid_height = height_top + "px" + ' ' + '50%' + ' ' + 'auto';
            $('#main-detail').css('grid-template-rows', grid_height)
        });

        ball_mainRadius = innerRadius * 0.9;
        ball_xRadius = innerRadius * 0.9;
        ball_yRadius = innerRadius * 0.9;

        centerX_main = screenWidth_main / 0.9  / 2;
        centerY_main = (screenHeight_main / 0.9 / 2);
        centerX_x = screenWidth_x / 0.9 / 2;
        centerX_y = screenWidth_y / 0.9 / 2;
        centerY_x = screenHeight_x / 0.9 /2 ;
        centerY_y = screenHeight_y / 0.9 / 2;
        
        if (screenWidth_main <= 0 || screenHeight_main <= 0) {
            return false;
        }
        return true;
    
    }

    function setDefaultViews() {
        var ball_main = document.querySelector("#ball_main"),
            ball_mainimg = document.querySelector("#ball_main img"),
            ball_x = document.querySelector("#ball_x"),
            ball_ximg = document.querySelector("#ball_x img"),
            ball_y = document.querySelector("#ball_y"),
            ball_yimg = document.querySelector("#ball_y img"),

            glow_mainimg = document.querySelector("#glow_main img"),
            glow_ximg = document.querySelector("#glow_x img"),
            glow_yimg = document.querySelector("#glow_y img"),
            
            outerCircle = document.querySelector("#outer-circle"),
            outerCircleimg = document.querySelector("#outer-circle img"),
            bartop = document.querySelector("#bartop"),
            bartopimg = document.querySelector("#bartop img"),
            barleft = document.querySelector("#barleft"),
            barleftimg = document.querySelector("#barleft img"),

            circle_x = document.querySelector("#circle_x"),
            circle_ximg = document.querySelector("#circle_x img"),
            circle_y = document.querySelector("#circle_y"),
            circle_yimg = document.querySelector("#circle_y img"),
            errorMessage = document.querySelector("#error-message");

        outerCircle.style.width = (outerRadius * 2) + "px";
        outerCircle.style.height = (outerRadius * 2) + "px";
        
        outerCircleimg.style.width = (outerRadius * 2) + "px";
        outerCircleimg.style.height = (outerRadius * 2) + "px";

        bartop.style.width = outerRadius * 2 + "px";
        bartop.style.height = innerRadius * 2 + "px";

        bartopimg.style.width = outerRadius * 2 + "px";
        bartopimg.style.height = innerRadius * 2 + "px";

        barleft.style.width = innerRadius * 2 + "px";
        barleft.style.height = outerRadius * 2 + "px";
    
        barleftimg.style.width = innerRadius * 2 + "px";
        barleftimg.style.height = outerRadius * 2 + "px";
        
        circle_x.style.width = innerRadius * 1.95 + "px";
        circle_x.style.height = innerRadius * 1.95 + "px";

        circle_ximg.style.width = innerRadius * 1.95 + "px";
        circle_ximg.style.height = innerRadius * 1.95 + "px";

        circle_y.style.width = innerRadius * 1.95 + "px";
        circle_y.style.height = innerRadius * 1.95 + "px";

        circle_yimg.style.width = innerRadius * 1.95 + "px";
        circle_yimg.style.height = innerRadius * 1.95 + "px";

        ball_main.style.left = centerX_main - innerRadius * 0.8 + "px";
        ball_main.style.top = centerY_main - innerRadius * 0.8 + "px";
        ball_main.style.width = innerRadius * 0.8 * 2 +"px";
        ball_main.style.height = innerRadius * 0.8 * 2 + "px";

        ball_mainimg.style.width = innerRadius * 0.8 * 2 +"px";
        ball_mainimg.style.height = innerRadius * 0.8 * 2 + "px";

        ball_x.style.left = centerX_x + innerRadius * 0.8 + "px";
        ball_x.style.top = centerY_x - innerRadius * 0.8 + "px";
        ball_x.style.width = innerRadius * 0.8 * 2 +"px";
        ball_x.style.height = innerRadius * 0.8 * 2 + "px";

        ball_ximg.style.width = innerRadius*0.8*2 +"px";
        ball_ximg.style.height = innerRadius*0.8*2+ "px";
        
        ball_y.style.left = centerX_y - innerRadius * 0.8 + "px";
        ball_y.style.top = centerY_y - innerRadius * 0.8 + "px";
        ball_y.style.width = innerRadius * 0.8 * 2 +"px";
        ball_y.style.height = innerRadius * 0.8 * 2 + "px";
        
        ball_yimg.style.width = innerRadius * 0.8 * 2 +"px";
        ball_yimg.style.height = innerRadius * 0.8 * 2 + "px";

        glow_main.style.width = innerRadius * 0.8 * 2 +"px";
        glow_main.style.height = innerRadius * 0.8 * 2 + "px";

        glow_mainimg.style.width = innerRadius * 0.8 * 2 +"px";
        glow_mainimg.style.height = innerRadius * 0.8 * 2 + "px";

        glow_x.style.width = innerRadius * 0.8 * 2 +"px";
        glow_x.style.height = innerRadius * 0.8 * 2 + "px";

        glow_ximg.style.width = innerRadius*0.8*2 +"px";
        glow_ximg.style.height = innerRadius*0.8*2+ "px";
        
        glow_y.style.width = innerRadius * 0.8 * 2 +"px";
        glow_y.style.height = innerRadius * 0.8 * 2 + "px";
        
        glow_yimg.style.width = innerRadius * 0.8 * 2 +"px";
        glow_yimg.style.height = innerRadius * 0.8 * 2 + "px";

        ball_main.style.display = "block";
        ball_x.style.display = "block";
        ball_y.style.display = "block";
        
        outerCircle.style.display = "inline-block";
        bartop.style.display = "inline-block";
        barleft.style.display = "inline-block";
        errorMessage.style.display = "none";
    }

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
          
    function keyEventHandler(event) {
        if (event.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {
 
            }
        }
    }
    
    function setError(text) {
        var errorMessage = emptyElement(document.querySelector("#error-message"));
 
        errorMessage.appendChild(document.createTextNode(text));
    }
 
}());
