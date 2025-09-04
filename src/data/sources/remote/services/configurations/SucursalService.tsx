
import { apiRequestHandler } from "../../api/apiRequestHandler";
import { defaultErrerResponse, ErrorResponse } from "../../../../../domain/models/ErrorResponse";
import { Sucursal, SucursalResponse } from "../../../../../domain/models/SucursalModel";

export class SucursalService{
  async create(sucursal:Sucursal):Promise<SucursalResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.post<SucursalResponse>('/config/sucursal/create',sucursal)
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
  async update(id:number,sucursal:Sucursal):Promise<SucursalResponse|ErrorResponse>{
    try {
      const data:any = { ...sucursal };
      delete data.id_mascota; 
      const response = await apiRequestHandler.post<SucursalResponse>('/config/sucursal/update/'+id,data)
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
  async delete(id:number):Promise<SucursalResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.delete<SucursalResponse>('/config/sucursal/delete/'+id)
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
  async activate(id:number):Promise<SucursalResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.put<SucursalResponse>('/config/sucursal/activate/'+id)
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
  async findActive():Promise<SucursalResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<SucursalResponse>('/config/sucursal/findActive')
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
  async findAll():Promise<SucursalResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<SucursalResponse>('/config/sucursal/findAll')
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