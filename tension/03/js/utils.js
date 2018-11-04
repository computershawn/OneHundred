let setGradientBackground = function () {
    var c = document.getElementById("defaultCanvas0");
    var ctx = c.getContext("2d");

    // Create gradient
    var grd = ctx.createLinearGradient(0, 0, width, height);
    grd.addColorStop(0, "rgb(186, 0, 214)");
    grd.addColorStop(1, "rgb(146, 0, 168)");

    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);
}


// QUARTIC EASING!
// t: time from start of animation until now
// b: value at start of animation
// c: change in value being animated
// d: duration of animation
const easeOutQuart = function (t, b, c, d) {
    t = t / d - 1
    return -c * (t * t * t * t - 1) + b
}

const easeInOutQuart = function (t, b, c, d) {
    t = t / (d / 2)
    if (t < 1) return c / 2 * t * t * t * t + b
    t -= 2
    return -c / 2 * (t * t * t * t - 2) + b
}


var ColorSwitcher = function (color1, color2, durMin, durMax) {
    this.dur = round(random(durMin, durMax))
    this.dT = 0
    this.lastTick = 0
    this.color1 = color1
    this.color2 = color2
    this.shade = random(color1, color2)
};

// Move the point from point A to point B with Ease Out Quart easing
ColorSwitcher.prototype.update = function (now) {
    this.dT = now - this.lastTick;
    if (this.dT >= this.dur) {
        this.shade = random(this.color1, this.color2)
        this.dT = 0;
        this.lastTick = now
    }
}