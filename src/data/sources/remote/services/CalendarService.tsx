
import { apiRequestHandler } from "../api/apiRequestHandler";
import { defaultErrerResponse, ErrorResponse } from "../../../../domain/models/ErrorResponse";
import { CalendarResponse, DiaCalendario } from "../../../../domain/models/CalendarModel";

export class CalendarService{
  async getFeriadosMes():Promise<CalendarResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<CalendarResponse>('/config/calendar/getFeriadosMes')
      return response.data
    } catch (error:any) {
      if(error.response){
        const errorData:ErrorResponse = error.response.data;
        if(Array.isArray(errorData.message)){
          errorData.message = errorData.message.join(',');
        }
        return errorData;
      }
      return defaultErrerResponse;
    }
  }
  async getCalendarioByAnio(anio:number):Promise<CalendarResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<CalendarResponse>('/config/calendar/getCalendarioByAnio/'+anio)
      return response.data
    } catch (error:any) {
      if(error.response){
        const errorData:ErrorResponse = error.response.data;
        if(Array.isArray(errorData.message)){
          errorData.message = errorData.message.join(',');
        }
        return errorData;
      }
      return defaultErrerResponse;
    }
  }
  async poblarCalendarioPorAnio(anio:number):Promise<CalendarResponse|ErrorResponse>{
    try { 
      const response = await apiRequestHandler.post<CalendarResponse>('/config/calendar/poblarCalendarioPorAnio',{anio:anio})
      return response.data
    } catch (error:any) {
      if(error.response){
        const errorData:ErrorResponse = error.response.data;
        if(Array.isArray(errorData.message)){
          errorData.message = errorData.message.join(',');
        }
        return errorData;
      }
      return defaultErrerResponse;
    }
  } 
  async poblarCalendarioPorMes(anio:number,mes:string):Promise<CalendarResponse|ErrorResponse>{
    try { 
      const response = await apiRequestHandler.post<CalendarResponse>('/config/calendar/poblarCalendarioPorMes',{anio:anio,mes:mes})
      return response.data
    } catch (error:any) {
      if(error.response){
        const errorData:ErrorResponse = error.response.data;
        if(Array.isArray(errorData.message)){
          errorData.message = errorData.message.join(',');
        }
        return errorData;
      }
      return defaultErrerResponse;
    }
  }
   
  async updateDate(diaCalendario:DiaCalendario):Promise<CalendarResponse|ErrorResponse>{
    try { 
      const response = await apiRequestHandler.post<CalendarResponse>('/config/calendar/updateDate',
        {
          es_feriado:diaCalendario.es_feriado,
          es_laboral:diaCalendario.es_laboral,
          fecha:diaCalendario.fecha,
          nombre_feriado:diaCalendario.nombre_feriado
        })
      return response.data
    } catch (error:any) {
      if(error.response){
        const errorData:ErrorResponse = error.response.data;
        if(Array.isArray(errorData.message)){
          errorData.message = errorData.message.join(',');
        }
        return errorData;
      }
      return defaultErrerResponse;
    }
  }
}