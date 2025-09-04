
import { apiRequestHandler } from "../api/apiRequestHandler";
import { defaultErrerResponse, ErrorResponse } from "../../../../domain/models/ErrorResponse";
import { Client, ClientResponse } from "../../../../domain/models/ClientModel";

export class ClientService{
  async create(client:Client):Promise<ClientResponse|ErrorResponse>{
    try {
      const formData = new FormData();
      for (const key in client) {
        if (client.hasOwnProperty(key)) {
          const value = (client as any)[key];
          if (key === 'file_ciB' || key === 'file_ciA') {
            if (value instanceof File || value instanceof Blob) {
              formData.append(key, value);
            } else {
            }
          } else if (key === 'empresas' ) {
            formData.append(key, JSON.stringify(value));
          } else if (key !== 'id_cliente' && key !== 'foto_ciA' && value && key !== 'foto_ciB' && key !=='status_color' && key !== 'status') {
            formData.append(key, value);
          }
        }
      }
      const response = await apiRequestHandler.post<ClientResponse>('/client/create',formData, {
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
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
  async update(client:Client):Promise<ClientResponse|ErrorResponse>{
    try {
      const id= Number(client.id_cliente)
      const formData = new FormData();
      for (const key in client) {
        if (client.hasOwnProperty(key)) {
          const value = (client as any)[key];
          if (key === 'file_ciB' || key === 'file_ciA') {
            if (value instanceof File || value instanceof Blob) {
              formData.append(key, value);
            } else {
            }
          } else if (key === 'empresas' ) {
            formData.append(key, JSON.stringify(value));
          } else if (key !== 'id_cliente' && key !== 'foto_ciA' && value && key !== 'foto_ciB' && key !=='status_color' && key !== 'status') {
            formData.append(key, value);
          }
        }
      }
      const response = await apiRequestHandler.post<ClientResponse>('/client/update/'+id,formData, {
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
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
  async delete(id:number):Promise<ClientResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.delete<ClientResponse>('/client/delete/'+id)
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
  async activate(id:number):Promise<ClientResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.put<ClientResponse>('/client/activate/'+id)
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
  async findActive():Promise<ClientResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<ClientResponse>('/client/findActive')
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
  async findAll():Promise<ClientResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<ClientResponse>('/client/findAll')
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