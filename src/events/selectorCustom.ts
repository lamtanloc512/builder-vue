import {App, createApp, Ref} from "vue";
import Panel from "../components/Panel.vue";
import {Editor, Selector} from "grapesjs";

const selectorCustom = (id: Number, panelRef: Ref, editor : Editor) => {
//  if(PanelAppRef.value) PanelAppRef.value.unmount();
//  console.log()
//  let { states, selected, container } = props;
  const sidePanel = document.getElementById(`${id}`)
    if(sidePanel){
      container = sidePanel
      PanelAppRef.value = createApp(Panel, {states, selected, container, selector}).mount(sidePanel);
    }
  
}

export const customSelectorUI = (id: Number, panelRef: Ref, editor : Editor) => {
  const sidePanel = document.getElementById(`${id}`)
  if(sidePanel){
    createApp(Panel, {editor}).mount(sidePanel);
  }
}