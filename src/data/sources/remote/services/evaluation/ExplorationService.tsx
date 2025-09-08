import { defaultErrerResponse, ErrorResponse } from "../../../../../domain/models/ErrorResponse";
import { Exploration, ExplorationResponse } from "../../../../../domain/models/Evaluation";
import { apiRequestHandler } from "../../api/apiRequestHandler";


export class ExplorationService{
  async create(exploration:Exploration):Promise<ExplorationResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.post<ExplorationResponse>('/exploration/create',exploration)
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
  }async search(exploration:Exploration):Promise<ExplorationResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<ExplorationResponse>('/exploration/search',{params: {q: exploration.descripcion,tipo: exploration.tipo}})
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