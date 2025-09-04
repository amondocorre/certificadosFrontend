
import { apiRequestHandler } from "../../api/apiRequestHandler";
import { defaultErrerResponse, ErrorResponse } from "../../../../../domain/models/ErrorResponse";
import { PaymentMethod, PaymentMethodResponse } from "../../../../../domain/models/PaymentMethodModel";

export class PaymentMethodService{
  async create(paymentMethod:PaymentMethod):Promise<PaymentMethodResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.post<PaymentMethodResponse>('/config/payment-method/create',paymentMethod)
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
  async update(id:number,paymentMethod:PaymentMethod):Promise<PaymentMethodResponse|ErrorResponse>{
    try {
      const data:any = { ...paymentMethod };
      delete data.id_forma_pago; 
      const response = await apiRequestHandler.post<PaymentMethodResponse>('/config/payment-method/update/'+id,data)
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
  async delete(id:number):Promise<PaymentMethodResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.delete<PaymentMethodResponse>('/config/payment-method/delete/'+id)
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
  async activate(id:number):Promise<PaymentMethodResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.put<PaymentMethodResponse>('/config/payment-method/activate/'+id)
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
  async findActive():Promise<PaymentMethodResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<PaymentMethodResponse>('/config/payment-method/findActive')
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
  async findAll():Promise<PaymentMethodResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<PaymentMethodResponse>('/config/payment-method/findAll')
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