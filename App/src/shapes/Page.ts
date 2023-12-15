import Konva from 'konva';
import APPSTATE from '../states/AppState';
import { Rect } from 'konva/lib/shapes/Rect';
import { Group } from 'konva/lib/Group';
import HorizontalSlideGuide from './HorizontalSlizeGuide';
import VerticalRuler from '../ruler/VerticalRuler';
import VerticalSliceGuide from './VerticalSliceGuide';
import HorizontalRuler from '../ruler/HorizontalRuler';
import CircleGuide from './CircleGuide';
import PAGEEVENTS from '../states/PageEvents';
import Vector2 from '../models/Vector2';
import { GenerateEventFire } from '../pureFunctions/event';
class Page {
  origSize: Vector2;
  fill: string;
  zIndex: number;
  pageShape: Rect;
  group: Group;
  gradient = <any>[];
  PanelName: string;

  horizontalSliceGuideLine: HorizontalSlideGuide;
  verticalRuler: VerticalRuler;
  verticalSliceGuideLine: VerticalSliceGuide;
  horizontalRuler: HorizontalRuler;

  mouseEntered = false;
  gradientOutlineAmount = 6;
  gradientWidth = 38;
  state = APPSTATE.DEFAULT;
  circleGuideLine: CircleGuide;
  mouseDebugMode: boolean = true;
  constructor(
    public position: Vector2,
    public size: Vector2,
    public layerIndex: number
  ) {
    this.origSize = size;
    this.PanelName = 'Panel1';
    this.fill = '#6f6f6f';
    this.layerIndex = layerIndex;
    this.zIndex = layerIndex;

    const group = new Konva.Group({
      x: this.position.x,
      y: this.position.y,
    });

    this.group = group;

    generateGradient(this);
    this.pageShape = generatePage(this);
    this.horizontalSliceGuideLine = generateHorizontalGuideLine(this);
    this.verticalRuler = generateVerticalRuler(this);
    this.verticalSliceGuideLine = generateVerticalSliceGuideLine(this);
    this.circleGuideLine = generateCircleGuideLine();
    this.horizontalRuler = generateHorizontalRuler(this);

    function generateHorizontalRuler(self: Page) {
      let horizontalRuler = new HorizontalRuler(0, 0, 100, self.size.x, true);
      group.add(horizontalRuler.group);
      horizontalRuler.setOpacity(0);
      return horizontalRuler;
    }

    function generateCircleGuideLine() {
      let circleGuideLine = new CircleGuide(0, 0, 50);
      group.add(circleGuideLine.group);
      circleGuideLine.setOpacity(0);
      return circleGuideLine;
    }

    function generateVerticalSliceGuideLine(self: Page) {
      let verticalSliceGuideLine = new VerticalSliceGuide(0, 0, self.size.y);
      group.add(verticalSliceGuideLine.group);
      verticalSliceGuideLine.setOpacity(0);
      return verticalSliceGuideLine;
    }

    function generateVerticalRuler(self: Page) {
      let verticalRuler = new VerticalRuler(0, 0, 100, self.size.y, true);
      group.add(verticalRuler.group);
      verticalRuler.setOpacity(0);
      return verticalRuler;
    }

    function generateHorizontalGuideLine(self: Page) {
      let horizontalSliceGuideLine = new HorizontalSlideGuide(0, 0, self.size.x);
      self.group.add(horizontalSliceGuideLine.group);
      horizontalSliceGuideLine.setOpacity(0);
      return horizontalSliceGuideLine;
    }

    function generatePage(self: Page) {
      let pageShape = new Konva.Rect({
        x: 0,
        y: 0,
        width: self.size.x,
        height: self.size.y,
        fill: self.fill,
      });

      self.group.add(pageShape);
      return pageShape;
    }

    function generateGradient(self: Page) {
      //* Generate gradient
      const gradientOpacityDivision = 1 / self.gradientOutlineAmount;
      const gradientWidthDivision =
        self.gradientWidth / self.gradientOutlineAmount;

      for (let i = 1; i <= self.gradientOutlineAmount; ++i) {
        let strokeWidth = self.gradientWidth - gradientWidthDivision * (i - 1);

        let gradientOpacity = gradientOpacityDivision * i;
        let strokeColor = `rgba(186, 104, 237, ${gradientOpacity})`;
        let pageShapeOutline = new Konva.Rect({
          x: 0,
          y: 0,
          width: self.size.x,
          height: self.size.y,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
        });

        //* might go error
        self.gradient.push(pageShapeOutline);
        self.group.add(pageShapeOutline);
      }

      self.setGradientOpacity(0);
    }
  }

