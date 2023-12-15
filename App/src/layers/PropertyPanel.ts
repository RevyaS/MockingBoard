import Konva from 'konva';
import Page from '../shapes/Page';
import { Layer } from 'konva/lib/Layer';
import { KonvaEventObject } from 'konva/lib/Node';
import { ExtractEventData } from '../pureFunctions/event';

export class PropertyPanel {
  layer: Konva.Layer;
  group: Konva.Group;
  panel: PropertyFields;
  pages: Page;

  constructor(
    public page: Page
  ) {
    this.pages = page;
    let property = new PropertyFields();
    this.layer = new Konva.Layer();

    var stageWidth = window.innerWidth;
    console.log(stageWidth);
    this.group = new Konva.Group({
      x: 1920 - (103 + 200), //16 68
      y: 0
    });

    let PropertyPanel = new Konva.Rect({
      x: 0,
      y: 0,
      fill: "#363636",
      width: 400,
      height: 2000,
    });
    let tab = new Konva.Rect({
      x: 0,
      y: 0,
      fill: "white",
      width: 300,
      height: 300,
    });
    this.panel = new PropertyFields();
    let x_ = 0;

    var Name = this.panel.Panels("Property Name:", "0", x_, page.PanelName);
    var origWidth = this.panel.Panels("Orign Width", "0", x_ + 25, page.origSize.x);
    var origHeight = this.panel.Panels("Orign Height", "0", x_ + 50, page.origSize.y);
    var currentWidth = this.panel.Panels("Width", "0", x_ + 75, page.size.x);
    var currentHeight = this.panel.Panels("Height", "0", x_ + 100, page.size.y);
    var fill = this.panel.Panels("Fill", "0", x_ + 125, page.fill);
    var xPos = this.panel.Panels("X", "0", x_ + 150, page.position.x);
    var yPos = this.panel.Panels("y", "0", x_ + 175, page.position.y);
    var layerIndex = this.panel.Panels("Layer Index", "0", x_ + 200, page.layerIndex);
    var mouseEntered = this.panel.Panels("Mouse Entered", "0", x_ + 225, page.mouseEntered);
    var gradientOutlineAmount = this.panel.Panels("Gradient Outline Amount", "0", x_ + 250, page.gradientOutlineAmount);
    var gradientWidth = this.panel.Panels("Gradient Width", "0", x_ + 275, page.gradientWidth);
    var zIndex = this.panel.Panels("zIndex", "0", x_ + 300, page.zIndex);
    var state = this.panel.Panels("State", "0", x_ + 325, page.state);

    this.group.add(PropertyPanel)
    this.group.add(Name)
    this.group.add(origWidth)
    this.group.add(origHeight)
    this.group.add(currentWidth)
    this.group.add(currentHeight)
    this.group.add(fill)
    this.group.add(xPos)
    this.group.add(yPos)
    this.group.add(layerIndex)
    this.group.add(mouseEntered)
    this.group.add(gradientOutlineAmount)
    this.group.add(gradientWidth)
    this.group.add(zIndex)
    this.group.add(state)

    this.layer.add(this.group);
    this.layer = this.layer;
  }
  Panelset(ev: KonvaEventObject<any>) {
    this.pages = ExtractEventData(ev);
  }
  PanelClick() {
    if (this.pages != null) {
      let layer = new Konva.Layer();
      this.group = new Konva.Group({
        x: 1920 - (103 + 200), //16 68
        y: 0
      });
      this.layer.clear();

      let property = new PropertyFields();
      let PropertyPanel = new Konva.Rect({
        x: 0,
        y: 0,
        fill: "#363636",
        width: 300,
        height: 950,
      });
      let tab = new Konva.Rect({
        x: 0,
        y: 0,
        fill: "white",
        width: 300,
        height: 300,
      });

      let panel = new PropertyFields();
      let x_ = 0;

      var Name = this.panel.Panels("Property Name:", "0", x_, this.pages.PanelName);
      var origWidth = this.panel.Panels("Orign Width", "0", x_ + 25, this.pages.origSize.x);
      var origHeight = this.panel.Panels("Orign Height", "0", x_ + 50, this.pages.origSize.y);
      var currentWidth = this.panel.Panels("Width", "0", x_ + 75, this.pages.size.x);
      var currentHeight = this.panel.Panels("Height", "0", x_ + 100, this.pages.size.y);
      var fill = this.panel.Panels("Fill", "0", x_ + 125, this.pages.fill);
      var xPos = this.panel.Panels("X", "0", x_ + 150, this.pages.position.x);
      var yPos = this.panel.Panels("y", "0", x_ + 175, this.pages.position.y);
      var layerIndex = this.panel.Panels("Layer Index", "0", x_ + 200, this.pages.layerIndex);
      var mouseEntered = this.panel.Panels("Mouse Entered", "0", x_ + 225, this.pages.mouseEntered);
      var gradientOutlineAmount = this.panel.Panels("Gradient Outline Amount", "0", x_ + 250, this.pages.gradientOutlineAmount);
      var gradientWidth = this.panel.Panels("Gradient Width", "0", x_ + 275, this.pages.gradientWidth);
      var zIndex = this.panel.Panels("zIndex", "0", x_ + 300, this.pages.zIndex);
      var state = this.panel.Panels("State", "0", x_ + 325, this.pages.state);

      this.group.add(PropertyPanel);
      this.group.add(Name);
      this.group.add(origWidth);
      this.group.add(origHeight);
      this.group.add(currentWidth);
      this.group.add(currentHeight);
      this.group.add(fill);
      this.group.add(xPos);
      this.group.add(yPos);
      this.group.add(layerIndex);
      this.group.add(mouseEntered);
      this.group.add(gradientOutlineAmount);
      this.group.add(gradientWidth);
      this.group.add(zIndex);
      this.group.add(state);

      this.layer.add(this.group);
    }
  }
}


class PropertyFields {
  Panels(
    text_: string,
    x: string,
    y: number,
    propValue: any) {

    var group = new Konva.Group({
      x: Number(x),
      y: Number(y)
    });
    let Property = new Konva.Text({
      text: text_,
      x: 5,
      y: 110,
      fontSize: 14,
      fill: "white"
    });
    let panels = new Konva.Rect({
      x: 2,
      y: 105,
      fill: "#2E2E2E",
      width: 170,
      height: 25,
      strokeWidth: 1,
      stroke: "white"
    });
    let textbox = new Konva.Rect({
      x: 170,
      y: 105,
      fill: "#2E2E2E",
      width: 130,
      height: 25,
      strokeWidth: 1,
      stroke: "white"
    });
    let propertyValue = new Konva.Text({
      text: propValue,
      x: 175,
      y: 110,
      fontSize: 14,
      fill: "white"
    });


    group.add(panels);
    group.add(textbox);
    group.add(Property);
    group.add(propertyValue);
    return group;
  }
}