export interface Sucursal { 
  id_sucursal?:  string,
  nombre: string,
  telefono: string,
  direccion: string,
  estado?: string,
}
export interface SucursalResponse{
  status:string;
  message?:string;
  data:Sucursal[] |[]|Sucursal;
} 
export interface SucursalUserResponse{
  status:string;
  message?:string;
  data:any;
} 
