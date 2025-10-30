import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { ReportCierreFilter, ReportResponse, ReportMedicalFilter } from "../../../domain/models/ReportModel";
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
  async reportMedical(reportMedicalFilter: ReportMedicalFilter): Promise<ReportResponse | ErrorResponse> {
    return await this.reportService.reportMedical(reportMedicalFilter);
  }
}