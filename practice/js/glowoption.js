var statusGlow_main = false,
    statusGlow_x = false,
    statusGlow_y = false,
    statuslist = [];

function inCircleRange(x, y, r) {
    statuslist.push((x * x <= r * r) ? true : false);
    statuslist.push((y * y <= r * r) ? true : false);
    statuslist.push(((statuslist[0] && statuslist[1]) === true) ? true : false);
    return statuslist;
}

function setGlow(x, y, z) {
    var glow_main = document.querySelector("#glow_main"),
        glow_x = document.querySelector("#glow_x"),
        glow_y = document.querySelector("#glow_y");

    if (statusGlow_x = x){
        return;
    }
    if (statuslist[0]===true){
        glow_x.style.display = "block";
    } else {
        glow_x.style.display = "none";
    }
    statusGlow_x === statuslist[0];

    if (statusGlow_y = y){
        return;
    }
    if (statuslist[1] === true){
        glow_y.style.display = "block";
    } else {
        glow_y.style.display = "none";
    }
    statusGlow_y === statuslist[1];

    if (statusGlow_main = z){
        return;
    }
    if (statuslist[2] === true) {
        glow_main.style.display = "block";
    } else {
        glow_main.style.display = "none";
    }
    statusGlow_main === statuslist[2];
}

export {statusGlow_main,statusGlow_x,statusGlow_y,statuslist, inCircleRange, setGlow};