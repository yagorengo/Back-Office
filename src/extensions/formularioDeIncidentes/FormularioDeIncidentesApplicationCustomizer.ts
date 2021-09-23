import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { sp } from "@pnp/sp/presets/all";
import * as strings from 'FormularioDeIncidentesApplicationCustomizerStrings';
import $ from "jquery";
const LOG_SOURCE: string = 'FormularioDeIncidentesApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IFormularioDeIncidentesApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class FormularioDeIncidentesApplicationCustomizer
  extends BaseApplicationCustomizer<{}> {

  @override
  public onInit(): Promise<void> {
   
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    let customCss: string = ``;
    let head: any = document.getElementsByTagName("head")[0] || document.documentElement;
        let customStyle: HTMLStyleElement = document.createElement("style");
        head.appendChild(customStyle);
        customStyle.title = "MSCustom";
        customStyle.type = "text/css";
        customStyle.appendChild(document.createTextNode(customCss));
    
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolder);
   this._renderPlaceHolder();
    return Promise.resolve();
  }

 
  private _renderPlaceHolder(): Promise<any> { 
    console.log("render placeholder")
    return sp.web.currentUser.get().then((user)=> {
      if(user.IsShareByEmailGuestUser){
        console.log("ES GUEST")
        $('div[class^="ms-FocusZone css-74 ms-CommandBar root-75"]').css({ 'display':'none' });
        $('div[name^="Compartido con nosotros"]').css({ 'display':'none' });
        $('div[name^="Papelera de reciclaje"]').css({ 'display':'none' });
        return $('div[class^="ms-FocusZone css-106 ms-CommandBar root-107"]').css({ 'display':'none' });
      }
      
    })
   
  }
}
