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

        let line = new Konva.Line({
            points: [5, y, width, y],
            stroke: 'blue',
            strokeWidth: 5,
            dash: [20, 10]
        });
        group.add(line);

        this.group = group;
    }


}