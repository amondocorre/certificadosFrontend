export interface IngresosDiarios {
  date: string;
  ingresos: number;
  egresos: number;
  
}

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

export interface ApiResponse {
  data: EvaluantionMedical[] | EvaluantionPsychological[];
  pagination: Pagination;
}
export interface EvaluationData {
  total: number;
  masculino: number; 
  femenino: number;
}
export interface ResponseEvaluations{
  medical :EvaluationData;
  psychological:EvaluationData
}
