
import { ErrorResponse } from "../../models/ErrorResponse";
import { ReportCierreFilter, ReportResponse } from "../../models/ReportModel";
import { ReportRepository } from "../../repository/reports/ReportRepository";

export class ReportContratoDeudasUseCase {
  private reportRepository: ReportRepository;
  constructor({reportRepository}:{reportRepository:ReportRepository}){
    this.reportRepository = reportRepository; 
  }
  async execute(reportContratoFilter:ReportCierreFilter):Promise<ReportResponse|ErrorResponse>{
    return await this.reportRepository.reportContratoDeudas(reportContratoFilter);
  }
}