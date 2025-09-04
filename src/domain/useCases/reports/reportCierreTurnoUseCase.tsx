
import { ErrorResponse } from "../../models/ErrorResponse";
import { ReportCierreFilter, ReportResponse } from "../../models/ReportModel";
import { ReportRepository } from "../../repository/reports/ReportRepository";

export class ReportCierreTurnoUseCase {
  private reportRepository: ReportRepository;
  constructor({reportRepository}:{reportRepository:ReportRepository}){
    this.reportRepository = reportRepository; 
  }
  async execute(reportCierreFilter:ReportCierreFilter):Promise<ReportResponse|ErrorResponse>{
    return await this.reportRepository.reportCierreTurno(reportCierreFilter);
  }
}