
import { apiRequestHandler } from "../../api/apiRequestHandler";
import { defaultErrerResponse, ErrorResponse } from "../../../../../domain/models/ErrorResponse";
import { Status, StatusResponse } from "../../../../../domain/models/StatusModel";

export class StatusService{
  async create(Status:Status):Promise<StatusResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.post<StatusResponse>('/config/status/create',Status)
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
  async update(id:number,Status:Status):Promise<StatusResponse|ErrorResponse>{
    try {
      const data:any = { ...Status };
      delete data.id_mascota; 
      const response = await apiRequestHandler.post<StatusResponse>('/config/status/update/'+id,data)
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
  async delete(id:number):Promise<StatusResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.delete<StatusResponse>('/config/status/delete/'+id)
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
  async activate(id:number):Promise<StatusResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.put<StatusResponse>('/config/status/activate/'+id)
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
  async findActive():Promise<StatusResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<StatusResponse>('/config/status/findActive')
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
  async findAll():Promise<StatusResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<StatusResponse>('/config/status/findAll')
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