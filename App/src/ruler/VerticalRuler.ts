import Konva from "konva"

class VerticalRuler{
  x: number
  y: number
  height: number
  maxHeight: number
  isLeftOffset: number
  
  fontSize = 30
  offset = 30
  fontColor = 'white'
  strokeWidth = 3
  
  
  constructor(
    x: number,
    y: number,
    height: number,
    maxHeight: number,
    isLeftOffset: number
  ){
    this.x = x
    this.y = y
    this.height = height
    this.maxHeight = maxHeight
    this.isLeftOffset = isLeftOffset
    
    let group = new Konva.Group({
      x: x,
      y: y
    })
    
    //* Determine if ruler is drawn on the right or left side
    // TODO
    let offsetMultiplier = this.isLeftOffset ? -1 : 1
    
    //* Offset based on isLeftOffset
    let offsetValue = this.offset * offsetMultiplier
    let topHorizontalLine = new Konva.Line({
      points: [x, y, offsetValue, y],
      stroke: 'blue',
      strokeWidth: this.strokeWidth
    })
    
    group.add(topHorizontalLine)
    
    // this.topHo
  }
}

export default VerticalRuler