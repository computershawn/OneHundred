// var Ring2 = function(x, y, index) {
//   let amt = index/ringCount
//   this.position = createVector(x, y)
//   this.diam = 2 * map(amt, 0, 1, rMin, rMax)
//   this.co = lerpColor(co1, co2, amt)
//   this.dots = []
//   this.speed = map(amt, 0, 1, .5, 1.5)
//   this.opac = map(amt, 0, 1, 255, 63)
// };
//
// Ring2.prototype.run = function() {
//   this.update();
//   this.display(pg);
// };
//
// Ring2.prototype.update = function() {
// };
//
// Ring2.prototype.display = function(graphicsBuffer) {
//   let m = this.speed * map(frameCount % 600 / 600, 0, 1, 1, 2)
//   graphicsBuffer.stroke(red(this.co), green(this.co), blue(this.co), this.opac)
//   graphicsBuffer.ellipse(this.position.x, this.position.y, this.diam, this.diam)
// };
var Ring2 = function(x, y, index) {
  let amt = index/ringCount
  this.position = createVector(x, y)
  this.diam = 2 * map(amt, 0, 1, rMin, rMax)
  this.co = lerpColor(co2, co1, amt)
  this.dots = []
  this.opac = map(amt, 0, 1, .5, 1)

  for(let i = 0; i < seg; i++) {
    let a = i * TWO_PI / seg+HALF_PI
    this.dots.push(createVector(this.diam/2 * cos(a), this.diam/2 * sin(a)))
  }
};

Ring2.prototype.run = function() {
  //this.update();
  this.display(pg);
};

Ring2.prototype.update = function() {
};

// Ring2.prototype.display = function(graphicsBuffer) {
//   graphicsBuffer.stroke(red(this.co), green(this.co), blue(this.co), this.opac)
//   graphicsBuffer.ellipse(this.position.x, this.position.y, this.diam, this.diam)
//   //graphicsBuffer.beginShape()
//   // for(let i = 0; i < this.dots.length-1; i++) {
//   //   let n = map(i, 0, this.dots.length, 0, 1)
//   //   //console.log(n)
//   //   graphicsBuffer.stroke(red(this.co), green(this.co), blue(this.co), this.opac)
//   //   let x1 = this.dots[i].x
//   //   let y1 = this.dots[i].y
//   //   let x2 = this.dots[i+1].x
//   //   let y2 = this.dots[i+1].y
//   //   graphicsBuffer.line(x1, y1, x2, y2)
//   // }
//   //graphicsBuffer.endShape(CLOSE)
// };

Ring2.prototype.display = function(graphicsBuffer) {
  let x0 = this.dots[0].x
  let y0 = this.dots[0].y
  let xn = this.dots[seg-1].x
  let yn = this.dots[seg-1].y

  for(let i = 0; i < seg-1; i++) {
    let n = this.opac * map(i / seg, 0, 1, .125, 1)
    graphicsBuffer.stroke(n * red(this.co), n * green(this.co), n * blue(this.co))
    let x1 = this.dots[i].x
    let y1 = this.dots[i].y
    let x2 = this.dots[i+1].x
    let y2 = this.dots[i+1].y
    graphicsBuffer.line(x1, y1, x2, y2)
  }
  graphicsBuffer.line(xn, yn, x0, y0)
};
