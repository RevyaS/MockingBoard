class HorizontalRuler
{
    constructor(x, y, width, maxWidth)
    {
        this.x = x;
        this.y = y;
        this.offset = 30;
        this.fontColor = 'white';
        this.strokeWidth = 3;
        this.width = width;
        this.maxWidth = maxWidth;
        this.fontSize = 30;

        let group = new Konva.Group({
            x: x,
            y:y
        })

        // let outline = new Konva.Line({
        //     points: [0, y, width, y],
        //     stroke: 'white',
        //     strokeWidth: 7,
        // })
        // group.add(outline);
        // outline.setOpacity(0);
        
        let leftVerticalLine = new Konva.Line({
            points: [x, y, x, this.offset],
            stroke: 'blue',
            strokeWidth: this.strokeWidth,
        });
        group.add(leftVerticalLine);
        this.leftVerticalLine = leftVerticalLine;

        let rightVerticalLine = new Konva.Line({
            points: [x + width, y, x + width, this.offset],
            stroke: 'blue',
            strokeWidth: this.strokeWidth,
        });
        group.add(rightVerticalLine);
        this.rightVerticalLine = rightVerticalLine;

        let horizontalLine = new Konva.Line({
            points: [0, y + this.offset, width, y + this.offset],
            stroke: 'blue',
            strokeWidth: this.strokeWidth,
        });
        group.add(horizontalLine);
        this.horizontalLine = horizontalLine;

        let textValue = new Konva.Text({
            x: x ,
            y: y,
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            width: width,
            height: this.offset + (this.fontSize / 2),
            align: 'center',
            verticalAlign: 'bottom',
            text: '27v',
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

    setPosition(newPos)
    {
        //Set Y
        this.y = Math.floor(newPos.y);
        this.group.setAttrs({
            y: this.y
        })
        //Compute Width
        let width = Math.abs(newPos.x);
        // console.log('width test, ', {width: width, inverse: Math.abs(this.maxWidth - width)});
        this.setWidth(width);
    }

    setWidth(newWidth)
    {
        console.log('mouse y', this.y, this.y + this.offset);
        this.width = newWidth;
        this.horizontalLine.setAttrs({
            points: [0, this.offset, this.width, this.offset]
        });

        this.rightVerticalLine.setAttrs({
            points: [this.x + this.width, 0, this.x + this.width, this.offset]
        });

        let textWidth = this.width <= this.fontSize * 2 ? this.fontSize * 2 : this.width; 
        let textXOffset = this.width <= this.fontSize ? - (this.fontSize - this.width) : 0;
        this.textValue.setAttrs({
            width: textWidth,
            x: textXOffset
        })
    }

    setOpacity(newOpacity)
    {
        this.group.setOpacity(newOpacity);
    }
}