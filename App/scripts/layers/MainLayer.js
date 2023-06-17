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
        this.selectedPage = null;
        this.currentLayer = 0;

        //Group of layers
        this.layers = [];
        this.outerLayer = [];
        let group = new Konva.Group({
            x: this.x,
            y: this.y
        });
        this.group = group;
        layer.add(group);

        //Initial Page Size
        let page = new Page(0, 0, this.origWidth, this.origHeight, 0);
        group.add(page.group);
        this.page = page;
        this.layers.push([page]);
        this.outerLayer.push(page);

        let mainLayerRef = this;
        this.page.group.on(PAGEEVENTS.MOUSEENTERED, function (page)
        {
            mainLayerRef.onPageMouseEntered(page);
        });

        this.layer = layer;
    }

    onPageMouseEntered(page)
    {
        this.selectedPage = page;
        this.layer.fire(PAGEEVENTS.MOUSEENTERED, page);
    }

    onPageMouseExited()
    {
        this.selectedPage = null;
        this.layer.fire(PAGEEVENTS.MOUSEEXITED);
    }

    onStateChanged(newState)
    {
        this.state = newState;
        for (let currPage of this.outerLayer)
        {
            currPage.setState(newState);            
        }
    }

    onMouseMove()
    {
        //Check if within layer bounds
        let relativeMouse = this.group.getRelativePointerPosition();
        let mouseBoundsData = this.getMouseBoundsData(relativeMouse);
        if (!mouseBoundsData.inBounds.y || !mouseBoundsData.inBounds.x)
        {
            this.onPageMouseExited();
        }

        for (let page of this.outerLayer)
        {
            page.onMouseMove();        
        }

        
        if (this.selectedPage == null) return;
        switch (this.state)
        {
            case APPSTATE.HORIZONTALSLICE:
                this.selectedPage.showHorizontalSliceGuideLine();
                break;
            case APPSTATE.VERTICALSLICE:
                this.selectedPage.showVerticalSliceGuideLine();
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
        this.group.setAttrs(newGroupPos);
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

    onMouseClicked()
    {
        let pos = this.layer.getRelativePointerPosition();

        //Find Division
        let relativePos = this.getRelativePositionUnscaled(pos);
        if (this.selectedPage == null) return;
        switch (this.state)
        {
            case APPSTATE.HORIZONTALSLICE:
                this.sliceVertically(relativePos);
                break;
            case APPSTATE.VERTICALSLICE:
                this.sliceHorizontally(relativePos);
                break;
        }
    }

    sliceVertically(mousePos)
    {
        let layerPages = [];
        let parentPage = this.selectedPage;
        this.removeElementByValue(this.outerLayer, this.selectedPage);
        this.selectedPage.mouseExit();
        this.selectedPage.setState(APPSTATE.DEFAULT);
        this.currentLayer++;

        //Create top position based on selected page
        let height = Math.floor(mousePos.y - parentPage.y);
        let topPage = new Page(parentPage.x,
            parentPage.y,
            parentPage.origWidth,
            height, this.currentLayer);
        this.group.add(topPage.group);
        layerPages.push(topPage);
        this.outerLayer.push(topPage);
        let mainLayerRef = this;
        topPage.group.on(PAGEEVENTS.MOUSEENTERED, function (page)
        {
            mainLayerRef.onPageMouseEntered(page);
        });

        //Create bottom position layer
        let remainingHeight = parentPage.origHeight - height;
        let bottomPage = new Page(parentPage.x,
            height + parentPage.y,
            parentPage.origWidth,
            remainingHeight, this.currentLayer);
        this.group.add(bottomPage.group);
        layerPages.push(bottomPage);
        this.outerLayer.push(bottomPage); 
        bottomPage.group.on(PAGEEVENTS.MOUSEENTERED, function (page)
        {
            mainLayerRef.onPageMouseEntered(page);
        });

        this.layers.push(layerPages);
    }

    sliceHorizontally(mousePos)
    {
        let layerPages = [];
        let parentPage = this.selectedPage;
        this.removeElementByValue(this.outerLayer, this.selectedPage);
        this.selectedPage.mouseExit();
        this.currentLayer++;

        //Create left position based on selected page
        let width = Math.floor(mousePos.x - parentPage.x);
        let leftPage = new Page(parentPage.x,
            parentPage.y,
            width,
            parentPage.origHeight, this.currentLayer);
        this.group.add(leftPage.group);
        layerPages.push(leftPage);
        this.outerLayer.push(leftPage);
        let mainLayerRef = this;
        leftPage.group.on(PAGEEVENTS.MOUSEENTERED, function (page)
        {
            mainLayerRef.onPageMouseEntered(page);
        });

        //Create bottom position layer
        let remainingWidth = parentPage.origWidth - width;
        let rightPage = new Page(parentPage.x + width,
            parentPage.y,
            remainingWidth,
            parentPage.origHeight, this.currentLayer);
        this.group.add(rightPage.group);
        rightPage.group.on(PAGEEVENTS.MOUSEENTERED, function (page)
        {
            mainLayerRef.onPageMouseEntered(page);
        });
        layerPages.push(rightPage);
        this.outerLayer.push(rightPage);
        this.layers.push(layerPages);
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
        let topYBounds = 0 > mousePos.y;
        let bottomYBounds = this.origHeight <= mousePos.y;
        let inYBounds = !(topYBounds || bottomYBounds);

        let onTopHalf = this.y + (this.height/2) > mousePos.y;
        let onLeftHalf =  this.x + (this.width/2) > mousePos.x

        let topXBounds = 0 > mousePos.x;
        let bottomXBounds = this.origWidth < mousePos.x;
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

    removeElementByValue(arr, value) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === value) {
            arr.splice(i, 1);
            i--; // Decrement index to recheck the current index after removal
          }
        }
      }
}