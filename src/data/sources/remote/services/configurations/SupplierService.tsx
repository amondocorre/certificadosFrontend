
import { apiRequestHandler } from "../../api/apiRequestHandler";
import { defaultErrerResponse, ErrorResponse } from "../../../../../domain/models/ErrorResponse";
import { Supplier, SupplierResponse } from "../../../../../domain/models/SupplierModel";

export class SupplierService{
  async create(Supplier:Supplier):Promise<SupplierResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.post<SupplierResponse>('/config/supplier/create',Supplier)
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
  async update(id:number,Supplier:Supplier):Promise<SupplierResponse|ErrorResponse>{
    try {
      const data:any = { ...Supplier };
      delete data.id_proveedor; 
      const response = await apiRequestHandler.post<SupplierResponse>('/config/supplier/update/'+id,data)
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
  async delete(id:number):Promise<SupplierResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.delete<SupplierResponse>('/config/supplier/delete/'+id)
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
  async activate(id:number):Promise<SupplierResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.put<SupplierResponse>('/config/supplier/activate/'+id)
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
  async findActive():Promise<SupplierResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<SupplierResponse>('/config/supplier/findActive')
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
  async findAll():Promise<SupplierResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<SupplierResponse>('/config/supplier/findAll')
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