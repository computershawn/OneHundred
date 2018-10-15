var CircShape = function() {
  this.diam = 2 * radius
  this.position = createVector(round(random() * width), height+20+round(random(600)))
  this.velocity = createVector(0, -random(minSpeed, maxSpeed))
  this.co = color(58,191,239)
  this.trailColor = color(109, 195, 139)
  this.strength = random(1)
  this.hit = false
  this.lifeLeft = shapeLifespan
  this.alpha = 1
};

CircShape.prototype.run = function() {
  this.update()
  this.display()
};

// Method to update position
CircShape.prototype.update = function(){
  this.position.add(this.velocity)
  if(this.position.y < -20) {
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

CircShape.prototype.display = function() {
  noFill()
  // Draw trail
  //stroke(red(this.co), green(this.co), blue(this.co), this.alpha*63)
  stroke(red(this.trailColor), green(this.trailColor), blue(this.trailColor), this.alpha*63)
  //strokeWeight(2)
  line(this.position.x, height, this.position.x, this.position.y)

  //strokeWeight(1)
  fill(red(this.co), green(this.co), blue(this.co), this.alpha*255)
  stroke(red(bgColor), green(bgColor), blue(bgColor), this.alpha*255)
  ellipse(this.position.x, this.position.y, this.diam/2, this.diam/2)

  noFill()
  stroke(red(this.co), green(this.co), blue(this.co), this.alpha*.64*255)
  ellipse(this.position.x, this.position.y, this.diam, this.diam)
};


// Method to display
CircShape.prototype.reset = function() {
  this.position = createVector(round(random() * width), height+20+round(random(200)))
  this.velocity = createVector(0, -random(minSpeed, maxSpeed))
  this.strength = random(1)
  this.hit = false
  this.lifeLeft = shapeLifespan
  this.alpha = 1
};
