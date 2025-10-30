
import { defaultErrerResponse, ErrorResponse } from "../../../../../domain/models/ErrorResponse";
import { ReportCierreFilter, ReportMedicalFilter, ReportResponse } from "../../../../../domain/models/ReportModel";
import { apiRequestHandler } from "../../api/apiRequestHandler";

export class ReportService{
  async reportCierreTurno(reportCierreFilter:ReportCierreFilter): Promise<ReportResponse|ErrorResponse> {
    try {
      const response = await apiRequestHandler.post<ReportResponse>('/report/reportCierreTurno/',reportCierreFilter);
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
  async reportMedical(reportMedicalFilter:ReportMedicalFilter): Promise<ReportResponse|ErrorResponse> {
    try {
      const response = await apiRequestHandler.get<ReportResponse>('/report/medical',{params:reportMedicalFilter});
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
  async reportContratoDeudas(ReportMedicalFilter:ReportMedicalFilter): Promise<ReportResponse|ErrorResponse> {
    try {
      const response = await apiRequestHandler.post<ReportResponse>('/report/reportContratoDeudas',ReportMedicalFilter);
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