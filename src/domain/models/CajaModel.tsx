export interface Caja {
  id: number;
  id_usuario: number;
  fecha_apertura:string;
  fecha_cierre: string|null;
  monto_inicial: number;
  monto_final:number;
  usuario: string;
  myTurno: boolean;
  estado: string;
}
export interface CajaResponse{
  status:string;
  message?:string;
  data:Caja[] |[]|Caja;
} 
