import Konva from "konva";
import APPSTATE from "../states/AppState";
import Page from '../shapes/Page'
import PAGEEVENTS from "../states/PageEvents";
import { Layer } from "konva/lib/Layer";

class MainLayer {
  //* Just type public in this fields if u want to make it public 
  
  state = APPSTATE.DEFAULT
  x = 240;
  y = 60;
  origWidth = 890;
  origHeight = 450;
  layers = <any>[]
  outerLayer = <any>[]
  
  selectedPage: any;
  width: number;
  height: any;
  layer: Layer
  currentLayer = 0;
  group: any
  page: Page
  
  constructor() {
    
    const layer = new Konva.Layer();
    this.width = this.origWidth;
    this.height = this.origHeight;
    
    const group = new Konva.Group({
      x: this.x,
      y: this.y
    })
    
    this.group = group
    layer.add(group)
    
    //* Iniial Page Size
    const page = new Page(0, 0, this.origWidth, this.origHeight, 0)
    
    group.add(page.group)
    
    this.page = page
    this.layers.push([page])
    this.outerLayer.push(page)
    
    let mainLayerRef = this
    this.page.group.on(PAGEEVENTS.MOUSEENTERED, (page) =>{
      mainLayerRef.onPageMouseEntered(page)
    })
    
    // TODO
    this.layer = layer
  }
  
  onPageMouseEntered(page: any){
    this.selectedPage = page
    this.layer.fire(PAGEEVENTS.MOUSEENTERED, page)
  }
  
  onPageMouseExited(){
    this.selectedPage = null
    this.layer.fire(PAGEEVENTS.MOUSEEXITED)
  }
  
}

export default MainLayer
