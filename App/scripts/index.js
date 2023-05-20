//Elements
var itemList;
var componentListToggle;
var bodyContainer;
//Canvas Variables
var stage;


$(document).ready(() => 
{
    //Get Elemeents
    itemList = $('#itemList');
    componentListToggle = $('#componentListToggle');
    bodyContainer = $('#bodyContainer');
    //Initial Setup
    itemList.hide();
    konvaSetup();
});


function konvaSetup()
{
    stage = new Konva.Stage({
        container: 'canvasContainer',
        width: bodyContainer.width(),
        height: bodyContainer.height()
    })

    let layer = new Konva.Layer();
    // Add shapes and other Konva elements to the layer

    //Initial Page Size
    let page = new Konva.Rect({
        x: 120,
        y: 20,
        width: 800,
        height: 450,
        fill: '#6f6f6f',
    })

    layer.add(page);

    stage.add(layer);
}


//Event Functions
function toggleComponentList()
{
    //Show
    if (componentListToggle.html().trim() == '&gt;')
    {
        componentListToggle.html('<');
        itemList.show();
    } else //Hide
    {
        componentListToggle.html('>');
        itemList.hide();
    }
}


