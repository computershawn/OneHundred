var Ring1 = function(index) {
  let amt = index/ringCount
  let r = map(amt, 0, 1, rMin, rMax)
  let v = map(amt, 0, 1, vMin, vMax)
  this.co = lerpColor(co1, co2, amt)
  this.dots = []
  this.speed = map(amt, 0, 1, .5, 1.5)
  this.opac = map(amt, 0, 1, 255, 63)

  for(let j = 0; j < seg; j++) {
    let a = -j * TWO_PI/seg
    let R = r + v * (random(1) > 0.5 ? 1 : -1)
    let x = R * cos(a)
    let y = R * sin(a)
    this.dots.push(createVector(x, y))
  }
};

Ring1.prototype.run = function() {
  this.update();
  this.display(pg);
};

Ring1.prototype.update = function() {
};

Ring1.prototype.display = function(graphicsBuffer) {
  let m = this.speed * map(frameCount % 600 / 600, 0, 1, 1, 2)
  graphicsBuffer.stroke(red(this.co), green(this.co), blue(this.co), this.opac)
  graphicsBuffer.beginShape()
  // graphicsBuffer.curveVertex(this.dots[0].x*m, h/2+this.dots[0].y*m - h/2)
  // for(let i = 0; i < this.dots.length; i++) {
  //   graphicsBuffer.curveVertex(this.dots[i].x*m, h/2+this.dots[i].y*m - h/2)
  // }
  graphicsBuffer.curveVertex(this.dots[0].x, h/2+this.dots[0].y)
  for(let i = 0; i < this.dots.length; i++) {
    graphicsBuffer.curveVertex(this.dots[i].x, h/2+this.dots[i].y)
  }
  graphicsBuffer.endShape(CLOSE)
};
