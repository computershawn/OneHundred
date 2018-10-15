var Explosion = function(position, bright, co) {
  this.lifespan = exploLifespan
  this.position = position
  this.isDead = false
  this.alpha0 = bright
  this.co = lerpColor(co, color(255), 0.5)
};

Explosion.prototype.run = function() {
  this.update()
  this.display()
};

// Method to update position
Explosion.prototype.update = function(){
  this.lifespan--
  if(this.lifespan < 0) {
    this.lifespan = 0
    this.isDead = true
  }
};

// Method to display
Explosion.prototype.display = function() {
  let alpha = map(this.lifespan, exploLifespan, 0, this.alpha0*255, 0)
  noStroke()
  fill(red(this.co), green(this.co), blue(this.co), alpha)
  ellipse(this.position.x, this.position.y, 100, 100)
  fill(255, alpha/2)
  ellipse(this.position.x, this.position.y, 40, 40)
  noFill()
  //strokeWeight(1)
  stroke(255, alpha)
  ellipse(this.position.x, this.position.y, 120, 120)
  stroke(red(this.co), green(this.co), blue(this.co), alpha)
  ellipse(this.position.x, this.position.y, 60, 60)
};
