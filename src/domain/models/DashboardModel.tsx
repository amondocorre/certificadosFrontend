export interface IngresosDiarios {
  date: string;
  ingresos: number;
  egresos: number;
  
}

interface Data extends Record<string, any> {}
export interface EvaluantionMedical {
  id_evaluacion_medica: number;
  fecha_evaluacion: string;
  nombre_completo: string;
  ci:     string;
  id_estado_evaluacion: number;
}
export interface EvaluantionPsychological {
  id_evaluacion_psicologica: number;
  fecha_evaluacion: string;
  nombre_completo: string;
  ci:     string;
  id_estado_evaluacion: number;
}
interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponseRent {
  data: EvaluantionMedical[] | EvaluantionPsychological[];
  pagination: Pagination;
}
export interface ClientesSexo {
  total: number;
  masculino: number;
  femenino: number;
}
