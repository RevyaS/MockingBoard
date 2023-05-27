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
        width: 1920,
        height: 1080
    })

    //DEBUG Items
    let debugSquare = new DebuggingSquare(25, 0);

    let mainLayer = new MainLayer();

    stage.add(mainLayer.layer);
    stage.add(debugSquare.layer);

    stage.on('mousemove', function () {
        debugSquare.onMouseMove();
    });

    stage.on('wheel', function (evt) {
        let deltaY = evt.evt.deltaY;
        mainLayer.zoomPage(deltaY);
    });
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


