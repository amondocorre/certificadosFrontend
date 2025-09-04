
import { defaultErrerResponse, ErrorResponse } from "../../../../../domain/models/ErrorResponse";
import { ReportCierreFilter, ReportContratoFilter, ReportResponse } from "../../../../../domain/models/ReportModel";
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
  async reportContratos(reportContratoFilter:ReportContratoFilter): Promise<ReportResponse|ErrorResponse> {
    try {
      const response = await apiRequestHandler.post<ReportResponse>('/report/reportContratos',reportContratoFilter);
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
  async reportContratoDeudas(reportContratoFilter:ReportContratoFilter): Promise<ReportResponse|ErrorResponse> {
    try {
      const response = await apiRequestHandler.post<ReportResponse>('/report/reportContratoDeudas',reportContratoFilter);
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