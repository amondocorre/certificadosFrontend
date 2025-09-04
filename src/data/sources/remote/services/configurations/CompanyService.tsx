
import { apiRequestHandler } from "../../api/apiRequestHandler";
import { defaultErrerResponse, ErrorResponse } from "../../../../../domain/models/ErrorResponse";
import { Company, CompanyResponse } from "../../../../../domain/models/CompanyModel";

export class CompanyService{
  async create(company:Company):Promise<CompanyResponse|ErrorResponse>{
    try {
      const formData = new FormData();
        for (const key in company) {
          if (company.hasOwnProperty(key)) {
            const value = (company as any)[key];
            if (key === 'fileE' || key === 'fileI' ) {
              if (value instanceof File || value instanceof Blob) {
                formData.append(key, value);
              } else {
              }
            } else if (key !== 'id_empresa_sis' && key !== 'created_at' && value && key !== 'updated_at' && key !== 'logo_empresa' && key !== 'logo_impresion') {
              formData.append(key, value);
            }
          }
        }
        const response = await apiRequestHandler.post<CompanyResponse>('/config/company/create', formData, {
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
  async update(id:number,company:Company):Promise<CompanyResponse|ErrorResponse>{
    try {
      const formData = new FormData();
      for (const key in company) {
        if (company.hasOwnProperty(key)) {
          const value = (company as any)[key];
          if (key === 'fileE' || key === 'fileI' ) {
            if (value instanceof File || value instanceof Blob) {
              formData.append(key, value);
            } else {
            }
          } else if (key !== 'id_empresa_sis' && key !== 'created_at' && value && key !== 'updated_at' && key !== 'logo_empresa' && key !== 'logo_impresion') {
            formData.append(key, value);
          }
        }
      }
      const response = await apiRequestHandler.post<CompanyResponse>('/config/company/update/'+id,formData, {
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
  async delete(id:number):Promise<CompanyResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.delete<CompanyResponse>('/config/company/delete/'+id)
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
  async activate(id:number):Promise<CompanyResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.put<CompanyResponse>('/config/company/activate/'+id)
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
  async findActive():Promise<CompanyResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<CompanyResponse>('/config/company/findActive')
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
  async findAll():Promise<CompanyResponse|ErrorResponse>{
    try {
      const response = await apiRequestHandler.get<CompanyResponse>('/config/company/findAll')
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