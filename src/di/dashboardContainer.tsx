import { asClass, createContainer } from "awilix";
import { DashboardService } from "../data/sources/remote/services/DashboardService";
import { DashboardRepositoryImpl } from "../data/repository/DashboardRepositoryImpl";
import { DashboardUseCases } from "../domain/useCases/dashboard/DashboardUseCases";
import { DashboardViewModel } from "../presentation/viewModel/DashboardViewModel";
import { GetIngresosDiariosUseCase } from "../domain/useCases/dashboard/GetIngresosDiariosUseCase";
import { ListEvaPsychologicalUseCase } from "../domain/useCases/dashboard/ListEvaPsychologicalUseCase";
import { ListEvaMedicalUseCase } from "../domain/useCases/dashboard/ListEvaMedicalUseCase";
import { GetTotalEvaluationsUseCase } from "../domain/useCases/dashboard/GetTotalEvaluationsUseCase";
const dashboardContainer = createContainer();
dashboardContainer.register({
  // SERVICES
  dashboardService:asClass(DashboardService).singleton(),
  //REPOSITORY
  dashboardRepository:asClass(DashboardRepositoryImpl).singleton(),
  //USE CASE
  dashboardUseCases:asClass(DashboardUseCases).singleton(),
  getIngresosDiarios:asClass(GetIngresosDiariosUseCase).singleton(),
  listEvaMedical:asClass(ListEvaMedicalUseCase).singleton(),
  listEvaPsychological:asClass(ListEvaPsychologicalUseCase).singleton(),
  getTotalEvaluations:asClass(GetTotalEvaluationsUseCase).singleton(),
  // VIEW NOMDEL
  dashboardViewModel:asClass(DashboardViewModel).singleton(),
  
})
export {dashboardContainer};