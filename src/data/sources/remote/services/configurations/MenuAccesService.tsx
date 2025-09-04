
import { MenuItem, MenuResponse } from "../../../../../domain/models/AccesModel";
import { defaultErrerResponse, ErrorResponse } from "../../../../../domain/models/ErrorResponse";
import { apiRequestHandler } from "../../api/apiRequestHandler";

export class MenuAccesService{
  async create(acces:MenuItem):Promise<MenuResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.post<MenuResponse>('/config/access/create',acces)
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
  async update(id:string,acces:MenuItem):Promise<MenuResponse|ErrorResponse>{
    try {
      const data:MenuItem = { ...acces };
      delete data.id_menu_acceso; 
      const response = await apiRequestHandler.post<MenuResponse>('/config/access/update/'+id,data)
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
  async delete(id:string):Promise<MenuResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.delete<MenuResponse>('/config/access/delete/'+id)
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
  async activate(id:string):Promise<MenuResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.put<MenuResponse>('/config/access/activate/'+id)
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
  async findActive():Promise<MenuResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<MenuResponse>('/config/access/getconfig/access')
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
  async findAll():Promise<MenuResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<MenuResponse>('/config/access/findAll')
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