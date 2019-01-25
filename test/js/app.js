import { getMobileOperatingSystem , setDefaultVariables, setDefaultViews, setDefaultEvents, setError } from './setdefault'

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
    // 일정 범위 안에(가운데 작은 원)에 공이 들어오면 빛나게 해주는 기능에서 일정 범위를 화면 크기에 맞게 설정하는 함수
    

    window.onload = init; 

    function init() {
        
        if (setDefaultEvents() && setDefaultVariables()) {
            setDefaultViews();
        } else {
            setError("DeviceMotion Events API is not supported.");
        }
        mobileos = getMobileOperatingSystem();
    }

    function inCircleRange_main(x, y, r) {
        return (x * x + y * y <= r * r) ? true : false;
    }
    function inCircleRange_x(x, r) {
        return(x * x <= r * r) ? true : false;
    }
    function inCircleRange_y(y, r) {
        return ( y * y <= r * r) ? true : false;
    }
    
     
    // 위의 incirclerange를 이용해 범위 안에 들어왔다면 공에 빛효과(glow) 를 주는 함수
    function setGlow(status) {
        var glow_main = document.querySelector("#glow_main");
 
        if (statusGlow_main === status) {
            return;
        }
 
        if (status === true) {
            glow_main.style.display = "block";
        } else {
            glow_main.style.display = "none";
        }
        statusGlow_main = status;
    }
    function setGlowx(status) {
        var glow_x = document.querySelector("#glow_x");
 
        if (statusGlow_x === status) {
            return;
        }
        if (status === true) {
            glow_x.style.display = "block";
        } else {
            glow_x.style.display = "none";
        }
        statusGlow_x = status;
    }
    function setGlowy(status) {
        var glow_y = document.querySelector("#glow_y");
 
        if (statusGlow_y === status) {
            return;
        }
        if (status === true) {
            glow_y.style.display = "block";
        } else {
            glow_y.style.display = "none";
        }
        statusGlow_y = status;
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

}());