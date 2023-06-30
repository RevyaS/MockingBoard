class VerticalSliceGuide
{
    constructor(x, y, height)
    {
        this.x = x;
        this.y = y;

        let group = new Konva.Group({
            x: x,
            y:y
        })

        let outline = new Konva.Line({
            points: [x, 0, x, height],
            stroke: 'white',
            strokeWidth: 7,
        })
        group.add(outline);
        outline.setOpacity(0);

        let line = new Konva.Line({
            points: [x, 0, x, height],
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

    setXPosition(x)
    {
        this.x = Math.floor(x);
        this.group.setAttrs({
            x: this.x
        })
    }

    setOpacity(newOpacity)
    {
        this.group.setOpacity(newOpacity);
    }
}