  //***************** Functions ************************/'
  setPosition(x: number, y: number) {
    this.position.updateFloored(x, y);
    this.group.setAttrs({
      x: this.position.x,
      y: this.position.y,
    });
  }



  getPosition() {
    let pos = {
      x: this.group.x(),
      y: this.group.y(),
    };
    return pos;
  }

  setState(newState: any) {
    this.state = newState;
    switch (newState) {
      case APPSTATE.DEFAULT:
        this.horizontalSliceGuideLine.setOpacity(0);
        this.verticalSliceGuideLine.setOpacity(0);
        this.circleGuideLine.setOpacity(0);
        this.horizontalRuler.setOpacity(0);
        this.verticalRuler.setOpacity(0);
        break;
    }
  }

  onMouseMove() {
    let relativeMouse = this.group.getRelativePointerPosition();
    if (this.mouseDebugMode) {
      console.log('DEBUG PAGE MOUSEBOUNDSDATA', relativeMouse, this.position);
    }
    let mouseBoundsData = this.getMouseBoundsData(relativeMouse);
    if (mouseBoundsData.inBounds.y && mouseBoundsData.inBounds.x) {
      this.mouseEnter();
    } else {
      this.mouseExit();
    }
  }

  mouseEnter() {
    //! might be error
    if (!this.mouseEntered && this.group?.parent?.children) {
      this.mouseEntered = true;
      this.setGradientOpacity(1);
      this.zIndex = this.group.parent.children.length - 1;
      this.group.zIndex(this.zIndex);

      //Generate event
      const eventFire = GenerateEventFire(this.group)(PAGEEVENTS.MOUSEENTERED)(this);
    }
  }

  mouseExit() {
    if (this.mouseEntered) {
      this.mouseEntered = false;
      this.setGradientOpacity(0);
      this.zIndex = this.layerIndex;
      this.group.zIndex(this.zIndex);
      //Hide guidelines
      this.horizontalSliceGuideLine.setOpacity(0);
      this.verticalSliceGuideLine.setOpacity(0);
      this.circleGuideLine.setOpacity(0);
      this.horizontalRuler.setOpacity(0);
      this.verticalRuler.setOpacity(0);
      this.group.fire(PAGEEVENTS.MOUSEEXITED);
    }
  }

  showHorizontalSliceGuideLine() {
    let relativeMouseAny = this.group.getRelativePointerPosition();
    let relativeMouse = new Vector2(relativeMouseAny.x, relativeMouseAny.y);
    let relativePositionUnscaled =
      this.getRelativePositionUnscaled(relativeMouse);

    let mouseBoundsData = this.getMouseBoundsData(relativeMouse);
    let relativePositionFromParent = {
      x: relativePositionUnscaled.x + this.position.x,
      y: relativePositionUnscaled.y + this.position.y,
    };

    //Set Ruler position
    this.verticalRuler.setLeftOffset(!mouseBoundsData.halfBounds.left);

    //Move guideline
    if (mouseBoundsData.inBounds.y) {
      this.horizontalSliceGuideLine.setOpacity(1);
      this.horizontalSliceGuideLine.setYPosition(relativePositionFromParent.y);

      //Show ruler
      if (mouseBoundsData.inBounds.x) {
        this.verticalRuler.setOpacity(1);
        this.verticalRuler.setPosition(relativePositionFromParent);
      } else {
        this.verticalRuler.setOpacity(0);
      }
    } else {
      this.horizontalSliceGuideLine.setOpacity(0);
      this.verticalRuler.setOpacity(0);
    }
  }

