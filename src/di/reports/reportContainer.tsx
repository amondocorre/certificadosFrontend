import { asClass, createContainer } from "awilix";
import { ReportService } from "../../data/sources/remote/services/reports/ReportService";
import { ReportRepositoryImpl } from "../../data/repository/reports/ReportRepositoryImpl";
import { ReportsUseCases } from "../../domain/useCases/reports/ReportsUseCases";
import { ReportViewModel } from "../../presentation/viewModel/reports/ReportViewModel";
import { ReportCierreTurnoUseCase } from "../../domain/useCases/reports/ReportCierreTurnoUseCase";
import { ReportContratosUseCase } from "../../domain/useCases/reports/ReportContratosUseCase";
import { ReportContratoDeudasUseCase } from "../../domain/useCases/reports/ReportContratoDeudasUseCase";

const reportContainer = createContainer();
reportContainer.register({
  // SERVICES
  reportService:asClass(ReportService).singleton(),
  //REPOSITORY
  reportRepository:asClass(ReportRepositoryImpl).singleton(),
  //USE CASE
  reportsUseCases:asClass(ReportsUseCases).singleton(),
  reportCierreTurno:asClass(ReportCierreTurnoUseCase).singleton(),
  reportContratos:asClass(ReportContratosUseCase).singleton(),
  reportContratoDeudas:asClass(ReportContratoDeudasUseCase).singleton(),
  // VIEW NOMDEL
  reportViewModel:asClass(ReportViewModel).singleton(),
  
})
export {reportContainer};