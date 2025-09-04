
import { Combo, ComboResponse } from "../../../../../domain/models/ComboModel";
import { defaultErrerResponse, ErrorResponse } from "../../../../../domain/models/ErrorResponse";
import { apiRequestHandler } from "../../api/apiRequestHandler";

export class ComboService{
  async create(combo:Combo):Promise<ComboResponse|ErrorResponse>{
    try {
      const formData = new FormData();
      for (const key in combo) {
        if (combo.hasOwnProperty(key)) {
          const value = (combo as any)[key];
          if(value){
            if (key === 'foto') {
              if (value instanceof File || value instanceof Blob) {
                formData.append(key, value);
              }
            } else if (key === 'productos' ) {
              formData.append(key, JSON.stringify(value));
            } else  if(key !=='id_producto') {
              formData.append(key, value);
            }
          }
        }
      }
      const response = await apiRequestHandler.post<ComboResponse>('/config/combo/create',formData, {
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
  async update(id:number,combo:Combo):Promise<ComboResponse|ErrorResponse>{
    try {
      const formData = new FormData();
        for (const key in combo) {
          if (combo.hasOwnProperty(key)) {
            const value = (combo as any)[key];
            if(value){
              if (key === 'foto') {
                if (value instanceof File || value instanceof Blob) {
                  formData.append(key, value);
                }
              } else if (key === 'productos' ) {
                formData.append(key, JSON.stringify(value));
              }  else  if(key !=='id_producto') {
                formData.append(key, value);
              }
            }
          }
        }
      const response = await apiRequestHandler.post<ComboResponse>('/config/combo/update/'+id,formData, {
          headers: {'Content-Type': 'multipart/form-data', },
        });
      //const response = await apiRequestHandler.post<ComboResponse>('/config/combo/update/'+id,data)
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
  async delete(id:number):Promise<ComboResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.delete<ComboResponse>('/config/combo/delete/'+id)
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
  async activate(id:number):Promise<ComboResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.put<ComboResponse>('/config/combo/activate/'+id)
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
  async findAll():Promise<ComboResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<ComboResponse>('/config/combo/findAll')
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
  async findActive():Promise<ComboResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<ComboResponse>('/config/combo/findActive')
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