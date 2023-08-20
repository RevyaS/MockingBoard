import Konva from 'konva'

class BaseComponent {
  x: number
  y: number
  offset: number
  group: Konva.Group
  
  constructor(x: number, y: number){
    this.x = x;
    this.y = y;
    this.offset = 30
    // this.strokeWidth = 3
    
    let group = new Konva.Group({
      x: x,
      y: y,

    })
    
    this.group = group
  }
}