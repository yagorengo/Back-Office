export interface IFormularioNuevoIncidenteState{
    nombreInstructivo: string;
    errorNombreInstructivo: Boolean;
    linkInstructivo: string;
    errorLinkInstructivo: Boolean;
    pais:string;
    errorPais:Boolean;
    procesoAtencion:string;
    errorProcesoAtencion:Boolean;
    numeroCelula:string;
    supervisor: string;
    seccion: string;
    errorSeccion:Boolean;
    tipoServicio: string;
    errorTipoServicio:Boolean;
    pregunta: string;
    errorPregunta:Boolean;
    attach:string;
    itemId:Number;
    confirmDialog:Boolean;
}