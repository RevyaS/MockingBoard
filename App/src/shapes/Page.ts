import Konva from 'konva';
import APPSTATE from '../states/AppState';
import { Rect } from 'konva/lib/shapes/Rect';
import { Group } from 'konva/lib/Group';
import HorizontalSlideGuide from './HorizontalSlizeGuide'; 

class Page {
  origWidth: number;
  origHeight: number;
  fill: string;
  zIndex: number;
  pageShape: Rect;
  group: Group

  mouseEntered = false;
  gradientOutlineAmount = 6;
  gradientWidth = 38;
  gradient = <any>[];
  state = APPSTATE.DEFAULT;

  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public layerIndex: number,
  ) {
    this.origWidth = width;
    this.origHeight = height;
    this.width = width;
    this.height = height;
    this.fill = '#6f6f6f';
    this.x = x;
    this.y = y;
    this.layerIndex = layerIndex;
    this.zIndex = layerIndex;

    const group = new Konva.Group({
      x: x,
      y: y,
      
    });

    //* Generate gradient
    const gradientOpacityDivision = 1 / this.gradientOutlineAmount;
    const gradientWidthDivision =
      this.gradientWidth / this.gradientOutlineAmount;

    for (let i = 1; i <= this.gradientOutlineAmount; ++i) {
      let strokeWidth = this.gradientWidth - gradientWidthDivision * (i - 1);

      let gradientOpacity = gradientOpacityDivision * i;
      let strokeColor = `rgba(186, 104, 237, ${gradientOpacity})`;
      let pageShapeOutline = new Konva.Rect({
        x: 0,
        y: 0,
        width: this.width,
        height: this.height,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });

      //* might go error
      this.gradient.push(pageShapeOutline);
      group.add(pageShapeOutline);
    }

    this.setGradientOpacity(0);

    this.pageShape = new Konva.Rect({
      x: 0,
      y: 0,
      width: this.width,
      height: this.height,
      fill: this.fill,
    });

    group.add(this.pageShape);
    
    let horizontalSliceGuideLine = new HorizontalSlideGuide(0, 0, this.width)
    
    // TODO
    group.add(horizontalSliceGuideLine.group)
    
    horizontalSliceGuideLine = horizontalSliceGuideLine
    
    // let verticalRuler = new Vertical
    
    this.group = group
  }

  //***************** Functions ************************/'
  setGradientOpacity(newOpacity: number) {
    for (let gradient of this.gradient) {
      gradient.setOpacity(newOpacity);
    }
  }

  setFillColor(newColor: any) {
    this.pageShape.setAttr('fill', newColor);
  }

  setOpacity(newOpacity: any) {
    this.group.opacity(newOpacity)
  }
}

export default Page;
