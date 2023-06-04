class HorizontalSliceGuide
{
    constructor(x, y, width)
    {
        this.x = x;
        this.y = y;

        let group = new Konva.Group({
            x: x,
            y:y
        })

        let outline = new Konva.Line({
            points: [0, y, width, y],
            stroke: 'white',
            strokeWidth: 7,
        })
        group.add(outline);
        outline.setOpacity(0);

        let line = new Konva.Line({
            points: [0, y, width, y],
            stroke: 'blue',
            strokeWidth: 3,
            dash: [20, 10]
        });
        group.add(line);

        this.group = group;
    }

    getPosition()
    {
        let pos = {
            x: this.group.x(),
            y: this.group.y()
        };
        return pos;
    }

    setYPosition(y)
    {
        this.y = Math.floor(y);
        this.group.setAttrs({
            y: this.y
        })
    }

    setOpacity(newOpacity)
    {
        this.group.setOpacity(newOpacity);
    }
}