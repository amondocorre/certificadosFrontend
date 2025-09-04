import { ErrorResponse } from "../../models/ErrorResponse"
import { ReportCierreFilter, ReportContratoFilter, ReportResponse } from "../../models/ReportModel"

export interface ReportRepository{
  reportCierreTurno(reportCierreFilter:ReportCierreFilter):Promise<ReportResponse|ErrorResponse>
  reportContratos(reportContratoFilter:ReportContratoFilter):Promise<ReportResponse|ErrorResponse>
  reportContratoDeudas(reportContratoFilter:ReportContratoFilter):Promise<ReportResponse|ErrorResponse>
}