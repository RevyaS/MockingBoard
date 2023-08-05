//Data
var appState;

//Elements
var itemList;
var itemListProperty
var componentListToggle;
var PropertyPLBTn;
var bodyContainer;
var html;
var propertylist=[];

var horizontalSliceButton;
var verticalSliceButton;

let propertyPanel;
let mainLayer;

//Canvas Variables
var stage;

$(document).ready(() => 
{
    appState = APPSTATE.DEFAULT;

    //Get Elemeents
    horizontalSliceButton = $('#horizontalSliceTool');
    verticalSliceButton = $('#verticalSliceTool');

    itemList = $('#itemList');
    componentListToggle = $('#componentListToggle');
    PropertyPLBTn = $('#PropertyPLBTn');
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

    mainLayer = new MainLayer();
    let debugSquare = new DebuggingSquare(25, 0, mainLayer);
    propertyPanel = new PropertyPanel(mainLayer.page);

    mainLayer.layer.on(PAGEEVENTS.MOUSEENTERED, (page) => { // hover
        debugSquare.setCurrentPage(page);
        //funtion
        //console.log(page.PanelName+"");
        propertyPanel.Panelset(page);
    })

    mainLayer.layer.on(PAGEEVENTS.MOUSEEXITED, () => {
        debugSquare.removeCurrentPage();
    }) 

    stage.on(STAGEEVENTS.LEFTMOUSECLICKED, () => {
        mainLayer.onMouseClicked();
        //funtion
        //console.log(mainLayer.page.PanelName);
        propertyPanel.PanelClick();
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
    
    propertyPanel.layer.hide();
    stage.add(mainLayer.layer);
    stage.add(debugSquare.layer);
    document.getElementById("PropertyPLBTn").style.left = "98.5%";
    PropertyPLBTn.html('<');
    stage.add(propertyPanel.layer);
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

    //Right click on app
    html.on('contextmenu', function (ev) {
        appState = APPSTATE.DEFAULT;
        stage.fire(STAGEEVENTS.APPSTATECHANGED);
        ev.preventDefault();
    });
}

function saveWork(layers)
{
    //this.mainLayer  
    //console.log(layers[1][0].PanelName ,"sadasd");
    // var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
    // saveAs(blob, "hello world.txt");
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
function togglePropertyPanel()
{
    if (PropertyPLBTn.html().trim() == '&gt;')
    {
        document.getElementById("PropertyPLBTn").style.left = "98.5%";
        document.getElementById("PropertyPLBTn").style.position = "fixed";
        document.getElementById("PropertyPLBTn").style.textAlign = "left";
        PropertyPLBTn.html('<');
        propertyPanel.layer.hide();
    } else 
    {
        document.getElementById("PropertyPLBTn").style.left = "93%";
        PropertyPLBTn.html('>');
        propertyPanel.layer.show();
    }
}


