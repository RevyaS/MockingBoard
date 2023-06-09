class MainLayer
{
    constructor()
    {
        var layer = new Konva.Layer();
        this.state = APPSTATE.DEFAULT;

        //Page Attributes as a whole
        this.x = 240;
        this.y = 60; 
        this.origWidth = 890
        this.origHeight = 450;
        this.width = this.origWidth;
        this.height = this.origHeight;

        //Group of layers
        let group = new Konva.Group({
            x: this.x,
            y: this.y
        });
        this.group = group;
        layer.add(group);

        //Initial Page Size
        let page = new Page(0, 0);
        group.add(page.group);
        this.page = page;


        this.layer = layer;
    }

    onStateChanged(newState)
    {
        this.state = newState;
        this.page.setState(newState);
    }

    onMouseMove()
    {
        let pos = this.layer.getRelativePointerPosition();
        switch (this.state)
        {
            case APPSTATE.HORIZONTALSLICE:
                this.page.showHorizontalSliceGuideLine(pos);
                break;
            case APPSTATE.VERTICALSLICE:
                this.page.showVerticalSliceGuideLine(pos);
                break;
        }
    }

    zoomPage(deltaY) {
        //Update Scale
        let zoomAmount = 1.0 + (10.0 / deltaY * -1);
        let zoomCenter = this.layer.getRelativePointerPosition();
        let currentScale = this.group.getScale();

        this.scaleBy(zoomAmount);

        //Reposition
        let newScale = this.group.getScale();
        let scalarOffset = currentScale.x - newScale.x;

        let offset = {
            x: zoomCenter.x * scalarOffset,
            y: zoomCenter.y * scalarOffset
        }

        let currPosition = this.group.getPosition();
        let newPosition = {
            x: currPosition.x + offset.x,
            y: currPosition.y + offset.y
        };

        this.x = Math.floor(newPosition.x);
        this.y = Math.floor(newPosition.y);
        let newGroupPos = {
            x: this.x,
            y: this.y
        }
        console.log('Before pos, ', { x: this.group.x(), y: this.group.y() });

        this.group.setAttrs(newGroupPos);
        console.log('After pos, ', { x: this.group.x(), y: this.group.y() });
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

    getScale()
    {
        return this.group.scale();
    }
}