import { asClass, createContainer } from "awilix";
import { DashboardService } from "../data/sources/remote/services/DashboardService";
import { DashboardRepositoryImpl } from "../data/repository/DashboardRepositoryImpl";
import { DashboardUseCases } from "../domain/useCases/dashboard/DashboardUseCases";
import { DashboardViewModel } from "../presentation/viewModel/DashboardViewModel";
import { GetTotalesInventarioUseCase } from "../domain/useCases/dashboard/GetTotalesInventarioUseCase";
import { GetIngresosDiariosUseCase } from "../domain/useCases/dashboard/GetIngresosDiariosUseCase";
import { listRentUseCase } from "../domain/useCases/dashboard/listRentUseCase";
import { ListRentEntregaUseCase } from "../domain/useCases/dashboard/listRentEntregaUseCase";
import { GetDetailRentUseCase } from "../domain/useCases/dashboard/GetDetailRentUseCase";
const dashboardContainer = createContainer();
dashboardContainer.register({
  // SERVICES
  dashboardService:asClass(DashboardService).singleton(),
  //REPOSITORY
  dashboardRepository:asClass(DashboardRepositoryImpl).singleton(),
  //USE CASE
  dashboardUseCases:asClass(DashboardUseCases).singleton(),
  getTotalesInventario:asClass(GetTotalesInventarioUseCase).singleton(),
  getIngresosDiarios:asClass(GetIngresosDiariosUseCase).singleton(),
  listRent:asClass(listRentUseCase).singleton(),
  listRentEntrega:asClass(ListRentEntregaUseCase).singleton(),
  getDetailRent:asClass(GetDetailRentUseCase).singleton(),
  // VIEW NOMDEL
  dashboardViewModel:asClass(DashboardViewModel).singleton(),
  
})
export {dashboardContainer};