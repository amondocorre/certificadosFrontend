import { ReportCierreTurnoUseCase } from "./ReportCierreTurnoUseCase";
import { ReportMedicalUseCase } from "./reportMedicalUseCase";
export class ReportsUseCases{
reportCierreTurno :ReportCierreTurnoUseCase;
reportMedical:ReportMedicalUseCase;
  constructor({
    reportCierreTurno,
    reportMedical,
  }:{
    reportCierreTurno:ReportCierreTurnoUseCase,
    reportMedical:ReportMedicalUseCase,
  }){

  this.reportCierreTurno = reportCierreTurno;
  this.reportMedical = reportMedical;
  }
}