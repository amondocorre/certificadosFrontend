export interface Product {
  id_producto?:                 string,
  nombre:                       string,
  descripcion?:                 string,
  precio_hora:                  number,
  precio_dia:                   number,
  precio_30dias:                number,
  precio_reposicion:            number,
  estado?:                      string,
  fotografia?:                  string,
  foto?:                        File | undefined | null;
  es_combo?:                    string;
  uso_dias:                     string;
  visible?:                      'si'|'no'
}
export interface ProductResponse{
  status:string;
  message?:string;
  data:Product[] |[]|Product;
} 

export interface EstadoProducto{
  id_estado:string;
  descripcion:string;
  stock:string;
  reposicion:string;
}