
import { apiRequestHandler } from "../api/apiRequestHandler";
import { defaultErrerResponse, ErrorResponse } from "../../../../domain/models/ErrorResponse";
import { Perfil, PerfilResponse } from "../../../../domain/models/PerfilModel";

export class PerfilService{
  async create(perfil:Perfil):Promise<PerfilResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.post<PerfilResponse>('/perfil/create',perfil)
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
  async update(id:string,perfil:Perfil):Promise<PerfilResponse|ErrorResponse>{
    try {
      const data:any = { ...perfil };
      delete data.id; 
      const response = await apiRequestHandler.post<PerfilResponse>('/perfil/update/'+id,data)
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
  async delete(id:string):Promise<PerfilResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.delete<PerfilResponse>('/perfil/delete/'+id)
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
  async activate(id:string):Promise<PerfilResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.put<PerfilResponse>('/perfil/activate/'+id)
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
  async getPerfil():Promise<PerfilResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<PerfilResponse>('/perfil/getPerfil')
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
  async getPerfilAll():Promise<PerfilResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<PerfilResponse>('/perfil/findAllPerfil')
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