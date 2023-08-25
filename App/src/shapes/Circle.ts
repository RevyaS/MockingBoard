import Konva from "konva";
import BaseComponent from "../components/BaseComponent";

class Circle extends BaseComponent{
  offset: number
  strokeWidth: number
  
  constructor() {
    super(0, 0);
    this.offset = 30;
    this.strokeWidth = 3;
    
    let circle = new Konva.Circle({
      x: 0,
      y: 0,
      fill: 'green',
      radius: 50,
      draggable: true,
    });
    
    this.group.add(circle)
  }
}

export default Circle