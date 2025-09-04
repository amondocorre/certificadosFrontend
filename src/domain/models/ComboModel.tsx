
export interface ComboProduct {
  id_producto: string;
  nombre: string;
  cantidad: number;
  fotografia?:string,
}


export interface Combo {
  id_producto?:                 string;
  nombre:                       string;
  precio_hora:                  number;
  precio_dia:                   number;
  precio_30dias:                number;
  estado?:                      string;
  descripcion?:                 string,
  fotografia?:                  string;
  foto?:                        File | undefined | null;
  es_combo?:                    string;
  uso_dias:                     string;
  visible?:                      'si'|'no';
  id?:                          number;
  codigoPrecio?:                string;
  cantidad?:                    string;
  tipo?:                        string;
  precioU?:                    string;
  subTotal?:                    string;
  productos?:                    ComboProduct[] | []; 
  
}
export interface ComboResponse{
  status:string;
  message?:string;
  data:Combo[] |[]|Combo;
} 
