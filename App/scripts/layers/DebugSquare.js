class DebuggingSquare
{
    constructor(x, y, selectedPage)
    {
        //Constants
        this.width = 190;
        this.height = 200;
        this.stroke = '#550000';
        this.fontSize = 16;
        this.fontFamily = 'Calibri';
        this.fontColor = 'white';

        //Dependencies
        this.selectedPage = selectedPage;

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
            text: 'selectedPage00: (' + selectedPage.x + ',' 
                + selectedPage.y + ')',
            fill: this.fontColor
        });
        layer.add(this.pageBounds00);

        yPos += this.fontSize;
        this.pageBounds01 = new Konva.Text({
            x: x,
            y: yPos,
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            text: 'selectedPage01: ('
                + selectedPage.x + ','
                + (selectedPage.y + selectedPage.height) + ')',
            fill: this.fontColor
        });
        layer.add(this.pageBounds01);

        yPos += this.fontSize;
        this.pageBounds10 = new Konva.Text({
            x: x,
            y: yPos,
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            text: 'selectedPage10: ('
                + (selectedPage.x + selectedPage.width) + ','
                + selectedPage.y + ')',
            fill: this.fontColor
        });
        layer.add(this.pageBounds10);

        yPos += this.fontSize;
        this.pageBounds11 = new Konva.Text({
            x: x,
            y: yPos,
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            text: 'selectedPage11: ('
                + (selectedPage.x + selectedPage.width) + ','
                + (selectedPage.y + selectedPage.height) + ')',
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
            text: 'selectedPageScale: '
                + selectedPage.getScale().x,
            fill: this.fontColor
        });
        layer.add(this.pageScale);

        //Selected Page Size
        yPos += this.fontSize;
        this.pageSize = new Konva.Text({
            x: x,
            y: yPos,
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            text: 'selectedPageSize: ('
            + selectedPage.width + ','
            + selectedPage.height + ')',
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
        this.pageScale.setText('selectedPageScale: '
            + this.selectedPage.getScale().x.toFixed(2));
        this.pageSize.setText('selectedPageSize: ('
        + this.selectedPage.width + ','
        + this.selectedPage.height + ')');
        this.pageBounds00.setText('selectedPage00: ('
            + this.selectedPage.x + ','
            + this.selectedPage.y + ')');
        this.pageBounds01.setText('selectedPage01: ('
            + this.selectedPage.x + ','
            + (this.selectedPage.y + this.selectedPage.height) + ')');
        this.pageBounds10.setText('selectedPage10: ('
                + (this.selectedPage.x + this.selectedPage.width) + ','
                + this.selectedPage.y + ')');
        this.pageBounds11.setText('selectedPage11: ('
                + (this.selectedPage.x + this.selectedPage.width) + ','
                + (this.selectedPage.y + this.selectedPage.height) + ')');
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