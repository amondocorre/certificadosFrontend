
import { apiRequestHandler } from "../api/apiRequestHandler";
import { ButtonsResponse } from "../../../../domain/models/ButtonModel";
import { defaultErrerResponse, ErrorResponse } from "../../../../domain/models/ErrorResponse";
import { DataChangePassword, User, userResponse } from "../../../../domain/models/User";

export class UserService{
  async getButtunsAccess(idAcces:number):Promise<ButtonsResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<ButtonsResponse>('/user/getButtonsAccesUser/'+idAcces)
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
  async getAllUsers():Promise<userResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<userResponse>('/user/getAllUsers')
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
  
  async findActive():Promise<userResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<userResponse>('/user/findActive')
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
  async create(user: User): Promise<userResponse | ErrorResponse> {
    try {
      const formData = new FormData();
      for (const key in user) {
        if (user.hasOwnProperty(key)) {
          const value = (user as any)[key];
          if (key === 'file') {
            if (value instanceof File || value instanceof Blob) {
              formData.append('file', value);
            } else {
            }
          } else if (key !== 'id_usuario' && key !== 'foto' && value && key !== 'perfil') {
            formData.append(key, value);
          }
        }
      }
  
      const response = await apiRequestHandler.post<userResponse>('/user/create_user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const errorData: ErrorResponse = error.response.data;
        if (Array.isArray(errorData.message)) {
          errorData.message = errorData.message.join(',');
        }
        return errorData;
      }
      return defaultErrerResponse;
    }
  }
  async update(user:User,id_usuario:number):Promise<userResponse|ErrorResponse>{
    try {
      const formData = new FormData();
      for (const key in user) {
        const value = (user as any)[key];
        if (key === 'file') {
          if (value instanceof File || value instanceof Blob) {
            formData.append('file', value);
          }
        } else if (key !== 'id_usuario' && key !== 'foto' && value && key !== 'perfil' ) {
          formData.append(key, value);
        }
      }
  
      const response = await apiRequestHandler.post<userResponse>('/user/update_user/'+id_usuario, formData, {
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
  async delete(id_usuario:number):Promise<userResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.post<userResponse>('/user/delete/'+id_usuario)
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
  async activate(id_usuario:number):Promise<userResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.put<userResponse>('/user/activate/'+id_usuario)
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
  async resetPassword(id_usuario:number):Promise<userResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.put<userResponse>('/user/resetPassword/'+id_usuario)
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
  async changePassword(data:DataChangePassword):Promise<userResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.post<userResponse>('/user/changePassword',data)
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