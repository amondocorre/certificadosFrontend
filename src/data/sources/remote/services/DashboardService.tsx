
import { apiRequestHandler } from "../api/apiRequestHandler";
import { defaultErrerResponse, ErrorResponse } from "../../../../domain/models/ErrorResponse";
import { ApiResponseRent, IngresosDiarios} from "../../../../domain/models/DashboardModel";

export class DashboardService{
  async getIngresosDiarios(id_sucursal:number):Promise<IngresosDiarios[]|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<IngresosDiarios[]>('/dashboard/totalIngresosDiarios/'+id_sucursal,)
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
  async listEvaMedical(id_sucursal:number,limit:number,page:number):Promise<ApiResponseRent|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<ApiResponseRent>('/dashboard/listEvaMedical/'+id_sucursal,{params:{limit:limit,page:page}})
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
  async listEvaPsychological(id_sucursal:number,limit:number,page:number):Promise<ApiResponseRent|ErrorResponse>{
    try {
      const response = await apiRequestHandler.post<ApiResponseRent>('/dashboard/listEvaPsychological/'+id_sucursal,{param:{limit:limit,page:page}})
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