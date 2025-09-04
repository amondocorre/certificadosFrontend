export interface IngresosDiarios {
  date: string;
  ingresos: number;
  egresos: number;
  
}
export interface TotalInventario extends Record<string, any> {}
interface Data extends Record<string, any> {}
export interface Rent {
  id_alquiler_documento: number;
  fecha_devolucion?: string;
  fecha_entrega?: string;
  cliente: string;
  total_pagar: number;
  a_cuenta: number;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponseRent {
  data: Rent[];
  pagination: Pagination;
}
export interface ResponseRentDetail {
  data: Data;
  productos: Data;
}