  showVerticalSliceGuideLine() {
    let relativeMouseAny = this.group.getRelativePointerPosition();
    let relativeMouse = new Vector2(relativeMouseAny.x, relativeMouseAny.y);
    let relativePositionUnscaled =
      this.getRelativePositionUnscaled(relativeMouse);
    let mouseBoundsData = this.getMouseBoundsData(relativeMouse);
    let relativePositionFromParent = {
      x: relativePositionUnscaled.x + this.position.x,
      y: relativePositionUnscaled.y + this.position.y,
    };
    //Set Ruler position
    this.horizontalRuler.setBottomOffset(!mouseBoundsData.halfBounds.top);

    //Move guideline
    if (mouseBoundsData.inBounds.x) {
      this.verticalSliceGuideLine.setOpacity(1);
      this.verticalSliceGuideLine.setXPosition(relativePositionFromParent.x);

      //Show ruler
      if (mouseBoundsData.inBounds.y) {
        this.horizontalRuler.setOpacity(1);
        this.horizontalRuler.setPosition(relativePositionFromParent);
      } else {
        this.horizontalRuler.setOpacity(0);
      }
    } else {
      this.verticalSliceGuideLine.setOpacity(0);
      this.horizontalRuler.setOpacity(0);
    }
  }

  showCircleGuideLine(mousePos: { x: number; y: number }) {
    //* Compute Relative Position of mouse to Page
    this.circleGuideLine.setXYPosition(mousePos.x, mousePos.y);
    this.circleGuideLine.setOpacity(1);

    if (this.group && this.group.children) {
      let maxZIndex = this.group.children.length - 1;
      this.circleGuideLine.group.zIndex(maxZIndex);
    }
  }

  getRelativePositionUnscaled(mousePos: Vector2) {
    //Compute Relative Position of mouse to Page
    let relativePositionUnscaled = mousePos.clone();
    let result = relativePositionUnscaled
      .subtractVec(this.position)
      .divideVec(this.size)
      .multiplyVec(this.origSize);

    return result;
  }

  getMouseBoundsData(mousePos: { x: number, y: number }) {
    let topYBounds = this.position.y > mousePos.y + this.position.y;
    let bottomYBounds = this.position.y + this.size.y <= mousePos.y + this.position.y;
    let inYBounds = !(topYBounds || bottomYBounds);
    let onTopHalf = this.position.y + this.size.y / 2 > mousePos.y + this.position.y;
    let onLeftHalf = this.position.x + this.size.x / 2 > mousePos.x;

    let rightXBounds = this.position.x > mousePos.x + this.position.x;
    let leftXBounds = this.position.x + this.size.x < mousePos.x + this.position.x;
    let inXBounds = !(rightXBounds || leftXBounds);

    let mouseBoundsData = {
      topBounds: {
        x: rightXBounds,
        y: topYBounds,
      },
      bottomBounds: {
        x: leftXBounds,
        y: bottomYBounds,
      },
      inBounds: {
        x: inXBounds,
        y: inYBounds,
      },
      halfBounds: {
        top: onTopHalf,
        left: onLeftHalf,
      },
    };
    return mouseBoundsData;
  }

  setGradientOpacity(newOpacity: number) {
    for (let gradient of this.gradient) {
      gradient.opacity(newOpacity);
    }
  }

  setFillColor(newColor: string) {
    this.pageShape.setAttrs({
      fill: newColor,
    });
  }

  setPropertyName(newPanelName: string) {
    this.PanelName = newPanelName;
  }

  setOpacity(newOpacity: number) {
    this.group.opacity(newOpacity);
  }
}

export default Page;
