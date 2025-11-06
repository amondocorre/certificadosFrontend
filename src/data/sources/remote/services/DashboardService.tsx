
import { apiRequestHandler } from "../api/apiRequestHandler";
import { defaultErrerResponse, ErrorResponse } from "../../../../domain/models/ErrorResponse";
import { ApiResponse, IngresosDiarios, ResponseEvaluations} from "../../../../domain/models/DashboardModel";

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
  async listEvaMedical(id_sucursal:number,limit:number,page:number):Promise<ApiResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<ApiResponse>('/dashboard/listEvaMedical/'+id_sucursal,{params:{limit:limit,page:page}})
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
  async listEvaPsychological(id_sucursal:number,limit:number,page:number):Promise<ApiResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.post<ApiResponse>('/dashboard/listEvaPsychological/'+id_sucursal,{params:{limit:limit,page:page}})
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
  async listInfEvaPsychological(id_sucursal:number,limit:number,page:number):Promise<ApiResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.post<ApiResponse>('/dashboard/listInfEvaPsychological/'+id_sucursal,{params:{limit:limit,page:page}})
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
  async getTotalEvaluations(id_sucursal:number):Promise<ResponseEvaluations|ErrorResponse>{
    try {
      const response = await apiRequestHandler.post<ResponseEvaluations>('/dashboard/getTotalEvaluations/'+id_sucursal)
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