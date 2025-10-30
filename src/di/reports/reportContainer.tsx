import { asClass, createContainer } from "awilix";
import { ReportService } from "../../data/sources/remote/services/reports/ReportService";
import { ReportRepositoryImpl } from "../../data/repository/reports/ReportRepositoryImpl";
import { ReportsUseCases } from "../../domain/useCases/reports/ReportsUseCases";
import { ReportViewModel } from "../../presentation/viewModel/reports/ReportViewModel";
import { ReportCierreTurnoUseCase } from "../../domain/useCases/reports/ReportCierreTurnoUseCase";
import { ReportMedicalUseCase } from "../../domain/useCases/reports/ReportMedicalUseCase";

const reportContainer = createContainer();
reportContainer.register({
  // SERVICES
  reportService:asClass(ReportService).singleton(),
  //REPOSITORY
  reportRepository:asClass(ReportRepositoryImpl).singleton(),
  //USE CASE
  reportsUseCases:asClass(ReportsUseCases).singleton(),
  reportCierreTurno:asClass(ReportCierreTurnoUseCase).singleton(),
  reportMedical:asClass(ReportMedicalUseCase).singleton(),
  // VIEW NOMDEL
  reportViewModel:asClass(ReportViewModel).singleton(),
  
})
export {reportContainer};