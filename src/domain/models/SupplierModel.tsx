export interface Supplier { 
  id_proveedor?:  string,
  nombre: string,
  nit: string,
  telefono: string,
  direccion: string,
  estado?: string,
}
export interface SupplierResponse{
  status:string;
  message?:string;
  data:Supplier[] |[]|Supplier;
} 
