class CircleGuide
{
    constructor(x, y, radius)
    {
        this.x = x;
        this.y = y;
        
        let group = new Konva.Group({
            x: x,
            y: y,
        });
        
        let outline = new Konva.Circle({
            x: 0,
            y: 0,
            radius: 50,
            fill: 'red',
            draggable: true
        });
        
        group.add(outline);
        outline.setOpacity(0);
        
        let circle = new Konva.Circle({
            x: 0,
            y: 0,
            radius: 50,
            fill: 'red',
            draggable: true
        });
        
        group.add(circle);
        
        this.group = group;
    }
    
    getPosition()
    {
        let pos = {
            x: this.group.x(),
            y: this.group.y(),
        };
        return pos;
    }
    
    setXPosition(x)
    {
        this.x = Math.floor(x);
        this.group.setAttrs({
            x: this.x
        });
    }
    
    setOpacity(newOpacity)
    {
        this.group.setOpacity(newOpacity);
    }
}