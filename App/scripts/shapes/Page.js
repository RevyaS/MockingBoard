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

        let horizontalRuler = new HorizontalRuler(0, 0, 100, this.width);
        group.add(horizontalRuler.group);
        this.horizontalRuler = horizontalRuler;
        horizontalRuler.setWidth(200);


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
                this.horizontalRuler.setOpacity(0);
                break;
        }
    }

    showHorizontalSliceGuideLine(mousePos)
    {
        //Compute for mouse in Y Bounds
        let topYBounds = this.y > mousePos.y;
        let bottomYBounds = this.y + this.height < mousePos.y;
        let inYBounds = !(topYBounds || bottomYBounds);

        let relativePositionUnscaled = this.getRelativePositionUnscaled(mousePos);

        //Move guideline
        if (inYBounds)
        {
            this.horizontalSliceGuideLine.setOpacity(1);
            this.horizontalSliceGuideLine.setYPosition(relativePositionUnscaled.y)       
        } else 
        {
            this.horizontalSliceGuideLine.setOpacity(0);
        }
    }

    showVerticalSliceGuideLine(mousePos)
    {
        let relativePositionUnscaled = this.getRelativePositionUnscaled(mousePos);
        let mouseBoundsData = this.getMouseBoundsData(mousePos);

        //Move guideline
        if (mouseBoundsData.inBounds.x)
        {
            this.verticalSliceGuideLine.setOpacity(1);
            this.verticalSliceGuideLine.setXPosition(relativePositionUnscaled.x)
        
            //Show ruler
            if (mouseBoundsData.inBounds.y)
            {
                this.horizontalRuler.setOpacity(1);
                this.horizontalRuler.setPosition(relativePositionUnscaled);                
            } else 
            {
                this.horizontalRuler.setOpacity(0);
            }
        } else 
        {
            this.verticalSliceGuideLine.setOpacity(0);
            this.horizontalRuler.setOpacity(0);
        }
    }

    getRelativePositionUnscaled(mousePos)
    {
        //Compute Relative Position of mouse to Page
        let relativePosition = {
            x: mousePos.x - this.x,
            y: mousePos.y - this.y,
        };
        //Get Ratio
        let relativeRatio = {
            x: relativePosition.x / this.width,
            y: relativePosition.y / this.height
        }
        let relativePositionUnscaled = {
            x: this.origWidth * relativeRatio.x,
            y: this.origHeight * relativeRatio.y,
        }

        return relativePositionUnscaled;
    }

    getMouseBoundsData(mousePos)
    {
        let topYBounds = this.y > mousePos.y;
        let bottomYBounds = this.y + this.height < mousePos.y;
        let inYBounds = !(topYBounds || bottomYBounds);

        let topXBounds = this.x > mousePos.x;
        let bottomXBounds = this.x + this.width < mousePos.x;
        let inXBounds = !(topXBounds || bottomXBounds);

        let mouseBoundsData = {
            topBounds: {
                x: topXBounds,
                y: topYBounds
            },
            bottomBounds: {
                x: bottomXBounds,
                y: bottomYBounds
            },
            inBounds: {
                x: inXBounds,
                y: inYBounds
            }
        };
        return mouseBoundsData;
    }
}   