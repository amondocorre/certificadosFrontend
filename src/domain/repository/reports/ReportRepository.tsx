import { ErrorResponse } from "../../models/ErrorResponse"
import { ReportCierreFilter, ReportMedicalFilter, ReportResponse } from "../../models/ReportModel"

export interface ReportRepository{
  reportCierreTurno(reportCierreFilter:ReportCierreFilter):Promise<ReportResponse|ErrorResponse>
  reportMedical(reportMedicalFilter:ReportMedicalFilter):Promise<ReportResponse|ErrorResponse>
}