import Konva from 'konva';
import $ from 'jquery';
import APPSTATE from './states/AppState';
import PAGEEVENTS from './states/PageEvents';
import { MainLayer } from './layers/MainLayer';
import { DebuggingSquare } from './layers/DebuggingSquare';
import STAGEEVENTS from './states/StageEvents';
import { Stage } from 'konva/lib/Stage';
import { PropertyPanel } from './layers/PropertyPanel';
//import {SaveProject} from './states/SaveProject';

//* Data
var appState: any;

//* Elements

var horizontalSliceButton: JQuery<HTMLElement>;
var verticalSliceButton: JQuery<HTMLElement>;
var circleGenerateButton: JQuery<HTMLElement>;
var html: JQuery<HTMLElement>;
var itemList: JQuery<HTMLElement>;
var propertylist: JQuery<HTMLElement>;
var componentListToggle: JQuery<HTMLElement>;
var propertyPLBTn : JQuery<HTMLElement>;
var bodyContainer: JQuery<HTMLElement>;
var mainBody : JQuery<HTMLElement>;

//const propertychange = document.getElementById("propertyPLBTn");

//* Canvas Variables
var stage: Stage;
// var pages: any;
// var save: SaveProject;

$(() => {
  appState = APPSTATE.DEFAULT;

  //* Get Elements
  horizontalSliceButton = $('#horizontalSliceTool');
  verticalSliceButton = $('#verticalSliceTool');
  circleGenerateButton = $('#circleGenerate');

  itemList = $('#itemList');
  propertylist = $('#propertylist');
  componentListToggle = $('#componentListToggle');
  componentListToggle.click(toggleComponentList);
  propertyPLBTn = $('#propertyPLBTn');
  propertyPLBTn.click(togglePropertyPanel);
  mainBody = $('#myDIV');
  mainBody.scroll(getscrollvalues)
  bodyContainer = $('#bodyContainer');
  html = $('html');

  //* Initial setup
  //propertychange.style.marginLeft = "0px";  
  propertyPLBTn.html('<');
  // propertylist.hide();
  itemList.hide();

  konvaSetup();
  eventSetup();
});


function konvaSetup() {
  stage = new Konva.Stage({
    container: 'canvasContainer',
    width: 1920,
    height: 1080,
  });

  //DEBUG Items
  let mainLayer = new MainLayer();
  let debugSquare = new DebuggingSquare(25, 0, mainLayer);
  let propertyPanel = new PropertyPanel(mainLayer.page);

  //pages = mainLayer.page;

  mainLayer.layer.on(PAGEEVENTS.MOUSEENTERED, (page) => {
    debugSquare.setCurrentPage(page);
    propertyPanel.Panelset(page);
    //pages = page;
  });

  mainLayer.layer.on(PAGEEVENTS.MOUSEEXITED, () => {
    debugSquare.removeCurrentPage();
  });

  stage.on(STAGEEVENTS.LEFTMOUSECLICKED, () => {
    mainLayer.onMouseClicked();
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

  stage.add(propertyPanel.layer);
  stage.add(mainLayer.layer);
  stage.add(debugSquare.layer);
}
function getscrollvalues()
{
  var listposition = []
  const element = document.getElementById("myDIV");
  listposition[0] = element?.scrollLeft;
  listposition[1] = element?.scrollTop;
  return listposition;
}
// function onClickSaveProject()
// {
//   console.log(pages.PanelName);
//   console.log(pages.origWidth);
//   console.log(pages.origHeight);
//   console.log(pages.width);
//   console.log(pages.height);
//   console.log(pages.fill);
//   console.log(pages.x);
//   console.log(pages.y);
//   console.log(pages.layerIndex);
//   console.log(pages.mouseEntered);
//   console.log(pages.gradientOutlineAmount);
//   console.log(pages.gradientWidth);
//   console.log(pages.zIndex);

//   //let save = new SaveProject(pages);
// }

function eventSetup() {
  stage.on('mousemove', () => {
    stage.fire(STAGEEVENTS.MOUSEMOVED);
  });

  stage.on('pointerclick', function (e) {
    if (e.evt.button == 0) {
      stage.fire(STAGEEVENTS.LEFTMOUSECLICKED);
    }
  });

  stage.on('wheel', (evt) => {
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

  circleGenerateButton.on('click', function () {
    handleComponentButtonClick('0');
  });

  //Right click on app
  html.on('contextmenu', function (ev) {
    appState = APPSTATE.DEFAULT;
    stage.fire(STAGEEVENTS.APPSTATECHANGED);
    ev.preventDefault();
  });
}

//Event Functions
function toggleComponentList() {
  //Show
  if (componentListToggle.html().trim() == '&gt;') {
    componentListToggle.html('<');
    itemList.show();
  } //Hide
  else {
    componentListToggle.html('>');
    itemList.hide();
  }
}

function togglePropertyPanel()
{
  //Hide
  if (propertyPLBTn.html().trim() == '&gt;') {
    propertyPLBTn.html('<');
    //propertychange.style.marginLeft = "0px";  
    propertylist.hide();
    console.log('s');
  } //Show
  else {
    propertyPLBTn.html('>');
    propertylist.show();
    //propertychange.style.marginLeft = "-200px";  
    console.log('h');
  }
}

//* Event Button Functions based on their button name
function handleComponentButtonClick(buttonName: string) {
  if (buttonName == '0') {
    appState = APPSTATE.CIRCLE;
    stage.fire(STAGEEVENTS.APPSTATECHANGED);
  }
}
