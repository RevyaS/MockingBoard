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
        group.add(horizontalSliceGuideLine.group);
        horizontalSliceGuideLine.setOpacity(0);
        this.horizontalSliceGuideLine = horizontalSliceGuideLine;

        let verticalSliceGuideLine = new VerticalSliceGuide(0, 0, this.height);
        group.add(verticalSliceGuideLine.group);
        verticalSliceGuideLine.setOpacity(0);
        this.verticalSliceGuideLine = verticalSliceGuideLine;
        
        let circleGuideLine = new CircleGuide(0, 0, 50);
        group.add(circleGuideLine.group);
        circleGuideLine.setOpacity(0);
        this.circleGuideLine = circleGuideLine;

        this.group = group;
    }

    getScale()
    {
        return this.group.scale();
    }

    getInverseScale()
    {
        let scale = this.getScale();
        let inverseScale = {
            x: Math.abs(scale.x - 2),
            y: Math.abs(scale.y - 2)
        }
        return inverseScale;
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

    setState(newState)
    {
        switch (newState)
        {
            case APPSTATE.DEFAULT:
                this.horizontalSliceGuideLine.setOpacity(0);
                this.verticalSliceGuideLine.setOpacity(0);
                
                break;
        }
    }

    showHorizontalSliceGuideLine(mousePos)
    {
        //Compute for mouse in Y Bounds
        let topYBounds = this.y > mousePos.y;
        let bottomYBounds = this.y + this.height < mousePos.y;
        let inYBounds = !(topYBounds || bottomYBounds);

        //Compute Relative Position of mouse to Page
        let relativeYPosition = mousePos.y - this.y;
        //Get Ratio
        let relativeYRatio = relativeYPosition / this.height;
        let relativeYPositionUnscaled = this.origHeight * relativeYRatio;

        //Move guideline
        if (inYBounds)
        {
            this.horizontalSliceGuideLine.setOpacity(1);
            this.horizontalSliceGuideLine.setYPosition(relativeYPositionUnscaled)       
        } else 
        {
            this.horizontalSliceGuideLine.setOpacity(0);
        }
    }

    showVerticalSliceGuideLine(mousePos)
    {
        //Compute for mouse in x Bounds
        let topXBounds = this.x > mousePos.x;
        let bottomXBounds = this.x + this.width < mousePos.x;
        let inXBounds = !(topXBounds || bottomXBounds);

        //Compute Relative Position of mouse to Page
        let relativeXPosition = mousePos.x - this.x;
        //Get Ratio
        let relativeXRatio = relativeXPosition / this.width;
        let relativeXPositionUnscaled = this.origWidth * relativeXRatio;

        //Move guideline
        if (inXBounds)
        {
            this.verticalSliceGuideLine.setOpacity(1);
            this.verticalSliceGuideLine.setXPosition(relativeXPositionUnscaled)       
        } else 
        {
            this.verticalSliceGuideLine.setOpacity(0);
        }
    }
    
    showCircleGuideLine(mousePos)
    {
        //* Compute Relative Position of mouse to Page
        // this.circleGuideLine.set
        
        this.circleGuideLine.setOpacity(1);
        // this.circleGuideLine.setXPosition
    }
}   