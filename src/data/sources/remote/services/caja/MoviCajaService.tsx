
import { apiRequestHandler } from "../../api/apiRequestHandler";
import { defaultErrerResponse, ErrorResponse } from "../../../../../domain/models/ErrorResponse";
import {MoviCaja,MoviCajaFilter,MoviCajaResponse } from "../../../../../domain/models/MoviCajaModel";

export class MoviCajaService{
  async create(moviCaja:MoviCaja):Promise<MoviCajaResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.post<MoviCajaResponse>('/caja-movi/create/'+moviCaja.id_sucursal,{'monto':moviCaja.monto,'tipo':moviCaja.tipo,'descripcion':moviCaja.descripcion})
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
  async update(id:number,moviCaja:MoviCaja):Promise<MoviCajaResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.post<MoviCajaResponse>('/caja-movi/update/'+id,{'monto':moviCaja.monto,'tipo':moviCaja.tipo,'descripcion':moviCaja.descripcion})
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
  async delete(id:number):Promise<MoviCajaResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.delete<MoviCajaResponse>('/caja-movi/delete/'+id)
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
  async activate(id:number):Promise<MoviCajaResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.put<MoviCajaResponse>('/caja-movi/activate/'+id)
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
  async findFilter(moviCajaFilter:MoviCajaFilter):Promise<MoviCajaResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.post<MoviCajaResponse>('/caja-movi/findFilter',moviCajaFilter)
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
  async findAll():Promise<MoviCajaResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<MoviCajaResponse>('/caja-movi/findAll')
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