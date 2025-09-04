export interface User {
  id_usuario?:     string;
  id_perfil:       string;
  nombre:          string;
  email:           string;
  telefono?:       string | null;
  celular?:        string | null;
  estado:         'Activo' | 'Inactivo';
  fecha_ingreso?:   string | null;
  fecha_baja?:      string | null;
  sueldo?:         number | null;
  usuario:         string;
  foto?:            string|null;
  fecha_registro?: string | null;
  ci?:             string | null;
  ext?:            string | null;
  complemento?:    string | null;
  sexo?:           string | null;
  fecha_nacimiento?: string | null;
  direccion?:      string | null;
  ubicacion_gps?:  string | null;
  file?:File | undefined | null
  pefil?: string | null
}
export interface userResponse{
  status:string;
  message?:string|null
  users?:User[]|null;
} 
export interface DataChangePassword{
  username:         string;
  password:         string;
  newPassword:      string;
  repeatNewPassword:string;
} 