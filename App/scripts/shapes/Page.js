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
        this.mouseEntered = false;

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

        let verticalRuler = new VerticalRuler(0, 0, 100, this.height, true);
        group.add(verticalRuler.group);
        verticalRuler.setOpacity(0);
        this.verticalRuler = verticalRuler;

        let verticalSliceGuideLine = new VerticalSliceGuide(0, 0, this.height);
        group.add(verticalSliceGuideLine.group);
        verticalSliceGuideLine.setOpacity(0);
        this.verticalSliceGuideLine = verticalSliceGuideLine;

        let horizontalRuler = new HorizontalRuler(0, 0, 100, this.width, true);
        group.add(horizontalRuler.group);
        horizontalRuler.setOpacity(0);
        this.horizontalRuler = horizontalRuler;

        this.group = group;
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
                this.verticalRuler.setOpacity(0);
                break;
        }
    }

    onMouseMove()
    {
        let relativeMouse = this.group.getRelativePointerPosition();
        let mouseBoundsData = this.getMouseBoundsData(relativeMouse);
        if (mouseBoundsData.inBounds.y && mouseBoundsData.inBounds.x)
        { 
            if (!this.mouseEntered)
            {
                this.group.fire(PAGEEVENTS.MOUSEENTERED, this);
                this.mouseEntered = true;
            }
        } else 
        {
            if (this.mouseEntered)
            {
                this.group.fire(PAGEEVENTS.MOUSEEXITED);
                this.mouseEntered = false;
            }
        }
    }

    showHorizontalSliceGuideLine()
    {
        let relativeMouse = this.group.getRelativePointerPosition();
        let relativePositionUnscaled = this.getRelativePositionUnscaled(relativeMouse);
        let mouseBoundsData = this.getMouseBoundsData(relativeMouse);

        //Set Ruler position
        this.verticalRuler.setLeftOffset(!mouseBoundsData.halfBounds.left);

        //Move guideline
        if (mouseBoundsData.inBounds.y)
        {
            this.horizontalSliceGuideLine.setOpacity(1);
            this.horizontalSliceGuideLine.setYPosition(relativePositionUnscaled.y)       
        
            //Show ruler
            if (mouseBoundsData.inBounds.x)
            {
                this.verticalRuler.setOpacity(1);
                this.verticalRuler.setPosition(relativePositionUnscaled);                
            } else 
            {
                this.verticalRuler.setOpacity(0);
            }
        } else 
        {
            this.horizontalSliceGuideLine.setOpacity(0);
            this.verticalRuler.setOpacity(0);
        }
    }

    showVerticalSliceGuideLine()
    {
        let relativeMouse = this.group.getRelativePointerPosition();
        let relativePositionUnscaled = this.getRelativePositionUnscaled(relativeMouse);
        let mouseBoundsData = this.getMouseBoundsData(relativeMouse);

        //Set Ruler position
        this.horizontalRuler.setBottomOffset(!mouseBoundsData.halfBounds.top);

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

        let onTopHalf = this.y + (this.height/2) > mousePos.y;
        let onLeftHalf =  this.x + (this.width/2) > mousePos.x

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
            },
            halfBounds: {
                top: onTopHalf,
                left: onLeftHalf
            }
        };
        return mouseBoundsData;
    }
}   