import Konva from 'konva';

class HorizontalRuler {
  fontColor: string;

  isBottomOffset: boolean;

  x: number;
  y: number;
  offset: number;
  strokeWidth: number;
  width: number;
  maxWidth: number;
  fontSize: number;
  textHeight: number;

  leftVerticalLine: Konva.Line;
  rightVerticalLine: Konva.Line;
  horizontalLine: Konva.Line;

  textValue: Konva.Text;
  
  group: Konva.Group

  constructor(
    x: number,
    y: number,
    width: number,
    maxWidth: number,
    isBottomOffset: boolean,
  ) {
    this.x = x;
    this.y = y;
    this.offset = 30;
    this.fontColor = 'white';
    this.strokeWidth = 3;
    this.width = width;
    this.maxWidth = maxWidth;
    this.fontSize = 30;
    this.isBottomOffset = isBottomOffset;

    let group = new Konva.Group({
      x: x,
      y: y,
    });

    // Determines if ruler is drawn on the right or left side
    let offsetMultiplier = this.isBottomOffset ? -1 : 1;
    // Offset based on isLeftOffset
    let offsetValue = this.offset * offsetMultiplier;
    let leftVerticalLine = new Konva.Line({
      points: [x, y, x, offsetValue],
      stroke: 'blue',
      strokeWidth: this.strokeWidth,
    });
    group.add(leftVerticalLine);
    this.leftVerticalLine = leftVerticalLine;

    let rightVerticalLine = new Konva.Line({
      points: [x + width, y, x + width, offsetValue],
      stroke: 'blue',
      strokeWidth: this.strokeWidth,
    });
    group.add(rightVerticalLine);
    this.rightVerticalLine = rightVerticalLine;

    let horizontalLine = new Konva.Line({
      points: [0, y + offsetValue, width, y + offsetValue],
      stroke: 'blue',
      strokeWidth: this.strokeWidth,
    });
    group.add(horizontalLine);
    this.horizontalLine = horizontalLine;

    this.textHeight = this.offset + this.fontSize / 2;
    let textY = isBottomOffset ? y - (this.textHeight + this.fontSize / 2) : y;
    let textValue = new Konva.Text({
      x: x,
      y: textY,
      // fontFamily: this.fontFamily, //? where did u get this from?
      fontSize: this.fontSize,
      width: width,
      height: this.textHeight,
      align: 'center',
      verticalAlign: 'bottom',
      text: '27v',
      fill: this.fontColor,
    });
    group.add(textValue);
    this.textValue = textValue;

    this.group = group;
  }

  getPosition() {
    let pos = {
      x: this.group.x(),
      y: this.group.y(),
    };
    return pos;
  }

  setPosition(relativeNewPos: {x: number, y: number}) {
    //Set Y
    this.y = Math.floor(relativeNewPos.y);
    this.group.setAttrs({
      y: this.y,
    });
    //Compute Width
    let width = Math.abs(relativeNewPos.x);
    this.setWidth(width);
  }

  setWidth(newWidth: number) {
    // Determines if ruler is drawn on the right or left side
    let offsetMultiplier = this.isBottomOffset ? -1 : 1;
    // Offset based on isLeftOffset
    let offsetValue = this.offset * offsetMultiplier;
    this.width = newWidth;
    this.horizontalLine.setAttrs({
      points: [0, offsetValue, this.width, offsetValue],
    });

    this.leftVerticalLine.setAttrs({
      points: [this.x, 0, this.x, offsetValue],
    });

    this.rightVerticalLine.setAttrs({
      points: [this.x + this.width, 0, this.x + this.width, offsetValue],
    });

    let textWidth =
      this.width <= this.fontSize * 2 ? this.fontSize * 2 : this.width;
    let textXOffset =
      this.width <= this.fontSize ? -(this.fontSize - this.width) : 0;
    let textY = this.isBottomOffset
      ? -(this.textHeight + this.fontSize / 2)
      : 0;

    //Compute values
    let widthRatio = (this.width / this.maxWidth) * 100;
    let ratioValue = Math.floor(widthRatio) + 'h';
    this.textValue.setAttrs({
      width: textWidth,
      x: textXOffset,
      y: textY,
      text: ratioValue,
    });
  }

  setBottomOffset(isBottomOffset: boolean) {
    this.isBottomOffset = isBottomOffset;
  }

  setOpacity(newOpacity: number) {
    this.group.opacity(newOpacity);
  }
}

export default HorizontalRuler