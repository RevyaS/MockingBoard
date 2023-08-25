import Konva from "konva";
import BaseComponent from "../components/BaseComponent";

class Circle extends BaseComponent{
  offset: number
  strokeWidth: number
  
  constructor(x: number, y: number) {
    super(x, y);
    this.offset = 30;
    this.strokeWidth = 3;
    
    let circle = new Konva.Circle({
      x: 350,
      y: 90,
      fill: 'green',
      radius: 50,
      draggable: true,
    });
    
    this.group.add(circle)
  }
}

export default Circle