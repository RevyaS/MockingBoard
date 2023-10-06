import Konva from "konva";

class Circle {
  x: number
  y: number
  offset: number
  strokeWidth: number
  group: Konva.Group

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.offset = 30;
    this.strokeWidth = 3;

    let group = new Konva.Group({
      x: x,
      y: y,
    });

    this.group = group;
  }

  getPosition() {
    let pos = {
      x: this.group.x(),
      y: this.group.y(),
    };

    return pos;
  }

  setPosition(relativeNewPos: { x: number, y: number }) {
    //* set X and Y
    this.x = Math.floor(relativeNewPos.x);
    this.y = Math.floor(relativeNewPos.y);
    this.group.setAttrs({
      x: this.x,
      y: this.y,
    });
  }

  setOpacity(newOpacity: number) {
    this.group.opacity(newOpacity);
  }
}

export default Circle