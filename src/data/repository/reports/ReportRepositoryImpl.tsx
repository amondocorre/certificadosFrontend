import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { ReportCierreFilter, ReportResponse, ReportContratoFilter } from "../../../domain/models/ReportModel";
import { ReportRepository } from "../../../domain/repository/reports/ReportRepository";
import { ReportService } from "../../sources/remote/services/reports/ReportService";

export class ReportRepositoryImpl implements ReportRepository{
  private reportService:ReportService;
  constructor({reportService,}:{reportService:ReportService}){
      this.reportService = reportService;
  }
  async reportCierreTurno(reportCierreFilter: ReportCierreFilter): Promise<ReportResponse | ErrorResponse> {
    return await this.reportService.reportCierreTurno(reportCierreFilter);
  }
  async reportContratos(reportContratoFilter: ReportContratoFilter): Promise<ReportResponse | ErrorResponse> {
    return await this.reportService.reportContratos(reportContratoFilter);
  }
  async reportContratoDeudas(reportContratoFilter: ReportContratoFilter): Promise<ReportResponse | ErrorResponse> {
    return await this.reportService.reportContratoDeudas(reportContratoFilter);
  }
}