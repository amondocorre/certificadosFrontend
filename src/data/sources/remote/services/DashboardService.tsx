
import { apiRequestHandler } from "../api/apiRequestHandler";
import { defaultErrerResponse, ErrorResponse } from "../../../../domain/models/ErrorResponse";
import { ApiResponseRent, IngresosDiarios, ResponseRentDetail, TotalInventario } from "../../../../domain/models/DashboardModel";

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
  async getTotalesInventario(id_sucursal:number):Promise<TotalInventario[]|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<TotalInventario[]>('/dashboard/getTotalesInventario/'+id_sucursal,)
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
  async listRent(id_sucursal:number,limit:number,page:number):Promise<ApiResponseRent|ErrorResponse>{
    try {
      const response = await apiRequestHandler.post<ApiResponseRent>('/dashboard/listRent/'+id_sucursal,{limit:limit,page:page})
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
  async listRentEntrega(id_sucursal:number,limit:number,page:number):Promise<ApiResponseRent|ErrorResponse>{
    try {
      const response = await apiRequestHandler.post<ApiResponseRent>('/dashboard/listRentEntrega/'+id_sucursal,{limit:limit,page:page})
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
  async getDetailRent(id:number):Promise<ResponseRentDetail|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<ResponseRentDetail>('/dashboard/getDetailRent/'+id)
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