class VerticalRuler
{
    constructor(x, y, height, maxHeight, isLeftOffset)
    {
        this.x = x;
        this.y = y;
        this.offset = 30;
        this.fontColor = 'white';
        this.strokeWidth = 3;
        this.height = height;
        this.maxHeight = maxHeight;
        this.fontSize = 30;
        this.isLeftOffset = isLeftOffset;

        let group = new Konva.Group({
            x: x,
            y:y
        })

        // Determines if ruler is drawn on the right or left side
        let offsetMultiplier = this.isLeftOffset ? -1 : 1;
        // Offset based on isLeftOffset
        let offsetValue = this.offset * offsetMultiplier;
        let topHorizontalLine = new Konva.Line({
            points: [x, y, offsetValue, y],
            stroke: 'blue',
            strokeWidth: this.strokeWidth,
        });
        group.add(topHorizontalLine);
        this.topHorizontalLine = topHorizontalLine;

        let bottomHorizontalLine = new Konva.Line({
            points: [x, y + height, offsetValue, y + height],
            stroke: 'blue',
            strokeWidth: this.strokeWidth,
        });
        group.add(bottomHorizontalLine);
        this.bottomHorizontalLine = bottomHorizontalLine;

        let verticalLine = new Konva.Line({
            points: [x + offsetValue, y, x + offsetValue, height],
            stroke: 'blue',
            strokeWidth: this.strokeWidth,
        });
        group.add(verticalLine);
        this.verticalLine = verticalLine;

        this.textWidth = this.offset + (this.fontSize) + 20;
        let textX = isLeftOffset ? x - this.textWidth + 20: x;
        let textValue = new Konva.Text({
            x: textX,
            y: y,
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            width: this.textWidth,
            height: height,
            align: 'left',
            verticalAlign: 'middle',
            text: '27h',
            fill: this.fontColor,
        });
        group.add(textValue);
        this.textValue = textValue;

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

    setPosition(relativeNewPos)
    {
        //Set Y
        this.x = Math.floor(relativeNewPos.x);
        this.group.setAttrs({
            x: this.x
        })
        //Compute Height
        let height = Math.abs(relativeNewPos.y);
        this.setHeight(height);
    }

    setHeight(newHeight)
    {
        // Determines if ruler is drawn on the right or left side
        let offsetMultiplier = this.isLeftOffset ? -1 : 1;
        // Offset based on isLeftOffset
        let offsetValue = this.offset * offsetMultiplier;
        this.height = newHeight;
        this.verticalLine.setAttrs({
            points: [offsetValue, 0, offsetValue, this.height]
        });

        this.topHorizontalLine.setAttrs({
            points: [0, 0, offsetValue, 0]
        });

        this.bottomHorizontalLine.setAttrs({
            points: [0, this.height, offsetValue, this.height],
        });

        let textWidth = this.height <= this.fontSize * 2 ? this.fontSize * 2 : this.height; 
        let textYOffset = this.height <= this.fontSize ? - (this.fontSize - this.height) : 0;
        let textX = this.isLeftOffset ? -this.textWidth + 20 : 0;
        
        //Compute values
        let heightRatio = (this.height / this.maxHeight) * 100;
        let ratioValue = Math.floor(heightRatio) + 'v';
        this.textValue.setAttrs({
            height: textWidth,
            y: textYOffset,
            x: textX,
            text: ratioValue
        })
    }

    setLeftOffset(isLeftOffset)
    {
        this.isLeftOffset = isLeftOffset;
    }

    setOpacity(newOpacity)
    {
        this.group.setOpacity(newOpacity);
    }
}