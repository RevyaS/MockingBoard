let panel;
var group;
var layer;

class PropertyPanel
{
    constructor(page)
    {
        this.page = page;

        let property = new PropertyFields();
        layer = new Konva.Layer();

        group = new Konva.Group({
            x: 1920 - (170 + 130), //16 68
            y: 0
        });
        let PropertyPanel = new Konva.Rect({
            x:0,
            y:0,
            fill:"#2E2E2E",
            width:300,
            height:950,
        });
        let tab = new Konva.Rect({
            x:0,
            y:0,
            fill:"white",
            width:300,
            height:300,
        });

        panel = new PropertyFields();
        let x_ = 0;

        var Name = panel.Panels("Property Name:",0, x_, '');
        var origWidth = panel.Panels("Orign Width",0, x_ + 25, '');
        var origHeight = panel.Panels("Orign Height",0, x_ + 50,'');
        var currentWidth = panel.Panels("Width",0, x_ + 75, '');
        var currentHeight = panel.Panels("Height",0, x_ + 100, '');
        var fill = panel.Panels("Fill",0, x_ + 125, );
        var xPos = panel.Panels("X",0, x_ + 150,'');
        var yPos = panel.Panels("y",0, x_ + 175, '');
        var layerIndex = panel.Panels("Layer Index",0, x_ + 200, '');
        var mouseEntered = panel.Panels("Mouse Entered",0, x_ + 225, '');
        var gradientOutlineAmount = panel.Panels("Gradient Outline Amount",0, x_ + 250, '');
        var gradientWidth = panel.Panels("Gradient Width",0, x_ + 275, '');
        var zIndex = panel.Panels("zIndex",0, x_ + 300, '');
        var state = panel.Panels("State",0, x_ + 325, '');

        group.add(PropertyPanel);
        group.add(tab);
        group.add(Name);
        group.add(origWidth);
        group.add(origHeight);
        group.add(currentWidth);
        group.add(currentHeight);
        group.add(fill);
        group.add(xPos);
        group.add(yPos);
        group.add(layerIndex);
        group.add(mouseEntered);
        group.add(gradientOutlineAmount);
        group.add(gradientWidth);
        group.add(zIndex);
        group.add(state);

        layer.add(group);

        this.layer = layer;
    }

    Panelset(page) {
        this.page = page;
        //console.log(page.PanelName);
    }
    PanelClick()
    {
        if(this.page != null)
        {
            this.layer = new Konva.Layer();
            this.group = new Konva.Group({
                x: 1920 - (170 + 130), //16 68
                y: 0
            });
            this.layer.destroy();
            this.layer = layer;

            let property = new PropertyFields();
            let PropertyPanel = new Konva.Rect({
                x:0,
                y:0,
                fill:"#2E2E2E",
                width:300,
                height:950,
            });
            let tab = new Konva.Rect({
                x:0,
                y:0,
                fill:"white",
                width:300,
                height:300,
            });

            panel = new PropertyFields();
            let x_ = 0;

            var Name = panel.Panels("Property Name:",0, x_, this.page.PanelName);
            var origWidth = panel.Panels("Orign Width",0, x_ + 25, this.page.origWidth);
            var origHeight = panel.Panels("Orign Height",0, x_ + 50, this.page.origHeight);
            var currentWidth = panel.Panels("Width",0, x_ + 75, this.page.width);
            var currentHeight = panel.Panels("Height",0, x_ + 100, this.page.height);
            var fill = panel.Panels("Fill",0, x_ + 125, this.page.fill);
            var xPos = panel.Panels("X",0, x_ + 150, this.page.x);
            var yPos = panel.Panels("y",0, x_ + 175, this.page.y);
            var layerIndex = panel.Panels("Layer Index",0, x_ + 200, this.page.layerIndex);
            var mouseEntered = panel.Panels("Mouse Entered",0, x_ + 225, this.page.mouseEntered);
            var gradientOutlineAmount = panel.Panels("Gradient Outline Amount",0, x_ + 250, this.page.gradientOutlineAmount);
            var gradientWidth = panel.Panels("Gradient Width",0, x_ + 275, this.page.gradientWidth);
            var zIndex = panel.Panels("zIndex",0, x_ + 300, this.page.zIndex);
            var state = panel.Panels("State",0, x_ + 325, this.page.state);

            group.add(PropertyPanel);
            group.add(tab);
            group.add(Name);
            group.add(origWidth);
            group.add(origHeight);
            group.add(currentWidth);
            group.add(currentHeight);
            group.add(fill);
            group.add(xPos);
            group.add(yPos);
            group.add(layerIndex);
            group.add(mouseEntered);
            group.add(gradientOutlineAmount);
            group.add(gradientWidth);
            group.add(zIndex);
            group.add(state);

            this.layer.add(group);

            this.layer = layer;
            console.log(this.page.PanelName+""); 
        }
    }
}




