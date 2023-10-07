import Konva from 'konva';
import APPSTATE from '../states/AppState';
import Page from '../shapes/Page';
import PAGEEVENTS from '../states/PageEvents';
import { Layer } from 'konva/lib/Layer';
import Vector2 from '../models/Vector2';

export class MainLayer {
  //* Just type public in this fields if u want to make it public
  x = 240;
  y = 60;
  origWidth = 890;
  origHeight = 450;
  layers = <any>[];
  outerLayer = <any>[];

  state: string;
  selectedPage: Page | null = null;
  width: number;
  height: any;
  layer: Layer;
  currentLayer = 0;
  group: Konva.Group;
  page: Page;
  layerCtr: number;

  public getScale: any;

  constructor() {
    this.state = APPSTATE.DEFAULT;
    this.layerCtr = 1;
    const layer = new Konva.Layer();
    this.width = this.origWidth;
    this.height = this.origHeight;

    const group = new Konva.Group({
      x: this.x,
      y: this.y,
    });

    this.group = group;
    layer.add(group);

    //* Iniial Page Size
    const page = new Page(new Vector2(0, 0), this.origWidth, this.origHeight, 0);

    group.add(page.group);

    this.page = page;
    this.layers.push([page]);
    this.outerLayer.push(page);

    let mainLayerRef = this;
    this.page.group.on(PAGEEVENTS.MOUSEENTERED, (page) => {
      mainLayerRef.onPageMouseEntered(page);
    });

    this.layer = layer;

    this.getScale = () => {
      return this.group.scale();
    };
  }

  onPageMouseEntered(page: Page) {
    this.selectedPage = page;
    this.layer.fire(PAGEEVENTS.MOUSEENTERED, page);
  }

  onPageMouseExited() {
    this.selectedPage = null;
    this.layer.fire(PAGEEVENTS.MOUSEEXITED);
  }

  onStateChanged(newState: any) {
    this.state = newState;
    for (let currPage of this.outerLayer) {
      currPage.setState(newState);
    }
  }

  onMouseMove() {
    //* Check if within layer bounds
    let relativeMouse = this.group.getRelativePointerPosition();
    let mouseBoundData = this.getMouseBoundsData(relativeMouse);

    if (!mouseBoundData.inBounds.y || !mouseBoundData.inBounds.x) {
      this.onPageMouseExited();
    }

    for (let page of this.outerLayer) {
      page.onMouseMove();
    }

    if (this.selectedPage == null) return;

    let relativeMouseFromSelectedPage = {
      x: relativeMouse.x - this.selectedPage.position.x,
      y: relativeMouse.y - this.selectedPage.position.y,
    };

    switch (this.state) {
      case APPSTATE.HORIZONTALSLICE:
        this.selectedPage.showHorizontalSliceGuideLine();
        break;
      case APPSTATE.VERTICALSLICE:
        this.selectedPage.showVerticalSliceGuideLine();
        break;
      case APPSTATE.CIRCLE:
        this.selectedPage.showCircleGuideLine(relativeMouseFromSelectedPage);
        break;
    }
  }

  zoomPage(deltaY: number) {
    //* Update Scale
    let zoomAmount = 1.0 + (10.0 / deltaY) * -1;
    let zoomCenter = this.layer.getRelativePointerPosition();
    let currentScale = this.group.scale();
    this.scaleBy(zoomAmount);

    //* Reposition
    let newScale = this.group.scale();
    let scalarOffset = currentScale!.x - newScale!.x;
    let offset = {
      x: Math.floor(zoomCenter.x) * scalarOffset,
      y: Math.floor(zoomCenter.y) * scalarOffset,
    };


    let currPosition = this.group.getPosition();
    let newPosition = {
      x: currPosition.x + offset.x,
      y: currPosition.y + offset.y,
    };

    this.x = Math.floor(newPosition.x);
    this.y = Math.floor(newPosition.y);

    let newGroupPos = {
      x: this.x,
      y: this.y,
    };

    this.group.setAbsolutePosition(newGroupPos);
  }

  scaleBy(scaleRatio: number) {
    let currScale = this.getScale();
    let scaleX = currScale.x * scaleRatio;
    let scaleY = currScale.y * scaleRatio;
    let newScale = {
      x: scaleX,
      y: scaleY,
    };

    this.width = Math.floor(this.origWidth * scaleX);
    this.height = Math.floor(this.origHeight * scaleX);
    this.group.scale(newScale);
  }

  onMouseClicked() {
    let pos = this.layer.getRelativePointerPosition();

    //* Find Division
    let relativePos = this.getRelativePositionUnscaled(pos);

    if (this.selectedPage === null) return;
    switch (this.state) {
      case APPSTATE.HORIZONTALSLICE:
        this.sliceVertically(relativePos);
        break;
      case APPSTATE.VERTICALSLICE:
        this.sliceHorizontally(relativePos);
        break;
      case APPSTATE.CIRCLE:
        break;
    }
  }

