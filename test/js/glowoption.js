 var statusGlow_main = false,
     statusGlow_x = false,
     statusGlow_y = false;


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

    export {statusGlow_main, statusGlow_x, statusGlow_y,inCircleRange_main, inCircleRange_x, inCircleRange_y, setGlow, setGlowx, setGlowy};