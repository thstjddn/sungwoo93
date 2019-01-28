var statuslist = [];

function inCircleRange(x, y, r) {
    var statuslist =[];
    statuslist.push((x * x <= r * r) ? true : false);
    statuslist.push((y * y <= r * r) ? true : false);
    statuslist.push(((statuslist[0] && statuslist[1]) === true) ? true : false);
    return statuslist;
}

function setGlow() {
    var glow_main = document.querySelector("#glow_main"),
        glow_x = document.querySelector("#glow_x"),
        glow_y = document.querySelector("#glow_y");

    if (statuslist[0]===true){
        glow_x.style.display = "block";
    } else {
        glow_x.style.display = "none";
    }

    if (statuslist[1] === true){
        glow_y.style.display = "block";
    } else {
        glow_y.style.display = "none";
    }

    if (statuslist[2] === true) {
        glow_main.style.display = "block";
    } else {
        glow_main.style.display = "none";
    }
}

export {inCircleRange, setGlow};