var Mover = function() {
  this.dur = round(random(durMin, durMax));
  this.hold = round(random(holdMin, holdMax));
  this.dT = 0;
  this.lastTick = 0;
  this.moving = random(1) > 0.5 ? true : false;
  this.ptA = createVector(random(width), random(height));
  this.ptB = createVector(random(width), random(height));
  this.pos = this.moving ? this.ptA.copy() : this.ptB.copy()
};

// Move the point from point A to point B with Ease Out Quart easing
Mover.prototype.update = function() {
  this.dT = now - this.lastTick;
  if (this.moving) {
    if (this.dT <= this.dur) {
      // let nextX = easeOutQuart(this.dT, this.ptA.x, this.ptB.x - this.ptA.x, this.dur)
      // let nextY = easeOutQuart(this.dT, this.ptA.y, this.ptB.y - this.ptA.y, this.dur)
      let nextX = easeInOutQuart(this.dT, this.ptA.x, this.ptB.x - this.ptA.x, this.dur)
      let nextY = easeInOutQuart(this.dT, this.ptA.y, this.ptB.y - this.ptA.y, this.dur)
      this.pos = createVector(nextX, nextY);
    } else {
      // Set new destination
      this.dT = 0;
      this.lastTick = now;
      this.moving = false;
      this.pos = this.ptB.copy()
      this.dur = round(random(durMin, durMax))
      this.hold = round(random(holdMin, holdMax))
    }
  } else {
    if (this.dT >= this.hold) {
      this.ptA = this.ptB.copy()
      this.ptB = createVector(random(width), random(height));
      this.dT = 0;
      this.lastTick = now;
      this.moving = true;
    }
  }
}

Mover.prototype.display = function() {
  strokeWeight(1);
  noFill();
  stroke(255)
  ellipse(this.pos.x, this.pos.y, 11, 11);
  noFill()
  
  if (this.moving) {
    fill(255, 255, 255, map(this.dT / this.dur, 0, 1, 0, 255));
    stroke(255, 255, 255, map(this.dT / this.dur, 0, 1, 0, 255));
    stroke(243, 161, 255, map(this.dT / this.dur, 0, 1, 23, 95));
  } else {
    stroke(255, 255, 255, map(this.dT / this.hold, 0, 1, 255, 0));
    stroke(243, 161, 255, map(this.dT / this.hold, 0, 1, 95, 23));
  }
  ellipse(this.ptB.x, this.ptB.y, diam, diam);
  line(this.pos.x, this.pos.y, this.ptA.x, this.ptA.y);
}