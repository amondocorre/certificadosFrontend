

export interface Company {
    id_empresa_sis?:      number;
    nombre:          string;
    nit:              string;
    direccion?:       string;
    telefono?:        string;
    celular:          number;
    correo:           string;
    pagina_web?:      string;
    ubicacion_gps?:   string;
    logo_empresa?:    string;
    logo_impresion?:  string;
    pie_documento?:   string;
    created_at?:      string;
    updated_at?:      string;
    fileE?:File | undefined | null;
    fileI?:File | undefined | null;
  
}
export interface CompanyResponse{
  status:string;
  message?:string;
  data:Company[] |[]|Company;
} 
