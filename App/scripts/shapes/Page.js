class Page
{
    constructor(x, y, width, height, layerIndex)
    {
        //Contants
        this.origWidth = width;
        this.origHeight = height;
        this.width = width;
        this.height = height;
        this.fill = '#6f6f6f';
        this.x = x;
        this.y = y;
        this.layerIndex = layerIndex;
        this.zIndex = layerIndex;
        this.mouseEntered = false;
        this.gradientOutlineAmount = 6;
        this.gradientWidth = 30;
        this.gradient = [];
        this.state = APPSTATE.DEFAULT;
        let group = new Konva.Group({
            x: x,
            y: y,
        });

        //Generate gradient
        let gradientOpacityDivision = 1 / this.gradientOutlineAmount;
        let gradientWidthDivision = this.gradientWidth / this.gradientOutlineAmount;
        for (let i = 1; i <= this.gradientOutlineAmount; i++)
        {
            let strokeWidth = this.gradientWidth - (gradientWidthDivision * (i-1));
            let gradientOpacity = gradientOpacityDivision * i;
            let strokeColor = `rgba(186, 104, 237, ${gradientOpacity})`;
            let pageShapeOutline = new Konva.Rect({
                x: 0,
                y: 0,
                width: this.width,
                height: this.height,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
            });
            this.gradient.push(pageShapeOutline);
            group.add(pageShapeOutline);            
        }
        this.setGradientOpacity(0);

        this.pageShape = new Konva.Rect({
            x: 0,
            y: 0,
            width: this.width,
            height: this.height,
            fill: this.fill,
        })
        group.add(this.pageShape);

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
        this.state = newState;
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
            this.mouseEnter();
        } else 
        {
            this.mouseExit();
        }
    }

    mouseEnter()
    {
        if (!this.mouseEntered)
        {
            this.mouseEntered = true;
            this.setGradientOpacity(1);
            this.zIndex = this.group.parent.children.length - 1;
            this.group.zIndex(this.zIndex);
            
            this.group.fire(PAGEEVENTS.MOUSEENTERED, this);
        }
    }

    mouseExit()
    {
        if (this.mouseEntered)
        {
            this.mouseEntered = false;
            this.setGradientOpacity(0);
            this.zIndex = this.layerIndex;
            this.group.zIndex(this.zIndex);
            //Hide guidelines
            this.horizontalSliceGuideLine.setOpacity(0);
            this.verticalSliceGuideLine.setOpacity(0);
            this.horizontalRuler.setOpacity(0);
            this.verticalRuler.setOpacity(0);
            this.group.fire(PAGEEVENTS.MOUSEEXITED);
        }
    }

    showHorizontalSliceGuideLine()
    {
        let relativeMouse = this.group.getRelativePointerPosition();
        let relativePositionUnscaled = this.getRelativePositionUnscaled(relativeMouse);
        let mouseBoundsData = this.getMouseBoundsData(relativeMouse);
        let relativePositionFromParent = {
            x: relativePositionUnscaled.x + this.x,
            y: relativePositionUnscaled.y + this.y
        };

        //Set Ruler position
        this.verticalRuler.setLeftOffset(!mouseBoundsData.halfBounds.left);

        //Move guideline
        if (mouseBoundsData.inBounds.y)
        {
            this.horizontalSliceGuideLine.setOpacity(1);
            this.horizontalSliceGuideLine.setYPosition(relativePositionFromParent.y)       
        
            //Show ruler
            if (mouseBoundsData.inBounds.x)
            {
                this.verticalRuler.setOpacity(1);
                this.verticalRuler.setPosition(relativePositionFromParent);                
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
        let relativePositionFromParent = {
            x: relativePositionUnscaled.x + this.x,
            y: relativePositionUnscaled.y + this.y
        };
        //Set Ruler position
        this.horizontalRuler.setBottomOffset(!mouseBoundsData.halfBounds.top);

        //Move guideline
        if (mouseBoundsData.inBounds.x)
        {
            this.verticalSliceGuideLine.setOpacity(1);
            this.verticalSliceGuideLine.setXPosition(relativePositionFromParent.x)
        
            //Show ruler
            if (mouseBoundsData.inBounds.y)
            {
                this.horizontalRuler.setOpacity(1);
                this.horizontalRuler.setPosition(relativePositionFromParent);                
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
        let topYBounds = this.y > mousePos.y + this.y;
        let bottomYBounds = this.y + this.height <= mousePos.y + this.y;
        let inYBounds = !(topYBounds || bottomYBounds);
        let onTopHalf = this.y + (this.height/2) > mousePos.y + this.y;
        let onLeftHalf =  this.x + (this.width/2) > mousePos.x

        let rightXBounds = this.x > mousePos.x + this.x;
        let leftXBounds = this.x + this.width < mousePos.x + this.x;
        let inXBounds = !(rightXBounds || leftXBounds);

        let mouseBoundsData = {
            topBounds: {
                x: rightXBounds,
                y: topYBounds
            },
            bottomBounds: {
                x: leftXBounds,
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

    setGradientOpacity(newOpacity)
    {
        for (let gradient of this.gradient)
        {
            gradient.setOpacity(newOpacity);    
        }
    }

    setFillColor(newColor)
    {
        this.pageShape.setAttrs({
            fill: newColor
        })
    }

    setOpacity(newOpacity)
    {
        this.group.setOpacity(newOpacity);
    }
}   