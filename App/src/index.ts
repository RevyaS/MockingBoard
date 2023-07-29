import Konva from 'konva';
import $ from 'jquery';
import APPSTATE from './states/AppState';
import PAGEEVENTS from './states/PageEvents';
import { MainLayer } from './layers/MainLayer';
import { DebuggingSquare } from './layers/DebuggingSquare';
import STAGEEVENTS from './states/StageEvents';
import { Stage } from 'konva/lib/Stage';

//* Data
var appState: any;

//* Elements

var horizontalSliceButton: JQuery<HTMLElement>;
var verticalSliceButton: JQuery<HTMLElement>;
var circleGenerateButton: JQuery<HTMLElement>;
var html: JQuery<HTMLElement>;
var itemList: JQuery<HTMLElement>;
var componentListToggle: JQuery<HTMLElement>;
var bodyContainer: JQuery<HTMLElement>;

//* Canvas Variables
var stage: Stage;

$(() => {
  appState = APPSTATE.DEFAULT;

  //* Get Elements
  horizontalSliceButton = $('#horizontalSliceTool');
  verticalSliceButton = $('#verticalSliceTool');
  circleGenerateButton = $('#circleGenerate');

  itemList = $('#itemList');
  componentListToggle = $('#componentListToggle');
  componentListToggle.click(toggleComponentList);

  bodyContainer = $('#bodyContainer');
  html = $('html');

  //* Initial setup
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

  mainLayer.layer.on(PAGEEVENTS.MOUSEENTERED, (page) => {
    debugSquare.setCurrentPage(page);
  });

  mainLayer.layer.on(PAGEEVENTS.MOUSEEXITED, () => {
    debugSquare.removeCurrentPage();
  });

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

//* Event Button Functions based on their button name
function handleComponentButtonClick(buttonName: string) {
  if (buttonName == '0') {
    appState = APPSTATE.CIRCLE;
    stage.fire(STAGEEVENTS.APPSTATECHANGED);
  }
}
