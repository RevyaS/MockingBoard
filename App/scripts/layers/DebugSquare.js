class DebuggingSquare
{
    constructor(x, y)
    {
        //Constants
        this.width = 100;
        this.height = 200;
        this.stroke = '#550000';
        this.fontSize = 16;

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
            fontFamily: 'Calibri',
            fontSize: this.fontSize,
            text: 'mouseX: 0',
            fill: 'black',
        });

        yPos += this.fontSize;
        //Mouse Y Text
        this.mouseY = new Konva.Text({
            x: x,
            y: yPos,
            fontFamily: 'Calibri',
            fontSize: this.fontSize,
            text: 'mouseY: 0',
            fill: 'black',
        });

        let layer = new Konva.Layer();
        layer.add(this.borderSquare);
        layer.add(this.mouseX);
        layer.add(this.mouseY);

        this.layer = layer;
    };

    //Event Functions
    onMouseMove()
    {
        let pos = this.layer.getRelativePointerPosition();
        this.mouseX.setText('mouseX: ' + pos.x);
        this.mouseY.setText('mouseY: ' + pos.y);
    }
}