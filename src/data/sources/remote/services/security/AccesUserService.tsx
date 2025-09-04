
import { AccesUserResponse } from "../../../../../domain/models/AccesModel";
import { defaultErrerResponse, ErrorResponse } from "../../../../../domain/models/ErrorResponse";
import { apiRequestHandler } from "../../api/apiRequestHandler";

export class AccesUserService{
  /*async create(button:Button):Promise<AccesUserResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.post<AccesUserResponse>('/config/button/create',button)
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
  async delete(id:string):Promise<AccesUserResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.delete<AccesUserResponse>('/config/button/delete/'+id)
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
  async findActive():Promise<AccesUserResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<AccesUserResponse>('/config/button/findActive')
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
  }*/
  async findByUser(idUser:number):Promise<AccesUserResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<AccesUserResponse>('/security/acces/findByUser/'+idUser)
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
  async update(idAcces:number,idUser:number,estado:number,buttons:string[]):Promise<AccesUserResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.post<AccesUserResponse>('/security/acces/update/'+idAcces+'/'+idUser,{'estado':estado,'buttons':buttons})
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