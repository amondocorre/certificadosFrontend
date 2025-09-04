
import {CalendarResponse, DiaCalendario} from "../models/CalendarModel";
import { ErrorResponse } from "../models/ErrorResponse";
export interface CalendarRepository{ 
  getFeriadosMes():Promise<CalendarResponse|ErrorResponse>;
  getCalendarioByAnio(anio:number):Promise<CalendarResponse|ErrorResponse>;
  poblarCalendarioPorAnio(anio:number):Promise<CalendarResponse|ErrorResponse>;
  poblarCalendarioPorMes(anio:number,mes:string):Promise<CalendarResponse|ErrorResponse>;
  updateDate(diaCalendario:DiaCalendario):Promise<CalendarResponse|ErrorResponse>;
}