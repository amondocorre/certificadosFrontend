import { defaultErrerResponse, ErrorResponse } from "../../../../../domain/models/ErrorResponse";
import { EvaluationPsychological, PsychologicalResponse } from "../../../../../domain/models/EvaluationPsychological";
import { apiRequestHandler } from "../../api/apiRequestHandler";


export class PsychologicalService{
  async create(data:EvaluationPsychological):Promise<PsychologicalResponse|ErrorResponse>{
    try {
      const formData = new FormData();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const value = (data as any)[key];
          if (key === 'file') {
            if (value instanceof File || value instanceof Blob) {
              formData.append(key, value);
            }
          }else if (key !== 'foto' && key !== 'id_evaluacion_psicologica') {
            formData.append(key, value);
          }
        }
      }
      const response = await apiRequestHandler.post<PsychologicalResponse>('/evaluation/psychological/create',formData, {headers: {'Content-Type': 'multipart/form-data', },});
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
  async update(data:EvaluationPsychological):Promise<PsychologicalResponse|ErrorResponse>{
    try {
      const id = data.id_evaluacion_psicologica;
      const formData = new FormData();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const value = (data as any)[key];
          if (key === 'file') {
            if (value instanceof File || value instanceof Blob) {
              formData.append(key, value);
            }
          }else if (key !== 'foto' && key !== 'id_evaluacion_psicologica') {
            formData.append(key, value);
          }
        }
      }
      const response = await apiRequestHandler.post<PsychologicalResponse>('/evaluation/psychological/update/'+id,formData, {headers: {'Content-Type': 'multipart/form-data', },});
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
  async search(q:string):Promise<PsychologicalResponse|ErrorResponse>{
      try {
        const response = await apiRequestHandler.get<PsychologicalResponse>('/evaluation/psychological/search',{params: {q: q}})
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
  async findIdentity(id:number):Promise<PsychologicalResponse|ErrorResponse>{
      try {
        const response = await apiRequestHandler.get<PsychologicalResponse>('/evaluation/psychological/findIdentity/'+id)
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