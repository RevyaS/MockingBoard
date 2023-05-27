class Page
{
    constructor(x, y)
    {
        //Contants
        this.width = 890;
        this.height = 450;
        this.fill = '#6f6f6f';

        this.x = x;
        this.y = y;
    
        let shape = new Konva.Rect({
            x: x,
            y: y,
            width: this.width,
            height: this.height,
            fill: this.fill
        })
        
        this.shape = shape;
    }

    getScale()
    {
        return this.shape.scale();
    }

    scaleBy(scaleRatio)
    {
        let currScale = this.getScale();
        let newScale = {
            x: currScale.x * scaleRatio,
            y: currScale.y * scaleRatio
        };
        this.shape.scale(newScale);
    }

    setPosition(x, y)
    {
        this.shape.setAttrs({
            x: x,
            y: y
        });

    }

    getPosition()
    {
        let pos = {
            x: this.shape.x(),
            y: this.shape.y()
        };
        return pos;
    }
}   