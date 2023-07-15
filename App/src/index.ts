
import Konva from 'konva'
import $ from 'jquery'
import MainLayer from './layers';
import APPSTATE from './states/AppState'



$(() => {
  const appState = APPSTATE.DEFAULT;
  
  //* Get Elements
  const horizontalSliceButton = $('#horizontalSliceTool')
  const verticallSliceButton = $('#verticalSliceTool')
  const circleGenerateButton = $('#circleGenerate')
  
  const itemList = $('#itemList')
  const commentListToggle = $('#componentListToggle')
  const bodyContainer = $('#bodyContainer')
  const html = $('html')
  
  //* Initial setup
  itemList.hide()
  
  konvaSetup()
});

function konvaSetup(){
  const stage = new Konva.Stage({
    container: 'canvasContainer',
    width: 1920,
    height: 1080
  })
  
  //* DEBUG Items
  const mainLayer = new MainLayer()
  // const debugSquare = new Debugg
}