  sliceVertically(mousePos: any) {
    let layerPages = <any>[];
    let parentPage = this.selectedPage;
    this.removeElementByValue(this.outerLayer, this.selectedPage);
    this.selectedPage!.mouseExit();
    this.selectedPage!.setState(APPSTATE.DEFAULT);
    this.currentLayer++;

    //* Create top position based on selected page
    let height = Math.floor(mousePos.y - parentPage!.position.y);
    let topPage = new Page(
      new Vector2(parentPage!.position.x, parentPage!.position.y),
      parentPage!.origWidth,
      height,
      this.currentLayer,
    );

    this.group.add(topPage.group);
    layerPages.push(topPage);

    this.outerLayer.push(topPage);
    this.layerCtr++;
    let mainLayerRef = this;
    topPage.PanelName = "Panel" + this.layerCtr;
    topPage.group.on(PAGEEVENTS.MOUSEENTERED, (page) => {
      mainLayerRef.onPageMouseEntered(page);
    });

    //* Create bottom position layer
    let remainingHeight = parentPage!.origHeight - height;

    let bottomPage = new Page(
      new Vector2(parentPage!.position.x, height + parentPage!.position.y),
      parentPage!.origWidth,
      remainingHeight,
      this.currentLayer,
    );

    this.group.add(bottomPage.group);

    layerPages.push(bottomPage);

    this.outerLayer.push(bottomPage);

    bottomPage.group.on(PAGEEVENTS.MOUSEENTERED, (page) => {
      mainLayerRef.onPageMouseEntered(page);
    });
    this.layerCtr++;
    bottomPage.PanelName = "Panel" + this.layerCtr;

    this.layers.push(layerPages);
  }

  sliceHorizontally(mousePos: any) {
    let layerPages = <any>[];
    let parentPage = this.selectedPage;
    this.removeElementByValue(this.outerLayer, this.selectedPage);

    this.selectedPage!.mouseExit();
    this.currentLayer++;

    //* Create left position based on selected page
    let width = Math.floor(mousePos.x - parentPage!.position.x);
    let leftPage = new Page(
      new Vector2(parentPage!.position.x, parentPage!.position.y),
      width,
      parentPage!.origHeight,
      this.currentLayer,
    );

    this.group.add(leftPage.group);

    layerPages.push(leftPage);
    this.outerLayer.push(leftPage);
    let mainLayerRef = this;
    leftPage.group.on(PAGEEVENTS.MOUSEENTERED, (page) => {
      mainLayerRef.onPageMouseEntered(page);
    });
    this.layerCtr++;
    leftPage.PanelName = "Panel" + this.layerCtr;

    //* Create bottom position layer
    let remainingWidth = parentPage!.origWidth - width;
    let rightPage = new Page(
      new Vector2(parentPage!.position.x + width, parentPage!.position.y),
      remainingWidth,
      parentPage!.origHeight,
      this.currentLayer,
    );
    this.group.add(rightPage.group);

    rightPage.group.on(PAGEEVENTS.MOUSEENTERED, (page) => {
      mainLayerRef.onPageMouseEntered(page);
    });
    layerPages.push(rightPage);
    this.outerLayer.push(rightPage);
    this.layers.push(layerPages);
  }

  removeElementByValue(arr: [], value: any) {
    for (let i = 0; i < arr.length; ++i) {
      if (arr[i] === value) {
        arr.splice(i, 1);
        --i; //* decrement index to recheck the current index after removal
      }
    }
  }

  getRelativePositionUnscaled(mousePos: any) {
    //* Compute Relative Position of mouse to Page
    let relativePosition = {
      x: mousePos.x - this.x,
      y: mousePos.y - this.y,
    };

    //* Get ratio
    let relativeRatio = {
      x: relativePosition.x / this.width,
      y: relativePosition.y / this.height,
    };

    let relativePositionUnscaled = {
      x: this.origWidth * relativeRatio.x,
      y: this.origHeight * relativeRatio.y,
    };

    return relativePositionUnscaled;
  }

  getMouseBoundsData(mousePos: any) {
    let topYBounds = 0 > mousePos.y;
    let bottomYBounds = this.origHeight <= mousePos.y;
    let inYBounds = !(topYBounds || bottomYBounds);
    let onTopHalf = this.y + this.height / 2 > mousePos.y;
    let onLeftHalf = this.x + this.width / 2 > mousePos.x;

    let topXBounds = 0 > mousePos.x;
    let bottomXBounds = this.origWidth < mousePos.x;
    let inXBounds = !(topXBounds || bottomXBounds);

    let mouseBoundsData = {
      topBounds: {
        x: topXBounds,
        y: topYBounds,
      },
      bottomBounds: {
        x: bottomXBounds,
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

  generateCircle(relativePos: any) {
    let circle = new Konva.Circle({
      x: 350,
      y: 90,
      fill: 'green',
      radius: 50,
      draggable: true,
    });

    let maxZIndex = this.selectedPage!.group.children!.length! - 1;

    //* set the position of the circle
    circle.x(relativePos.x);
    circle.y(relativePos.y);

    this.selectedPage!.mouseExit();
    this.selectedPage!.setState(APPSTATE.DEFAULT);

    this.selectedPage!.group.add(circle);
  }
}

export default MainLayer;
