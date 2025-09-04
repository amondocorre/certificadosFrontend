import axios from "axios";
import { MenuItem, MenuResponse } from "../../../../domain/models/AccesModel";
import { AuthResponse } from "../../../../domain/models/AuthResponse";
import { defaultErrerResponse, ErrorResponse } from "../../../../domain/models/ErrorResponse";
import { User } from "../../../../domain/models/User";
import { apiRequestHandler } from "../api/apiRequestHandler";

export class AuthService{
  async login(username:string,password:string):Promise<AuthResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.post<AuthResponse>('/login',{
        username:username,
        password:password})
        return response.data
    } catch (error:any) {
      if(error.response){
        const errorData:ErrorResponse = error.response.data;
        if(Array.isArray(errorData.message)){
          errorData.message = errorData.message.join(',');
        }else console.log('Error ',errorData.message,username,password);
        return errorData;
      }else{
        console.log('Error en la peticion..',error.message);
      }
      return defaultErrerResponse;
    }
  }
  async getMenuUser(token:string):Promise<MenuResponse|ErrorResponse>{
    try {
      const baseURL = await apiRequestHandler.defaults.baseURL //.post<MenuResponse>('/getMenuAccess',{});
        const apiRequest = axios.create({
          baseURL:baseURL,
          headers:{
            'Content-Type':'application/json',
            'Authorization' :`Bearer ${token}`
          }
        }) 
        
      const response = await apiRequest.post<MenuResponse>('/getMenuAccess',{});
      return response.data
    } catch (error:any) {
      if(error.response){
        const errorData:ErrorResponse = error.response.data;
        if(Array.isArray(errorData.message)){
          errorData.message = errorData.message.join(',');
        };
        return errorData;
      }else{
        console.log('Error en la peticion..',error.message);
      }
      return defaultErrerResponse;
    }
  }
  async register(user:User):Promise<AuthResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.post<AuthResponse>('/auth/register',user)
        return response.data
    } catch (error:any) {
      if(error.response){
        const errorData:ErrorResponse = error.response.data;
        if(Array.isArray(errorData.message)){
          console.log('Error multiple',errorData.message.join(','));
        }else console.log('Error ',errorData.message);
        return errorData;
      }
      return defaultErrerResponse;
    }
  }
}