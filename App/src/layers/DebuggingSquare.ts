import Konva from 'konva';
import MainLayer from './MainLayer';
import Page from '../shapes/Page';

export class DebuggingSquare {
  width: number;
  height: number;
  stroke: string;
  fontSize: number;
  fontFamily: string;
  fontColor: string;
  currentPageData: Konva.Text[];
  appState: Konva.Text;
  mouse: Konva.Text;
  layerScale: Konva.Text;
  currentLayer: Konva.Text;
  currentPage: any;
  mainLayer: MainLayer;
  borderSquare: Konva.Rect;
  layerSize: any;

  pageSize: any;
  layer: Konva.Layer;

  layerBounds00: Konva.Text;
  layerBounds01: Konva.Text;
  layerBounds10: Konva.Text;
  layerBounds11: Konva.Text;
  pageBounds00: Konva.Text;
  pageBounds01: Konva.Text;
  pageBounds10: Konva.Text;
  pageBounds11: Konva.Text;

  constructor(x: number, y: number, mainLayer: MainLayer) {
    //Constants
    this.width = 190;
    this.height = 400;
    this.stroke = '#550000';
    this.fontSize = 16;
    this.fontFamily = 'Calibri';
    this.fontColor = 'white';

    //Data
    this.currentPageData = [];
    this.currentPage = null;

    //Dependencies
    this.mainLayer = mainLayer;

    let layer = new Konva.Layer();

    //Create Square
    this.borderSquare = new Konva.Rect({
      x: x,
      y: y,
      width: this.width,
      height: this.height,
      stroke: this.stroke,
      fill: 'black',
    });
    layer.add(this.borderSquare);

    let yPos = 3;
    //Mouse Pos Text
    this.mouse = new Konva.Text({
      x: x,
      y: yPos,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      text: 'mouse: (0, 0)',
      fill: this.fontColor,
    });
    layer.add(this.mouse);

    yPos += this.fontSize;
    //APP State Text
    this.appState = new Konva.Text({
      x: x,
      y: yPos,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      text: 'appState: DEFAULT',
      fill: this.fontColor,
    });
    layer.add(this.appState);

    //Page Bounds
    yPos += this.fontSize;
    this.layerBounds00 = new Konva.Text({
      x: x,
      y: yPos,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      text: 'layerPage00: (' + mainLayer.position.x + ',' + mainLayer.position.y + ')',
      fill: this.fontColor,
    });
    layer.add(this.layerBounds00);

    yPos += this.fontSize;
    this.layerBounds01 = new Konva.Text({
      x: x,
      y: yPos,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      text:
        'layerPage01: (' +
        mainLayer.position.x +
        ',' +
        (mainLayer.position.y + mainLayer.height) +
        ')',
      fill: this.fontColor,
    });
    layer.add(this.layerBounds01);

    yPos += this.fontSize;
    this.layerBounds10 = new Konva.Text({
      x: x,
      y: yPos,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      text:
        'layerPage10: (' +
        (mainLayer.position.x + mainLayer.width) +
        ',' +
        mainLayer.position.y +
        ')',
      fill: this.fontColor,
    });
    layer.add(this.layerBounds10);

    yPos += this.fontSize;
    this.layerBounds11 = new Konva.Text({
      x: x,
      y: yPos,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      text:
        'layerPage11: (' +
        (mainLayer.position.x + mainLayer.width) +
        ',' +
        (mainLayer.position.y + mainLayer.height) +
        ')',
      fill: this.fontColor,
    });
    layer.add(this.layerBounds11);

    //Selected Page Scale
    yPos += this.fontSize;
    this.layerScale = new Konva.Text({
      x: x,
      y: yPos,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      text: 'layerPageScale: ' + mainLayer.getScale().x,
      fill: this.fontColor,
    });
    layer.add(this.layerScale);

    yPos += this.fontSize;
    this.currentLayer = new Konva.Text({
      x: x,
      y: yPos,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      text: 'currentLayer: ' + 0,
      fill: this.fontColor,
    });
    layer.add(this.currentLayer);

    //Selected Page Size
    yPos += this.fontSize;
    this.layerSize = new Konva.Text({
      x: x,
      y: yPos,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      text: 'layerPageSize: (' + mainLayer.width + ',' + mainLayer.height + ')',
      fill: this.fontColor,
    });
    layer.add(this.layerSize);

    //Selected Page Bounds
    yPos += this.fontSize;
    this.pageBounds00 = new Konva.Text({
      x: x,
      y: yPos,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      text: 'selectedPage00: (' + mainLayer.position.x + ',' + mainLayer.position.y + ')',
      fill: this.fontColor,
    });
    layer.add(this.pageBounds00);
    this.pageBounds00.opacity(0);
    this.currentPageData.push(this.pageBounds00);

    yPos += this.fontSize;
    this.pageBounds01 = new Konva.Text({
      x: x,
      y: yPos,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      text:
        'selectedPage01: (' +
        mainLayer.position.x +
        ',' +
        (mainLayer.position.y + mainLayer.height) +
        ')',
      fill: this.fontColor,
    });
    layer.add(this.pageBounds01);
    this.pageBounds01.opacity(0);
    this.currentPageData.push(this.pageBounds01);

    yPos += this.fontSize;
    this.pageBounds10 = new Konva.Text({
      x: x,
      y: yPos,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      text:
        'selectedPage10: (' +
        (mainLayer.position.x + mainLayer.width) +
        ',' +
        mainLayer.position.y +
        ')',
      fill: this.fontColor,
    });
    layer.add(this.pageBounds10);
    this.pageBounds10.opacity(0);
    this.currentPageData.push(this.pageBounds10);

    yPos += this.fontSize;
    this.pageBounds11 = new Konva.Text({
      x: x,
      y: yPos,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      text:
        'selectedPage11: (' +
        (mainLayer.position.x + mainLayer.width) +
        ',' +
        (mainLayer.position.y + mainLayer.height) +
        ')',
      fill: this.fontColor,
    });
    layer.add(this.pageBounds11);
    this.pageBounds11.opacity(0);
    this.currentPageData.push(this.pageBounds11);

    //Selected Page Size
    yPos += this.fontSize;
    this.pageSize = new Konva.Text({
      x: x,
      y: yPos,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      text:
        'selectedPageSize: (' + mainLayer.width + ',' + mainLayer.height + ')',
      fill: this.fontColor,
    });
    layer.add(this.pageSize);
    this.pageSize.setOpacity(0);
    this.currentPageData.push(this.pageSize);

    this.layer = layer;
  }

