// jQuery로 모바일로 출력되는 화면에 맞춰서 전체 화면의 비율을 정함
$(document).ready(function(){
    var height1 = window.innerWidth * 0.2,
        test = height1 + "px" + ' ' + '50%' + ' ' + 'auto';
    $('#main-detail').css('grid-template-rows', test)
});

// 기본 변수 설정
(function() {
    var MAX_G = 10, /** 중력 */
        outerRadius, /** 큰 원의 반지름 */
        screenWidth, /** 원이 포함된 화면의 너비*/
        screenWidth1, /** 상단 화면의 너비*/
        screenWidth2, /** 좌측 화면의 너비*/
        screenHeight, /** 원이 포함된 화면의 높이 */
        screenHeight1, /** 상단 화면의 높이 */
        screenHeight2, /** 좌측 화면의 높이 */
        centerX, /** 우측 하단의 가로 중앙 */
        centerY, /** 우측 하단의 세로 중앙 */
        centerX1, /** 상단의 가로 중앙 */
        centerY1, /** 상단의 세로 중앙*/
        centerX2, // 좌측의 가로 중앙
        centerY2, // 좌측의 세로 중앙
        mobileos, // 모바일 os가 무엇인지를 받아오는 변수
        innerRadius, //안의 작은 원의 반지름
        statusGlow = false,
        statusGlow1 = false,
        statusGlow2 = false;

    // 일정 범위 안에(가운데 작은 원)에 공이 들어오면 빛나게 해주는 기능에서 일정 범위를 화면 크기에 맞게 설정하는 함수
    function inCircleRange(x, y, r) {
        return (x * x + y * y <= r * r) ? true : false;
    }
    function inCircleRange1(x, r) {
        return(x * x <= r * r) ? true : false;
    }

    function inCircleRange2(y, r) {
        return ( y * y <= r * r) ? true : false;
    }
    
 
    function emptyElement(elm) {
        while (elm.firstChild) {
            elm.removeChild(elm.firstChild);
        }
 
        return elm;
    }
    
    // 위의 incirclerange를 이용해 범위 안에 들어왔다면 공에 빛효과(glow) 를 주는 함수
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
    
    //devicemotion을 이용해 위치별로 공을 움직이게 해주는 함수
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
        
        // ios는 android와 움직임 인식하는 방식이 달라서 기존 어플들과의 통일성을 위해 기기가 ios라면 움직임을 변경해줌
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
          
    // 뒤로가기 버튼을 누르면 동작을 멈춤
    function keyEventHandler(event) {
        if (event.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {
 
            }
        }
    }
    // 기본값 설정(각 기기마다 상이한 화면의 크기 설정)

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
    // 위의 화면 크기에 따른 각각 요소들의 크기와 위치 설정
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

            circle1 = document.querySelector("#circle1"),
            circle1img = document.querySelector("#circle1 img"),
            circle2 = document.querySelector("#circle2"),
            circle2img = document.querySelector("#circle2 img"),
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
        
        circle1.style.width = innerRadius * 1.95 + "px";
        circle1.style.height = innerRadius * 1.95 + "px";

        circle1img.style.width = innerRadius * 1.95 + "px";
        circle1img.style.height = innerRadius * 1.95 + "px";

        circle2.style.width = innerRadius * 1.95 + "px";
        circle2.style.height = innerRadius * 1.95 + "px";

        circle2img.style.width = innerRadius * 1.95 + "px";
        circle2img.style.height = innerRadius * 1.95 + "px";

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
        circle2.style.display = "inline-block";
        errorMessage.style.display = "none";
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
    
    // 오류가 있다면 에러메세지 출력하는 함수
    function setError(text) {
        var errorMessage = emptyElement(document.querySelector("#error-message"));
 
        errorMessage.appendChild(document.createTextNode(text));
    }
 
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

    window.onload = init;
}());
