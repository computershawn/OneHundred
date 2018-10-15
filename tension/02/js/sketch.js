let w = 640
let h = 640
let bgColor

let cx = 260
let cy = h/2
let points = []
let dotGrid = []
let sp = 10
let rows = 48
let cols = 16

let ringCount = 60
let seg = 90
let dotsPerRing = 400
let co1, co2
let vMin = 1
let vMax = 3
let margin = 20 // inset our stuff from canvas edges
let rMin = 12
let rMax = 224//(rows-1)*sp/2//w/2-margin
let pg
let rings = []
//let rs
let ringSpeed = Math.PI * 2 / 300
let ringRotation = 0

// let cx = 0
// let cy = h/2
// let points = []
// let dotGrid = []
// let sp = 10
// let rows = 48
// let cols = 16

function setup() {
  bgColor = color(23,23,23)
  let cnv = createCanvas(w, h)
  pg = createGraphics(w, h)
  pg.background(bgColor)
  co1 = color(240, 233, 37)
  co2 = color(244, 120, 32)
  // co1 = color(0, 127, 255)
  // co2 = color(255, 47, 0)

  // Version 1 of Ring
  // for(let i = 0; i < ringCount; i++) {
  //   rings.push(new Ring1(i))
  // }

  // Version 2 of Ring
  for(let i = 0; i < ringCount; i++) {
    rings.push(new Ring2(cx, h/2, i))
  }


  getDotGrid()

  frameRate(3)
  //noLoop()
}

function draw() {
  pg.background(bgColor)
  pg.noFill()
  //drawTangents()
  drawDotsAndLines()
  showRings()
  image(pg, 0, 0)
}

const showRings = function() {
  ringRotation += ringSpeed
  pg.push()
  pg.translate(cx, h/2)
  pg.rotate(ringRotation)
  for(let i = 0; i < rings.length; i++) {
    rings[i].run(pg)
  }
  pg.pop()
}

const getDotGrid = function() {
  let y0 = (h - (rows - 1) * sp)/2
  let x0 = (w - (cols - 1) * sp)/2 + 200
  let xMax = (cols-1) * sp + x0
  let yMax = (rows-1) * sp + y0
  let dMax = dist(0, h/2, xMax, yMax)
  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++) {
      let co = lerpColor(co2, co1, j/cols)
      let x = x0 + j * sp
      let y = y0 + i * sp
      let distance = dist(cx, cy, x, y)
      let yDist = dist(0, y, 0, h/2)
      yDist = round(map(yDist, 0, (rows-1)*sp/2, 0, rings.length-1))
      //let lineColor = lerpColor(co1, color(255), random(.5))
      let diam = rings[yDist].diam
      let theta = atan((diam/2)/distance)
      let alpha = map(distance, 0, sqrt(2*w*h), 15, 63)
      dotGrid.push({
        "x":x,
        "y":y,
        "theta":theta,
        "co":co,
        "alpha":alpha,
        //"lineColor":lineColor
      })
    }
  }
}

const displayDotGrid = function(graphicsBuffer) {
  for(let i = 0; i < dotGrid.length; i++) {
    graphicsBuffer.stroke(dotGrid[i].co)
    //graphicsBuffer.stroke(255)
    graphicsBuffer.point(dotGrid[i].x, dotGrid[i].y)
    //graphicsBuffer.stroke(red(dotGrid[i].co), green(dotGrid[i].co), blue(dotGrid[i].co), dotGrid[i].alpha)
    graphicsBuffer.line(dotGrid[i].x, dotGrid[i].y, 0, h/2)
  }
}


function pointTangents(pt) {
  let px = pt.x
  let py = pt.y
  let theta = pt.theta
  pg.strokeWeight(2)
  pg.stroke(red(pt.co), green(pt.co), blue(pt.co))
  pg.point(px, py)
  pg.strokeWeight(1)
  pg.stroke(red(pt.co), green(pt.co), blue(pt.co), pt.alpha)
  pg.push()
  pg.translate(px, py)
  pg.rotate(-theta)
  pg.line(0, 0, cx-px, cy-py)
  pg.rotate(2 * theta)
  pg.line(0, 0, cx-px, cy-py)
  pg.pop()
}
function drawTangents() {
  for(let i = 0; i < dotGrid.length; i++) {
    pointTangents(dotGrid[i])
  }
}

// function pointsConverge(pt) {
//   let px = pt.x
//   let py = pt.y
//   let theta = pt.theta
//   pg.strokeWeight(2)
//   pg.stroke(red(pt.co), green(pt.co), blue(pt.co))
//   pg.point(px, py)
//   pg.strokeWeight(1)
//   pg.stroke(red(pt.co), green(pt.co), blue(pt.co), pt.alpha)
//   pg.push()
//   pg.translate(px, py)
//   pg.rotate(-theta)
//   pg.line(0, 0, cx-px, cy-py)
//   pg.rotate(2 * theta)
//   pg.line(0, 0, cx-px, cy-py)
//   pg.pop()
// }
function drawDotsAndLines() {
  for(let i = 0; i < dotGrid.length; i++) {
    let pt = dotGrid[i]
    let px = pt.x
    let py = pt.y
    let theta = pt.theta
    pg.strokeWeight(2)
    pg.stroke(red(pt.co), green(pt.co), blue(pt.co))
    pg.point(px, py)
    pg.strokeWeight(1)
    //pg.stroke(red(pt.co), green(pt.co), blue(pt.co), pt.alpha)
     pg.stroke(red(co1), green(co1), blue(co1), pt.alpha)
    //pg.stroke(red(pt.lineColor), green(pt.lineColor), blue(pt.lineColor), pt.alpha)
    //pg.push()
    //pg.translate(px, py)
    //pg.rotate(-theta)
    pg.line(cx, cy, px, py)
    //pg.rotate(2 * theta)
    //pg.line(0, 0, cx-px, cy-py)
    //pg.pop()
  }
}
