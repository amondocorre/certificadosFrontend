
import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { ReportCierreFilter, ReportMedicalFilter, ReportResponse } from "../../../domain/models/ReportModel";
import { ReportsUseCases } from "../../../domain/useCases/reports/ReportsUseCases";
export class ReportViewModel {
  private reportsUseCases: ReportsUseCases;
  constructor({reportsUseCases}:{reportsUseCases:ReportsUseCases}){
    this.reportsUseCases = reportsUseCases
  }
  async reportCierreTurno(reportCierreFilter:ReportCierreFilter):Promise<ReportResponse|ErrorResponse>{
    return await this.reportsUseCases.reportCierreTurno.execute(reportCierreFilter)
  }
  async reportMedical(reportMedicalFilter:ReportMedicalFilter):Promise<ReportResponse|ErrorResponse>{
    return await this.reportsUseCases.reportMedical.execute(reportMedicalFilter)
  }
}