class PropertyFields
{
    Panels(text_,x,y, propValue) {

        var group = new Konva.Group({
            x: x,
            y: y
        });
        let Property = new Konva.Text({
            text: text_,
            x:5,
            y:110,
            fontSize: 14,
            fill: "white"
        });
        let panels = new Konva.Rect({
            x:2,
            y:105,
            fill:"#2E2E2E",
            width:170,
            height:25,
            strokeWidth:1,
            stroke:"white"
        });
        let textbox = new Konva.Rect({
            x:170,
            y:105,
            fill:"#2E2E2E",
            width:130,
            height:25,
            strokeWidth:1,
            stroke:"white"
        });

        let textNode = new Konva.Text({
            text: propValue,
            x: 175,
            y: 110,
            fontSize: 14,
            fill: "white",
            width: 200,
        });

        var tr = new Konva.Transformer({   // textbox length and flip code
            node: textNode,
            enabledAnchors: ['middle-left', 'middle-right'],
            // set minimum width of text
            boundBoxFunc: function (oldBox, newBox) {
              newBox.width = Math.max(30, newBox.width);
              return newBox;
            },
        });
    
        textNode.on('transform', function () { // textbox length and flip code
            // reset scale, so only with is changing by transformer
            textNode.setAttrs({
              width: textNode.width() * textNode.scaleX(),
              scaleX: 1,
            });
        });
        textNode.on('dblclick dbltap', () => {
            // hide text node and transformer:
            textNode.hide();
            tr.hide();
    
            // create textarea over canvas with absolute position
            // first we need to find position for textarea
            // how to find it?
    
            // at first lets find position of text node relative to the stage:
            var textPosition = textNode.absolutePosition();
    
            // so position of textarea will be the sum of positions above:
            var areaPosition = {
              x: stage.container().offsetLeft + textPosition.x,
              y: stage.container().offsetTop + textPosition.y + 50,
            };
    
            // create textarea and style it
            var textarea = document.createElement('textarea');
            document.body.appendChild(textarea);
    
            // apply many styles to match text on canvas as close as possible
            // remember that text rendering on canvas and on the textarea can be different
            // and sometimes it is hard to make it 100% the same. But we will try...
            textarea.value = textNode.text();
            textarea.style.position = 'absolute';
            textarea.style.top = areaPosition.y + 'px';
            textarea.style.left = areaPosition.x + 'px';
            textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
            textarea.style.height =
              textNode.height() - textNode.padding() * 2 + 5 + 'px';
            textarea.style.fontSize = textNode.fontSize() + 'px';
            textarea.style.border = 'none';
            textarea.style.padding = '0px';
            textarea.style.margin = '0px';
            textarea.style.overflow = 'hidden';
            textarea.style.background = 'none';
            textarea.style.outline = 'none';
            textarea.style.resize = 'none';
            textarea.style.lineHeight = textNode.lineHeight();
            textarea.style.fontFamily = textNode.fontFamily();
            textarea.style.transformOrigin = 'left top';
            textarea.style.textAlign = textNode.align();
            textarea.style.color = textNode.fill();
            rotation = textNode.rotation();
            var transform = '';
            if (rotation) {
              transform += 'rotateZ(' + rotation + 'deg)';
            }
    
            var px = 0;
            // also we need to slightly move textarea on firefox
            // because it jumps a bit
            var isFirefox =
              navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            if (isFirefox) {
              px += 2 + Math.round(textNode.fontSize() / 20);
            }
            transform += 'translateY(-' + px + 'px)';
    
            textarea.style.transform = transform;
    
            // reset height
            textarea.style.height = 'auto';
            // after browsers resized it we can set actual value
            textarea.style.height = textarea.scrollHeight + 3 + 'px';
    
            textarea.focus();
    
            function removeTextarea() {
              textarea.parentNode.removeChild(textarea);
              window.removeEventListener('click', handleOutsideClick);
              textNode.show();
              tr.show();
              tr.forceUpdate();
            }
    
            function setTextareaWidth(newWidth) {
              if (!newWidth) {
                // set width for placeholder
                newWidth = textNode.placeholder.length * textNode.fontSize();
              }
              // some extra fixes on different browsers
              var isSafari = /^((?!chrome|android).)*safari/i.test(
                navigator.userAgent
              );
              var isFirefox =
                navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
              if (isSafari || isFirefox) {
                newWidth = Math.ceil(newWidth);
              }
    
              var isEdge =
                document.documentMode || /Edge/.test(navigator.userAgent);
              if (isEdge) {
                newWidth += 1;
              }
              textarea.style.width = newWidth + 'px';
            }
    
            textarea.addEventListener('keydown', function (e) {
              // hide on enter
              // but don't hide on shift + enter
              if (e.keyCode === 13 && !e.shiftKey) {
                textNode.text(textarea.value);
                removeTextarea();
              }
              // on esc do not set value back to node
              if (e.keyCode === 27) {
                removeTextarea();
              }
            });
    
            textarea.addEventListener('keydown', function (e) {
              scale = textNode.getAbsoluteScale().x;
              setTextareaWidth(textNode.width() * scale);
              textarea.style.height = 'auto';
              textarea.style.height =
                textarea.scrollHeight + textNode.fontSize() + 'px';
            });
    
            function handleOutsideClick(e) {
              if (e.target !== textarea) {
                textNode.text(textarea.value);
                removeTextarea();
              }
            }
            setTimeout(() => {
              window.addEventListener('click', handleOutsideClick);
            });
          });
        

        group.add(panels);
        group.add(textbox);
        group.add(Property);
        group.add(textNode);
        return group;
    }
}