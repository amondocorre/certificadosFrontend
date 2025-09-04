export interface MoviCaja {
  id_movimientos_caja?: number;
  id_usuario?: number;
  id_caja?:number;
  id_pago?:number;
  tipo:string;
  descripcion?: string;
  monto:number;
  fecha_movimiento?: string;
  usuario?: string;
  id_sucursal:string;
}
export interface MoviCajaFilter{
  id_sucursal: string;
  ifecha: string;
  ffecha: string;
  tipo: string
}
export interface MoviCajaResponse{
  status:string;
  message?:string;
  data:MoviCaja[] |[]|MoviCaja;
} 
