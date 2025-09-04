

export interface Status {
  id_status?: string;
  descripcion: string;
  color: string;
  estado?: string
}
export interface StatusResponse{
  status:string;
  message?:string;
  data:Status[] |[]|Status;
} 
