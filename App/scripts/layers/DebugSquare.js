class DebuggingSquare
{
    constructor(x, y, mainLayer)
    {
        //Constants
        this.width = 190;
        this.height = 200;
        this.stroke = '#550000';
        this.fontSize = 16;
        this.fontFamily = 'Calibri';
        this.fontColor = 'white';

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
            fill: 'black'
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
            fill: this.fontColor
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
            fill: this.fontColor
        });
        layer.add(this.appState);

        //Page Bounds
        yPos += this.fontSize;
        this.pageBounds00 = new Konva.Text({
            x: x,
            y: yPos,
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            text: 'layerPage00: (' + mainLayer.x + ',' 
                + mainLayer.y + ')',
            fill: this.fontColor
        });
        layer.add(this.pageBounds00);

        yPos += this.fontSize;
        this.pageBounds01 = new Konva.Text({
            x: x,
            y: yPos,
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            text: 'layerPage01: ('
                + mainLayer.x + ','
                + (mainLayer.y + mainLayer.height) + ')',
            fill: this.fontColor
        });
        layer.add(this.pageBounds01);

        yPos += this.fontSize;
        this.pageBounds10 = new Konva.Text({
            x: x,
            y: yPos,
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            text: 'layerPage10: ('
                + (mainLayer.x + mainLayer.width) + ','
                + mainLayer.y + ')',
            fill: this.fontColor
        });
        layer.add(this.pageBounds10);

        yPos += this.fontSize;
        this.pageBounds11 = new Konva.Text({
            x: x,
            y: yPos,
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            text: 'layerPage11: ('
                + (mainLayer.x + mainLayer.width) + ','
                + (mainLayer.y + mainLayer.height) + ')',
            fill: this.fontColor
        });
        layer.add(this.pageBounds11);

        //Selected Page Scale
        yPos += this.fontSize;
        this.pageScale = new Konva.Text({
            x: x,
            y: yPos,
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            text: 'layerPageScale: '
                + mainLayer.getScale().x,
            fill: this.fontColor
        });
        layer.add(this.pageScale);

        yPos += this.fontSize;
        this.pageSize = new Konva.Text({
            x: x,
            y: yPos,
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            text: 'currentLayer: ' + 0,
            fill: this.fontColor
        });
        layer.add(this.pageSize);

        //Selected Page Size
        yPos += this.fontSize;
        this.pageSize = new Konva.Text({
            x: x,
            y: yPos,
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            text: 'layerPageSize: ('
            + mainLayer.width + ','
            + mainLayer.height + ')',
            fill: this.fontColor
        });
        layer.add(this.pageSize);

        this.layer = layer;
    };

    //Event Functions
    onMouseMove()
    {
        let pos = this.layer.getRelativePointerPosition();
        this.mouse.setText('mouse: (' + pos.x
            + ',' + pos.y + ')');
        // this.mouseY.setText('mouseY: ' + pos.y);
    }

    onPageScale()
    {
        this.pageScale.setText('layerPageScale: '
            + this.mainLayer.getScale().x.toFixed(2));
        this.pageSize.setText('layerPageSize: ('
        + this.mainLayer.width + ','
        + this.mainLayer.height + ')');
        this.pageBounds00.setText('layerPage00: ('
            + this.mainLayer.x + ','
            + this.mainLayer.y + ')');
        this.pageBounds01.setText('layerPage01: ('
            + this.mainLayer.x + ','
            + (this.mainLayer.y + this.mainLayer.height) + ')');
        this.pageBounds10.setText('layerPage10: ('
                + (this.mainLayer.x + this.mainLayer.width) + ','
                + this.mainLayer.y + ')');
        this.pageBounds11.setText('layerPage11: ('
                + (this.mainLayer.x + this.mainLayer.width) + ','
                + (this.mainLayer.y + this.mainLayer.height) + ')');
    }

    onStateChanged(newState)
    {
        this.appState.setText('appState: ' + newState);
    }

    setOpacity(opacity)
    {
        this.layer.setOpacity(opacity);
    }
}