  //Event Functions
  onMouseMove() {
    let pos = this.layer.getRelativePointerPosition();
    this.mouse.setText('mouse: (' + Math.floor(pos.x) + ',' + Math.floor(pos.y) + ')');
  }

  onPageScale() {
    this.layerScale.setText(
      'layerPageScale: ' + this.mainLayer.getScale().x.toFixed(2),
    );
    this.layerSize.setText(
      'layerPageSize: (' +
      this.mainLayer.width +
      ',' +
      this.mainLayer.height +
      ')',
    );
    this.layerBounds00.setText(
      'layerPage00: (' + this.mainLayer.position.x + ',' + this.mainLayer.position.y + ')',
    );
    this.layerBounds01.setText(
      'layerPage01: (' +
      this.mainLayer.position.x +
      ',' +
      (this.mainLayer.position.y + this.mainLayer.height) +
      ')',
    );
    this.layerBounds10.setText(
      'layerPage10: (' +
      (this.mainLayer.position.x + this.mainLayer.width) +
      ',' +
      this.mainLayer.position.y +
      ')',
    );
    this.layerBounds11.setText(
      'layerPage11: (' +
      (this.mainLayer.position.x + this.mainLayer.width) +
      ',' +
      (this.mainLayer.position.y + this.mainLayer.height) +
      ')',
    );
  }

  onStateChanged(newState: any) {
    this.appState.setText('appState: ' + newState);
  }

  setOpacity(opacity: number) {
    this.layer.opacity(opacity);
  }

  setCurrentPage(currentPage: Page) {
    this.currentPage = currentPage;
    for (let pagedata of this.currentPageData) {
      pagedata.opacity(1);
      //Update values
      this.pageBounds00.setAttrs({
        text: 'selectedPage00: (' + currentPage.position.x + ',' + currentPage.position.y + ')',
      });

      this.pageBounds01.setAttrs({
        text:
          'selectedPage01: (' +
          currentPage.position.x +
          ',' +
          (currentPage.position.y + currentPage.size.y) +
          ')',
      });

      this.pageBounds10.setAttrs({
        text:
          'selectedPage10: (' +
          (currentPage.position.x + currentPage.size.x) +
          ',' +
          currentPage.position.y +
          ')',
      });

      this.pageBounds11.setAttrs({
        text:
          'selectedPage11: (' +
          (currentPage.position.x + currentPage.size.x) +
          ',' +
          (currentPage.position.y + currentPage.size.y) +
          ')',
      });

      //Selected Page Size
      this.pageSize.setAttrs({
        text:
          'selectedPageSize: (' +
          currentPage.size.x +
          ',' +
          currentPage.size.y +
          ')',
      });
    }
  }

  removeCurrentPage() {
    this.currentPage = null;
    for (let pagedata of this.currentPageData) {
      pagedata.opacity(0);
    }
  }
}
