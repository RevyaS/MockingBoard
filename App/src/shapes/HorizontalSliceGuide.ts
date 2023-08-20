import Konva from "konva"
import { Group } from "konva/lib/Group"

class HorizontalSlideGuide{
  x: number
  y: number
  width: number
  group: Group
  
  constructor(
    x: number,
    y: number,
    width: number,
  ){
    this.x = x
    this.y = y
    this.width = width
    
    let group = new Konva.Group({
      x: x,
      y: y
    })
    
    let outline = new Konva.Line({
      points: [0, y, width, y],
      stroke: 'white',
      strokeWidth: 7,
    })
    
    group.add(outline)
    
    outline.opacity(0)
    
    let line = new Konva.Line({
      points: [0, y, width, y],
      stroke: 'blue',
      strokeWidth: 3,
      dash: [20, 10]
    })
    
    group.add(line)
    
    this.group = group
  }
  
  getPosition(){
    let pos = {
      x: this.group.x(),
      y: this.group.y(),
    }
    
    return pos
  }
  
  setYPosition(y: number){
    this.y = Math.floor(y)
    this.group.setAttr('y', this.y)
  }
  
  setOpacity(newOpacity: number){
    this.group.opacity(newOpacity)
  }
}

export default HorizontalSlideGuide