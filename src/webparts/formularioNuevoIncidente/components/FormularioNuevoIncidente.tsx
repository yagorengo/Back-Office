import * as React from 'react';
import styles from './FormularioNuevoIncidente.module.scss';
import { IFormularioNuevoIncidenteProps } from './IFormularioNuevoIncidenteProps';
import {IFormularioNuevoIncidenteState} from './IFormularioNuevoIncidenteState';
import { ListItemAttachments } from '@pnp/spfx-controls-react/lib/ListItemAttachments';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button'; 
import { ComboBox, IComboBoxOption,IComboBoxStyles} from 'office-ui-fabric-react'; 
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { sp } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';

export default class FormularioNuevoIncidente extends React.Component<IFormularioNuevoIncidenteProps, IFormularioNuevoIncidenteState> {
  
  constructor(props:IFormularioNuevoIncidenteProps){
    super(props);
    this.state = {
      nombreInstructivo: "",
      errorNombreInstructivo: false,
      linkInstructivo: "",
      errorLinkInstructivo: false,
      pais:"",
      errorPais:false,
      procesoAtencion:"",
      errorProcesoAtencion:false,
      numeroCelula:"",
      supervisor: "",
      seccion: "",
      errorSeccion:false,
      tipoServicio: "",
      errorTipoServicio:false,
      pregunta: "",
      errorPregunta:false,
      attach:null,
      itemId: null,
      confirmDialog:false
    }
    
  }
  public componentDidMount(){
    let queryString = new URLSearchParams(window.location.search);
      let qlinkInstructivo = queryString.get('link');
      let qnombreInstructivo = queryString.get('nombre');
      let qpais = queryString.get('pais')
      this.setState({
        linkInstructivo: qlinkInstructivo!=null?qlinkInstructivo:"",
        nombreInstructivo: qnombreInstructivo!=null?qnombreInstructivo:"",
        pais:qpais
      })
      console.log("pais", qpais)
  }
   public async onInit(): Promise<void> {
    sp.setup(this.props.context);
  } 
  private dialogContentProps = {
    type: DialogType.normal,
    title: 'Confirmar envío',
    closeButtonAriaLabel: 'Close',
    subText: '¿Desea enviar el incidente?',
  };
  private  options: IComboBoxOption[] = [
    { key: 0, text: 'Servicio Fijo' },
    { key: 1, text: 'Servicio Móvil' },
    { key: 2, text: 'Otros' }
  ];
  private  optionsPais: IComboBoxOption[] = [
    { key: 'Argentina', text: 'Argentina' },
    { key: 'Uruguay', text: 'Uruguay' },
    { key: 'Paraguay', text: 'Paraguay' }
  ];
 
  private onChangeNombreInstructivo = (value):void => {
    this.setState({nombreInstructivo:value, errorNombreInstructivo:false})
  }
  private onChangeLinkInstructivo = (value):void => {
    this.setState({linkInstructivo:value, errorLinkInstructivo:false})
  }
  private onChangeTipoServicio = (value):void => {
    this.setState({tipoServicio:value.text})
  }
  private onChangePais = (value):void => {
  //  console.log("valor del pais", value)
    this.setState({pais:value.text, errorPais:false})
  }
  private onChangeProcesoAtencion = (value):void => {
    this.setState({procesoAtencion:value, errorProcesoAtencion:false})
  }
  private onChangeCelula = (value):void => {
    this.setState({numeroCelula:value})
  }
  private onChangeSupervisor = (value):void => {
    this.setState({supervisor:value})
  }
  private onChangeSeccion = (value):void => {
    this.setState({seccion:value, errorSeccion:false})
  }
  private onChangePreguntas = (value):void => {
    this.setState({pregunta:value, errorPregunta:false})
  }

