class DebuggingSquare
{
    constructor(x, y)
    {
        //Constants
        this.width = 190;
        this.height = 200;
        this.stroke = '#550000';
        this.fontSize = 16;
        this.fontFamily = 'Calibri';

        //Create Square
        this.borderSquare = new Konva.Rect({
            x: x,
            y: y,
            width: this.width,
            height: this.height,
            stroke: this.stroke
        });

        let yPos = 3;
        //Mouse X Text
        this.mouseX = new Konva.Text({
            x: x,
            y: yPos,
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            text: 'mouseX: 0',
            fill: 'black',
        });

        yPos += this.fontSize;
        //Mouse Y Text
        this.mouseY = new Konva.Text({
            x: x,
            y: yPos,
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            text: 'mouseY: 0',
            fill: 'black',
        });

        yPos += this.fontSize;
        //APP State Text
        this.appState = new Konva.Text({
            x: x,
            y: yPos,
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            text: 'appState: DEFAULT',
            fill: 'black',
        });

        let layer = new Konva.Layer();
        layer.add(this.borderSquare);
        layer.add(this.mouseX);
        layer.add(this.mouseY);
        layer.add(this.appState);

        this.layer = layer;
    };

    //Event Functions
    onMouseMove()
    {
        let pos = this.layer.getRelativePointerPosition();
        this.mouseX.setText('mouseX: ' + pos.x);
        this.mouseY.setText('mouseY: ' + pos.y);
    }

    onStateChanged(newState)
    {
        this.appState.setText('appState: ' + newState);
    }
}