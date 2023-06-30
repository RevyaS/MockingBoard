class Circle
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.offset = 30;
        // this.fontColor = 'whi'
        this.strokeWidth = 3;
        // this.width = width;
        // this.maxWidth = maxWidth;
        // this.fontSize = 3
        // this.isBottomOffset = isBottomOffset;
        
        let group = new Konva.Group({
            x: x,
            y: y,
        });
        
        // const circle = new Konva.Circle({
        //     x: 350,
        //     y: 90,
        //     fill: "green",
        //     radius: 50,
        //     draggable: true,
            
        //   });
        let circle = new Konva.Circle({
            x: 350,
            y: 90,
            fill: "green",
            radius: 50, 
            draggable: true,
        });
        
        this.group = group;
    }
    
    getPosition()
    {
        let pos = {
            x: this.group.x(),
            y: this.group.y()
        }
        
        return pos;
    }
    
    setPosition(relativeNewPos)
    {
        //* set X and Y
        this.x = Math.floor(relativeNewPos.x);
        this.y = Math.floor(relativeNewPos.y);
        this.group.setAttrs({
            x: this.x,
            y: this.y,
        });
        
        // let width = Mat
    }
    
    setOpacity(newOpacity)
    {
        this.group.setOpacity(newOpacity);
    }
}