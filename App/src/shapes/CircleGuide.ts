import Konva from "konva";

class CircleGuide {
  x: number
  y: number
  group: Konva.Group
  
  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;

    let group = new Konva.Group({
      x: x,
      y: y,
    });

    let outline = new Konva.Circle({
      x: x,
      y: y,
      radius: radius,
      fill: 'white',
      draggable: true,
    });

    group.add(outline);
    outline.opacity(0);

    let circle = new Konva.Circle({
      x: x,
      y: y,
      radius: radius,
      fill: 'blue',
      draggable: true,
    });

    group.add(circle);

    this.group = group;
  }

  setZIndex(maxZIndex: number) {
    this.group.zIndex(maxZIndex);
  }

  getPosition() {
    let pos = {
      x: this.group.x(),
      y: this.group.y(),
    };
    return pos;
  }

  setXYPosition(x: number, y: number) {
    this.x = Math.floor(x);
    this.y = Math.floor(y);
    this.group.setAttrs({
      x: this.x,
      y: this.y,
    });
  }

  setOpacity(newOpacity: number) {
    this.group.opacity(newOpacity);
  }
}

export default CircleGuide