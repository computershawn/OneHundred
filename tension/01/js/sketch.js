
let circles = []
let triangles = []
let explosions = []
let bgColor, shadowColor// = color(63, 63, 63)
let num = 60//1//8
let radius = 8
let minSpeed = 0.4//0.2
let maxSpeed = 1.6//1//0.6
let exploLifespan = 30
let shapeLifespan = 60

function setup() {
  const w = 640
  const h = 640
  let cnv = createCanvas(w, h)
  //bgColor = color(22, 30, 38)
  bgColor = color(22, 22, 22)
  bgColor = color(220, 220, 220)
  //bgColor = color(240, 240, 240)
  shadowColor = color(0, 0, 0, 127)

  for(let i = 0; i < num; i++) {
    triangles.push(new TriShape())
  }
  for(let i = 0; i < num; i++) {
    circles.push(new CircShape())
  }
}

function draw() {
  //background(bgColor)
  background(0)
  gradientBackground()
  showExplosions()
  showShapes()
  checkCollisions()
}

function showExplosions() {
  for(let k = 0; k < explosions.length; k++) {
    explosions[k].run()
  }
  let temp = explosions.filter(explo => !explo.isDead)
  explosions = temp
}

function showShapes() {
  for(let i = 0; i < triangles.length; i++) {
    triangles[i].run()
  }
  for(let j = 0; j < circles.length; j++) {
    circles[j].run()
  }
}

function checkCollisions() {
  for(let i = 0; i < num; i++) {
    for(let j = 0; j < num; j++) {
      if(!triangles[i].hit && !circles[j].hit) {
        let tx = triangles[i].position.x
        let ty = triangles[i].position.y
        let cx = circles[j].position.x
        let cy = circles[j].position.y
        let r = dist(tx, ty, cx, cy)
        let co
        if(r <= radius) {
          if(triangles[i].strength === circles[j].strength) {
            circles[j].hit = true
            circles[j].velocity.x = circles[j].velocity.y = 0
            triangles[i].hit = true
            triangles[i].velocity.x = triangles[i].velocity.y = 0
            co = color(255)
          }
          if(triangles[i].strength > circles[j].strength) {
            circles[j].hit = true
            circles[j].velocity.x = circles[j].velocity.y = 0
            co = circles[j].co
          }
          if(triangles[i].strength <= circles[j].strength) {
            triangles[i].hit = true
            triangles[i].velocity.x = triangles[i].velocity.y = 0
            co = triangles[i].co
          }
          let bright = abs(triangles[i].strength - circles[j].strength)
          //let bright = map(difference, 0, 1, 15, 255)
          explosions.push(new Explosion(createVector((tx+cx)/2, (ty+cy)/2), bright, co))
        }
      }
    }
  }
}

function gradientBackground() {
  noStroke()
  let segments = 20
  let h = height/segments
  for(let i = 0; i < segments; i++) {
    fill(255, map(i, 0, segments, 0, 63))
    rect(0, i * h, width, h)
  }
}
