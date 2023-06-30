
//Data
var appState;

//Elements
var itemList;
var componentListToggle;
var bodyContainer;
var html;

var horizontalSliceButton;
var verticalSliceButton;
var circleButton;

//Canvas Variables
var stage;


const log = console.log;    //* short for console.log, for debugging purposes

$(document).ready(() => 
{
    appState = APPSTATE.DEFAULT;

    //Get Elemeents
    horizontalSliceButton = $('#horizontalSliceTool');
    verticalSliceButton = $('#verticalSliceTool');
    circleButton = $('#circleGenerate');

    itemList = $('#itemList');
    componentListToggle = $('#componentListToggle');
    bodyContainer = $('#bodyContainer');
    html = $('html');

    //Initial Setup
    itemList.hide();
    konvaSetup();

    eventSetup();
});


function konvaSetup()
{
    stage = new Konva.Stage({
        container: 'canvasContainer',
        width: 1920,
        height: 1080
    })

    //DEBUG Items
    let mainLayer = new MainLayer();
    let debugSquare = new DebuggingSquare(25, 0, mainLayer);

    mainLayer.layer.on(PAGEEVENTS.MOUSEENTERED, (page) => {
        debugSquare.setCurrentPage(page);
    })

    mainLayer.layer.on(PAGEEVENTS.MOUSEEXITED, () => {
        debugSquare.removeCurrentPage();
    })

    stage.on(STAGEEVENTS.LEFTMOUSECLICKED, () => {
        mainLayer.onMouseClicked();
    });

    stage.on(STAGEEVENTS.MOUSEMOVED, () => {
        debugSquare.onMouseMove();
        mainLayer.onMouseMove();
    });

    stage.on(STAGEEVENTS.MOUSEWHEEL, (evt) => {
        let deltaY = evt.evt.deltaY;
        mainLayer.zoomPage(deltaY);
        debugSquare.onPageScale();
    });

    stage.on(STAGEEVENTS.APPSTATECHANGED, () => {
        debugSquare.onStateChanged(appState);
        mainLayer.onStateChanged(appState);
    });

    stage.add(mainLayer.layer);
    stage.add(debugSquare.layer);
}

function eventSetup()
{
    stage.on('mousemove', function () {
        stage.fire(STAGEEVENTS.MOUSEMOVED);
    });

    stage.on('pointerclick', function (e) {
        if (e.evt.button == 0)
        {
            stage.fire(STAGEEVENTS.LEFTMOUSECLICKED);
        }
    });

    stage.on('wheel', function (evt) {
        stage.fire(STAGEEVENTS.MOUSEWHEEL, evt);
    });

    horizontalSliceButton.on('click', function () {
        
        appState = APPSTATE.HORIZONTALSLICE;
        stage.fire(STAGEEVENTS.APPSTATECHANGED);
    });

    verticalSliceButton.on('click', function () {
        appState = APPSTATE.VERTICALSLICE;
        stage.fire(STAGEEVENTS.APPSTATECHANGED);
    });
    
    circleButton.on('click', function() {
        handleComponentButtonClick("0");
    });

    //Right click on app
    html.on('contextmenu', function (ev) {
        appState = APPSTATE.DEFAULT;
        stage.fire(STAGEEVENTS.APPSTATECHANGED);
        ev.preventDefault();
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

//* Event Button Functions based on their button name
function handleComponentButtonClick(buttonName)
{
    if(buttonName == "0")
    {
        appState = APPSTATE.CIRCLE;
        stage.fire(STAGEEVENTS.APPSTATECHANGED);
    }
}