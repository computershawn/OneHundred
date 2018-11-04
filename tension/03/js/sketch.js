const h = 640
const w = 640
let cnv, pg


const diam = 5
let now
let movers = []
const numPoints = 12
const durMax = 7200
const durMin = 720
const holdMax = 4800
const holdMin = 360
let bgColor = 0
let colorSwitcher
const numCurves = 30
const spacing = 6

function setup() {
  cnv = createCanvas(w, h)
  pg = createGraphics(w, h)
  colorSwitcher = new ColorSwitcher(0, 23, 24, 60)
  
  curveTightness(5)
  for (let i = 0; i < numPoints; i++) {
    movers.push(new Mover());
  }
}

function draw() {
  now = millis()
  //setGradientBackground()
  background(0)
  pg.background(colorSwitcher.shade)
  colorSwitcher.update(now)

  updateMovers()
  drawCurves()
  image(pg, 0, 0)
  image(pg, width/2, 0)
  image(pg, 0, height/2)
  image(pg, width/2, height/2)

  // OPTIONAL: Place a light overlay on top of each quad
  noStroke()
  fill(255, 255, 255, 31)
  rect(0, 0, width/2, height/2)
  fill(255, 255, 255, 23)
  rect(width/2, 0, width/2, height/2)
  fill(255, 255, 255, 15)
  rect(0, height/2, width/2, height/2)
  fill(255, 255, 255, 7)
  rect(width/2, height/2, width/2, height/2)
}

const updateMovers = () => {
  for (let i = 0; i < movers.length; i++) {
    movers[i].update()
  }
}

const drawCurves = () => {
  let m0 = movers[0].pos.copy()
  let m1 = movers[numPoints-1].pos.copy()
  pg.curveTightness(4);
  pg.noFill()
  for(let i = 0; i < numCurves; i++) {
    pg.stroke(255, 255, 255, map(i, 0, numCurves, 255, 0))
    pg.strokeWeight(map(i, 0, numCurves, 1.5, .5))
    pg.beginShape()
    pg.curveVertex(m0.x, m0.y + spacing * i)    
    for(let j = 0; j < movers.length; j++) {
      pg.curveVertex(movers[j].pos.x, movers[j].pos.y+spacing*i)
    }
    pg.curveVertex(m1.x, m1.y + spacing * i)
    pg.endShape()
  }
}