export interface Calendar extends Record<string, any> {}
export interface CalendarResponse{
  status:string;
  message?:string;
  data:Calendar ;
} 

export interface DiaCalendario {
  fecha: string;
  es_feriado: '0' | '1';
  es_fin_de_semana: '0' | '1';
  es_laboral: '0' | '1';
  dia_mes: '0' | '1';
  nombre_feriado?: string;
  dia_semana?: string;
}

export interface EstructuraCalendario {
  mes: string;
  año: number;
  semanas: DiaCalendario[][];
}

