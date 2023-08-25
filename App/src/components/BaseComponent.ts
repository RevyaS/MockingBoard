import Konva from 'konva'

export interface PosProps {
  x: number
  y: number
}

class BaseComponent {
  x: number
  y: number
  group: Konva.Group
  
  constructor(x: number, y: number){
    this.x = x;
    this.y = y;
    
    let group = new Konva.Group({
      x: x,
      y: y,

    })
    
    this.group = group
  }
  
  public getPosition = () => {
    let pos = {
      x: this.group.x(),
      y: this.group.y()
    }
    
    return pos
  }
  
  public setPosition = (relativeNewPos: PosProps) => {
    this.x = Math.floor(relativeNewPos.x)
    this.y = Math.floor(relativeNewPos.y)
    this.group.setAttrs({
      x: this.x,
      y: this.y
    })
  }
}

export default BaseComponent