import { ReportCierreTurnoUseCase } from "./ReportCierreTurnoUseCase";
import { ReportContratoDeudasUseCase } from "./ReportContratoDeudasUseCase";
import { ReportContratosUseCase } from "./ReportContratosUseCase";

export class ReportsUseCases{
reportCierreTurno :ReportCierreTurnoUseCase;
reportContratos:ReportContratosUseCase;
reportContratoDeudas:ReportContratoDeudasUseCase;
  constructor({
    reportCierreTurno,
    reportContratos,
    reportContratoDeudas,
  }:{
    reportCierreTurno:ReportCierreTurnoUseCase,
    reportContratos:ReportContratosUseCase,
    reportContratoDeudas:ReportContratoDeudasUseCase,
  }){

  this.reportCierreTurno = reportCierreTurno;
  this.reportContratos = reportContratos;
  this.reportContratoDeudas = reportContratoDeudas;
  }
}