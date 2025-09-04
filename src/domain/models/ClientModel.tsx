import { ClientCompany } from "./ClientCompanyModel";


export interface Client {
  id_cliente?:   number;
  id_status?:    string;
  es_empresa:    string;
  nombres:      string;
  ap_paterno:    string;
  ap_materno?:   string | null;
  ci:           string;
  correo?:      string;  
  telefono:     string;
  fecha_nacimiento?: string | null;
  direccion_gps: string;
  direccion:    string;
  profesion?:   string;
  foto_ciA:      string;
  foto_ciB:      string;
  status_color?:  string;
  status?:        string;
  empresas?:       ClientCompany[];
  file_ciA?:File | undefined | null;
  file_ciB?:File | undefined | null;
}

export interface ClientResponse{
  status:string;
  message?:string;
  data:Client[] |[]|Client;
} 
