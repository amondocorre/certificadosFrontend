

export interface Perfil {
  id: string;
  nombre: string;
  estado?: string;
}
export interface PerfilResponse{
  status:string;
  message?:string;
  data:Perfil[] |[]|Perfil;
} 
