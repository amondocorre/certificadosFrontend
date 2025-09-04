
export interface Button{
  id_boton?: number;
  nombre: string;
  estado?: number;
  descripcion: string;
  tooltip: string;
  icono: string;
  onclick: string;
  tipo: string;
}
export interface ButtonsResponse{
  status:string;
  buttns:Button[];
} 