
import { apiRequestHandler } from "../../api/apiRequestHandler";
import { defaultErrerResponse, ErrorResponse } from "../../../../../domain/models/ErrorResponse";
import { Product, ProductResponse } from "../../../../../domain/models/ProductModel";

export class ProductService{
  async create(product:Product):Promise<ProductResponse|ErrorResponse>{
    try {
      const formData = new FormData();
      for (const key in product) {
        if (product.hasOwnProperty(key)) {
          const value = (product as any)[key];
          if (key === 'foto') {
            if (value instanceof File || value instanceof Blob) {
              formData.append(key, value);
            }
          } else  if(key !=='id_producto') {
            formData.append(key, value);
          }
        }
      }
      const response = await apiRequestHandler.post<ProductResponse>('/config/product/create',formData, {
          headers: {'Content-Type': 'multipart/form-data', },
        });
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
  async update(id:number,product:Product):Promise<ProductResponse|ErrorResponse>{
    try {
      const formData = new FormData();
      for (const key in product) {
        if (product.hasOwnProperty(key)) {
          const value = (product as any)[key];
          if (key === 'foto') {
            if (value instanceof File || value instanceof Blob) {
              formData.append(key, value);
            }
          } else if(key !=='id_producto'  && key !=='fotografia') {
            formData.append(key, value);
          }
        }
      }
      const response = await apiRequestHandler.post<ProductResponse>('/config/product/update/'+id,formData, {
          headers: {'Content-Type': 'multipart/form-data', },
        });
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
  async delete(id:number):Promise<ProductResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.delete<ProductResponse>('/config/product/delete/'+id)
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
  async activate(id:number):Promise<ProductResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.put<ProductResponse>('/config/product/activate/'+id)
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
  async findActive():Promise<ProductResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<ProductResponse>('/config/product/findActive')
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
  async findAll():Promise<ProductResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<ProductResponse>('/config/product/findAll')
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