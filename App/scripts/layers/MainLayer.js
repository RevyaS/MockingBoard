class MainLayer
{
    constructor()
    {
        var layer = new Konva.Layer();

        //Initial Page Size
        let page = new Page(180, 60);
        layer.add(page.shape);
    
        this.page = page;
        this.layer = layer;
    }

    zoomPage(deltaY) {
        //Update Scale
        let zoomAmount = 1.0 + (10.0 / deltaY * -1);
        let zoomCenter = this.layer.getRelativePointerPosition();
        let currentScale = this.page.getScale();

        this.page.scaleBy(zoomAmount);

        //Reposition
        let newScale = this.page.getScale();
        let scalarOffset = currentScale.x - newScale.x;

        let offset = {
            x: zoomCenter.x * scalarOffset,
            y: zoomCenter.y * scalarOffset
        }

        let currPosition = this.page.getPosition();
        let newPosition = {
            x: currPosition.x + offset.x,
            y: currPosition.y + offset.y
        };

        this.page.setPosition(newPosition.x, newPosition.y);
    }
}