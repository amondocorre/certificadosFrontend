
import { apiRequestHandler } from "../../api/apiRequestHandler";
import { defaultErrerResponse, ErrorResponse } from "../../../../../domain/models/ErrorResponse";
import { SucursalUserResponse } from "../../../../../domain/models/SucursalModel";

export class SucursalUserService{
  async addSucursales(id_usuario:number,sucursales:string[]):Promise<SucursalUserResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.post<SucursalUserResponse>('/config/sucursal-user/addSucursales',{id_usuario:id_usuario,sucursales:sucursales})
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
  async getSucursalesUser():Promise<SucursalUserResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<SucursalUserResponse>('/config/sucursal-user/getSucursalesUser')
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
  async findAll():Promise<SucursalUserResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<SucursalUserResponse>('/config/sucursal-user/findAll')
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