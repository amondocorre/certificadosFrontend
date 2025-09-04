
import { Button, ButtonsResponse } from "../../../../../domain/models/ButtonModel";
import { defaultErrerResponse, ErrorResponse } from "../../../../../domain/models/ErrorResponse";
import { apiRequestHandler } from "../../api/apiRequestHandler";

export class ButtonService{
  async create(button:Button):Promise<ButtonsResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.post<ButtonsResponse>('/config/button/create',button)
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
  async update(id:string,button:Button):Promise<ButtonsResponse|ErrorResponse>{
    try {
      const data:any = { ...button };
      delete data.id_boton; 
      const response = await apiRequestHandler.post<ButtonsResponse>('/config/button/update/'+id,button)
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
  async delete(id:string):Promise<ButtonsResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.delete<ButtonsResponse>('/config/button/delete/'+id)
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
  async findActive():Promise<ButtonsResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<ButtonsResponse>('/config/button/findActive')
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
  async findAll():Promise<ButtonsResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<ButtonsResponse>('/config/button/findAll')
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