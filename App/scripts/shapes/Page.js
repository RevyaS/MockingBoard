class Page
{
    constructor(x, y)
    {
        //Contants
        this.origWidth = 890;
        this.origHeight = 450;
        this.width = 890;
        this.height = 450;
        this.fill = '#6f6f6f';
        this.state = APPSTATE.DEFAULT;
        this.x = x;
        this.y = y;

        let group = new Konva.Group({
            x: x,
            y: y
        });

        let pageShape = new Konva.Rect({
            x: 0,
            y: 0,
            width: this.width,
            height: this.height,
            fill: this.fill
        })
        group.add(pageShape);

        let horizontalSliceGuideLine = new HorizontalSliceGuide(0, 0, this.width);
  
        this.horizontalSliceGuideLine = horizontalSliceGuideLine;

        this.group = group;
    }

    getScale()
    {
        return this.group.scale();
    }

    scaleBy(scaleRatio)
    {
        let currScale = this.getScale();
        let scaleX = currScale.x * scaleRatio;
        let scaleY = currScale.y * scaleRatio;
        let newScale = {
            x: scaleX,
            y: scaleY
        };
        this.width = Math.floor(this.origWidth * scaleX);
        this.height = Math.floor(this.origHeight * scaleX);
        this.group.scale(newScale);
    }

    setPosition(x, y)
    {
        this.x = Math.floor(x);
        this.y = Math.floor(y);
        this.group.setAttrs({
            x: this.x,
            y: this.y
        });
    }

    getPosition()
    {
        let pos = {
            x: this.group.x(),
            y: this.group.y()
        };
        return pos;
    }
}   