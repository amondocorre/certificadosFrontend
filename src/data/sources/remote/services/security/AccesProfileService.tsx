
import { AccesUserResponse } from "../../../../../domain/models/AccesModel";
import { defaultErrerResponse, ErrorResponse } from "../../../../../domain/models/ErrorResponse";
import { apiRequestHandler } from "../../api/apiRequestHandler";

export class AccesProfileService{
  async findByProfile(idProfile:string):Promise<AccesUserResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<AccesUserResponse>('/security/acces-perfil/findByPerfil/'+idProfile)
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
  async update(idAcces:number,idProfile:string,estado:number,buttons:string[]):Promise<AccesUserResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.post<AccesUserResponse>('/security/acces-perfil/update/'+idAcces+'/'+idProfile,{'estado':estado,'buttons':buttons})
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