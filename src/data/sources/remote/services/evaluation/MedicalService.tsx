import { defaultErrerResponse, ErrorResponse } from "../../../../../domain/models/ErrorResponse";
import { EvaluationMedical, MedicalResponse } from "../../../../../domain/models/EvaluationMedical";
import { apiRequestHandler } from "../../api/apiRequestHandler";


export class MedicalService{
  async create(data:EvaluationMedical):Promise<MedicalResponse|ErrorResponse>{
    try {
      const formData = new FormData();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const value = (data as any)[key];
          if (key === 'file') {
            if (value instanceof File || value instanceof Blob) {
              formData.append(key, value);
            }
          }else if (key !== 'foto' && key !== 'id_evaluacion_medica') {
            formData.append(key, value);
          }
        }
      }
      const response = await apiRequestHandler.post<MedicalResponse>('/evaluation/medical/create',formData, {headers: {'Content-Type': 'multipart/form-data', },});
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
  async update(data:EvaluationMedical):Promise<MedicalResponse|ErrorResponse>{
    try {
      const id = data.id_evaluacion_medica;
      const formData = new FormData();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const value = (data as any)[key];
          if (key === 'file') {
            if (value instanceof File || value instanceof Blob) {
              formData.append(key, value);
            }
          }else if (key !== 'foto' && key !== 'id_evaluacion_medica') {
            formData.append(key, value);
          }
        }
      }
      const response = await apiRequestHandler.post<MedicalResponse>('/evaluation/medical/update/'+id,formData, {headers: {'Content-Type': 'multipart/form-data', },});
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
  async activate(id:number):Promise<MedicalResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.put<MedicalResponse>('/evaluation/medical/activate/'+id);
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
  async search(q:string):Promise<MedicalResponse|ErrorResponse>{
      try {
        const response = await apiRequestHandler.get<MedicalResponse>('/evaluation/medical/search',{params: {q: q}})
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
  async findIdentity(id:number):Promise<MedicalResponse|ErrorResponse>{
      try {
        const response = await apiRequestHandler.get<MedicalResponse>('/evaluation/medical/findIdentity/'+id)
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