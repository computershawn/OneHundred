var TriShape = function() {
  this.radius = radius
  this.position = createVector(round(random() * width), -20-round(random(600)))
  this.velocity = createVector(0, random(minSpeed, maxSpeed))
  //this.co = color(224, 11, 11)
  this.co = color(222, 31, 38)
  this.trailColor = color(249, 155, 28)
  //this.co = color(253, 182, 21)
  this.strength = random(1)
  this.hit = false
  this.lifeLeft = shapeLifespan
  this.alpha = 1
};

TriShape.prototype.run = function() {
  this.update()
  this.display()
};

// Method to update position
TriShape.prototype.update = function(){
  this.position.add(this.velocity);
  if(this.position.y > height + 20) {
    this.reset()
  }
  if(this.hit) {
    this.lifeLeft--
    if(this.lifeLeft < 0) {
      this.reset()
    } else {
      this.alpha = map(this.lifeLeft, shapeLifespan, 0, 1, 0)
    }
  }
};

// Method to display
TriShape.prototype.display = function() {
  // Draw trail
  //strokeWeight(2)
  //stroke(red(this.co), green(this.co), blue(this.co), this.alpha*63)
  stroke(red(this.trailColor), green(this.trailColor), blue(this.trailColor), this.alpha*63)
  line(this.position.x, 0, this.position.x, this.position.y)

  //strokeWeight(1)
  fill(red(this.co), green(this.co), blue(this.co), this.alpha*255)
  stroke(red(bgColor), green(bgColor), blue(bgColor), this.alpha*127)
  beginShape()
  for(let i = 0; i < 3; i++) {
    let a = i * TWO_PI/3 + HALF_PI
    let x = this.position.x + this.radius/2 * cos(a)
    let y = this.position.y + this.radius/2 * sin(a)
    vertex(x, y)
  }
  endShape(CLOSE)

  noFill()
  stroke(red(this.co), green(this.co), blue(this.co), this.alpha*.64*255)
  beginShape()
  for(let i = 0; i < 3; i++) {
    let a = i * TWO_PI/3 + HALF_PI
    let x = this.position.x + this.radius * cos(a)
    let y = this.position.y + this.radius * sin(a)
    vertex(x, y)
  }
  endShape(CLOSE)
};


// Method to display
TriShape.prototype.reset = function() {
  this.position = createVector(round(random() * width), -20-round(random(200)))
  this.velocity = createVector(0, random(minSpeed, maxSpeed))
  this.strength = random(1)
  this.hit = false
  this.lifeLeft = shapeLifespan
  this.alpha = 1
};
