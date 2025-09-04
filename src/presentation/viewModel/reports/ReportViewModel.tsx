
import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { ReportCierreFilter, ReportContratoFilter, ReportResponse } from "../../../domain/models/ReportModel";
import { ReportsUseCases } from "../../../domain/useCases/reports/ReportsUseCases";
export class ReportViewModel {
  private reportsUseCases: ReportsUseCases;
  constructor({reportsUseCases}:{reportsUseCases:ReportsUseCases}){
    this.reportsUseCases = reportsUseCases
  }
  async reportCierreTurno(reportCierreFilter:ReportCierreFilter):Promise<ReportResponse|ErrorResponse>{
    return await this.reportsUseCases.reportCierreTurno.execute(reportCierreFilter)
  }
  async reportContratos(reportContratoFilter:ReportContratoFilter):Promise<ReportResponse|ErrorResponse>{
    return await this.reportsUseCases.reportContratos.execute(reportContratoFilter)
  }
  async reportContratoDeudas(reportContratoFilter:ReportContratoFilter):Promise<ReportResponse|ErrorResponse>{
    return await this.reportsUseCases.reportContratoDeudas.execute(reportContratoFilter)
  }
}