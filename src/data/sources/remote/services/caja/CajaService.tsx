
import { apiRequestHandler } from "../../api/apiRequestHandler";
import { defaultErrerResponse, ErrorResponse } from "../../../../../domain/models/ErrorResponse";
import {CajaResponse } from "../../../../../domain/models/CajaModel";

export class CajaService{
  async create(monto:number,id_sucursal:number):Promise<CajaResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.post<CajaResponse>('/caja/create/'+id_sucursal,{'monto_inicial':monto})
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
  async update(id:number,monto:number,id_sucursal:number):Promise<CajaResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.post<CajaResponse>('/caja/update/'+id+'/'+id_sucursal,{'monto_final':monto})
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
  async delete(id:number):Promise<CajaResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.delete<CajaResponse>('/caja/delete/'+id)
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
  async activate(id:number):Promise<CajaResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.put<CajaResponse>('/caja/activate/'+id)
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
  async findActive(id_sucursal:number):Promise<CajaResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<CajaResponse>('/caja/findActive/'+id_sucursal)
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
  async findAll():Promise<CajaResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<CajaResponse>('/caja/findAll')
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