export interface Report extends Record<string, any> {}
export interface ReportResponse{
  status:string;
  message?:string;
  data:Report ;
} 

export interface ReportCierreFilter{
  id_usuario:string;
  id_sucursal:string;
  i_fecha:string;
  f_fecha:string;
} 
export interface ReportContratoFilter{
  id_sucursal:string;
  i_fecha:string;
  f_fecha:string;
} 
