import { defaultErrerResponse, ErrorResponse } from "../../../../../domain/models/ErrorResponse";
import { InfEvaluationPsychological, InfPsychologicalResponse } from "../../../../../domain/models/InfEvaluationPsychological";
import { apiRequestHandler } from "../../api/apiRequestHandler";


export class InfPsychologicalService{
  async create(data:InfEvaluationPsychological):Promise<InfPsychologicalResponse|ErrorResponse>{
    try {
      const formData = new FormData();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const value = (data as any)[key];
          if (key === 'file') {
            if (value instanceof File || value instanceof Blob) {
              formData.append(key, value);
            }
          }else if (key !== 'foto' && key !== 'id_inf_evaluacion_psicologica') {
            formData.append(key, value);
          }
        }
      }
      const response = await apiRequestHandler.post<InfPsychologicalResponse>('/evaluation/InfPsychological/create',formData, {headers: {'Content-Type': 'multipart/form-data', },});
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
  async update(data:InfEvaluationPsychological):Promise<InfPsychologicalResponse|ErrorResponse>{
    try {
      const id = data.id_inf_evaluacion_psicologica;
      const formData = new FormData();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const value = (data as any)[key];
          if (key === 'file') {
            if (value instanceof File || value instanceof Blob) {
              formData.append(key, value);
            }
          }else if (key !== 'foto' && key !== 'id_inf_evaluacion_psicologica') {
            formData.append(key, value);
          }
        }
      }
      const response = await apiRequestHandler.post<InfPsychologicalResponse>('/evaluation/InfPsychological/update/'+id,formData, {headers: {'Content-Type': 'multipart/form-data', },});
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
  async activate(id:number):Promise<InfPsychologicalResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.put<InfPsychologicalResponse>('/evaluation/InfPsychological/activate/'+id);
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
  async search(q:string):Promise<InfPsychologicalResponse|ErrorResponse>{
      try {
        const response = await apiRequestHandler.get<InfPsychologicalResponse>('/evaluation/InfPsychological/search',{params: {q: q}})
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
  async findIdentity(id:number):Promise<InfPsychologicalResponse|ErrorResponse>{
      try {
        const response = await apiRequestHandler.get<InfPsychologicalResponse>('/evaluation/InfPsychological/findIdentity/'+id)
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