  public render(): React.ReactElement<IFormularioNuevoIncidenteProps> {
    const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 300 } };
    let listItemAttachmentsComponentReference = React.createRef<ListItemAttachments>();
     
    return (
      <div className={ styles.formularioNuevoIncidente }>
        <div className = {styles.container}>
          <div className ={styles.column1}>
          <TextField label="Nombre del instructivo " value={this.state.nombreInstructivo} required errorMessage={this.state.errorNombreInstructivo?"Este campo no puede quedar vacío":""}onChange={(e,newValue)=>this.onChangeNombreInstructivo(newValue)}/>
          <TextField label="Link del Instructivo " value={this.state.linkInstructivo} required errorMessage={this.state.errorLinkInstructivo?"Este campo no puede quedar vacío":""}onChange={(e,newValue)=>this.onChangeLinkInstructivo(newValue)}/>
          <ComboBox label="País" options={this.optionsPais} selectedKey={this.state.pais} required errorMessage={this.state.errorPais?"Este campo no puede quedar vacío":""} onChange={(e,newValue)=>this.onChangePais(newValue)}/>
           <ListItemAttachments 
              label={"Adjuntar archivo"}
              description={"Agregue un archivo a adjuntar"}
              ref={listItemAttachmentsComponentReference} 
              context={this.props.context} 
              listId="94e5031b-3470-425b-a557-69c125433f78" 
              /> 
          </div>
          <div className={styles.column2}>
          <ComboBox
          label="Tipo de servicio"
          options={this.options}
          onChange={(e,newValue)=>this.onChangeTipoServicio(newValue)}
          />
          <TextField label= "Proceso de Atención" value={this.state.procesoAtencion} required errorMessage={this.state.errorProcesoAtencion?"Este campo no puede quedar vacío":""}onChange={(e,newValue)=>this.onChangeProcesoAtencion(newValue)}/>
          <TextField label= "Número de célula"  value={this.state.numeroCelula} onChange={(e,newValue)=>this.onChangeCelula(newValue)}/>
          <TextField label= "Supervisor"  value={this.state.supervisor} onChange={(e,newValue)=>this.onChangeSupervisor(newValue)}/>
          <TextField label= "Sección en el instructivo donde se encuentra la información" value={this.state.seccion} required errorMessage={this.state.errorSeccion?"Este campo no puede quedar vacío":""}onChange={(e,newValue)=>this.onChangeSeccion(newValue)}/>
          <TextField label="Preguntas / Consultas / Dudas / Reclamos / Comentario" placeholder="Lo mas completo y preciso posible" value={this.state.pregunta} required multiline rows={12} errorMessage={this.state.errorPregunta?"Este campo no puede quedar vacío":""}onChange={(e,newValue)=>this.onChangePreguntas(newValue)}/>
          </div>
        </div>
        <div className={ styles.button }>
            <PrimaryButton  style={{marginRight:10}} text="Enviar" onClick={()=>this.handleOnClickSave(listItemAttachmentsComponentReference)} />
            <DefaultButton  text="Cancelar"/>
        </div>
        <Dialog
        hidden={!this.state.confirmDialog}
       // onDismiss={toggleHideDialog}
        dialogContentProps={this.dialogContentProps}
     
      >
        <DialogFooter>
          <PrimaryButton onClick={()=>this.confirmSubmit(listItemAttachmentsComponentReference)} text="Enviar" />
          <DefaultButton onClick={()=>this.closeDialog()} text="Cancelar" />
        </DialogFooter>
      </Dialog>
      </div>
    );
  }

  private validateValues = ():boolean => {
    if(this.state.nombreInstructivo=="" || this.state.linkInstructivo==""||this.state.pais ==null||this.state.procesoAtencion==""||this.state.seccion==""||this.state.pregunta==""){
      if(this.state.nombreInstructivo=="")
      {this.setState({errorNombreInstructivo:true})}
      if(this.state.linkInstructivo=="")
      {this.setState({errorLinkInstructivo:true})}
      if(this.state.pais==null)
      { this.setState({errorPais:true})}
      if(this.state.procesoAtencion=="")
      {this.setState( {errorProcesoAtencion:true})}
      if(this.state.seccion=="")
      {this.setState({errorSeccion:true})}
      if(this.state.pregunta=="")
      {this.setState({errorPregunta:true})}
      return false
    }else return true
   
  }

  private handleOnClickSave = (reference):void => {
    if(this.validateValues()){
     this.setState({confirmDialog:true})
    }else{
      console.log("faltan completar datos")
    }
  }

  private confirmSubmit = (reference):void => {
    this.submitItem().then((itemAdded)=> {
      console.log("item agregad", itemAdded)
     reference.current.uploadAttachments(itemAdded.Id);
    });
  }
  private closeDialog = ():void => {
    this.setState({confirmDialog:false})
  }
  private submitItem = ():Promise<any> =>{
    return sp.web.lists.getByTitle("Test formulario").items.add({
      NombredelInstructivo:this.state.nombreInstructivo,
      LinkdelInstructivo:this.state.linkInstructivo,
      Pa_x00ed_s:this.state.pais,
      Secci_x00f3_nenelinstructivodond: this.state.seccion,
      Preguntas_x002f_Consultas_x002f_: this.state.pregunta,
      TipodeServicio: this.state.tipoServicio,
      ProcesodeAtenci_x00f3_n: this.state.procesoAtencion,
      Supervisor: this.state.supervisor,
      NumerodeC_x00e9_lula: this.state.numeroCelula
    }).then((rta)=> {

      return rta.data
    }).catch((err)=>console.log("error add item",err))
  }
}
