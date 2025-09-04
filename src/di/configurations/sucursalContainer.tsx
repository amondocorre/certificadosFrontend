import { asClass, createContainer } from "awilix";
import { SucursalService } from "../../data/sources/remote/services/configurations/SucursalService";
import { SucursalRepositoryImpl } from "../../data/repository/configurations/SucursalRepositoryImpl";
import { SucursalUseCases } from "../../domain/useCases/configurations/sucursal/SucursalUseCases";
import { FindActiveUseCase } from "../../domain/useCases/configurations/sucursal/FindActiveUseCase";
import { FindAllUseCase } from "../../domain/useCases/configurations/sucursal/FindAllUseCase";
import { CreateUseCase } from "../../domain/useCases/configurations/sucursal/CreateUseCase";
import { UpdateUseCase } from "../../domain/useCases/configurations/sucursal/UpdateUseCase";
import { DeleteUseCase } from "../../domain/useCases/configurations/sucursal/DeleteUseCase";
import { ActivateUseCase } from "../../domain/useCases/configurations/sucursal/ActivateUseCase";
import { SucursalViewModel } from "../../presentation/viewModel/configurations/SucursalViewModel";

const sucursalContainer = createContainer();
sucursalContainer.register({
  // SucursalS
  sucursalService:asClass(SucursalService).singleton(),
  //REPOSITORY
  sucursalRepository:asClass(SucursalRepositoryImpl).singleton(),
  //USE CASE
  sucursalUseCases:asClass(SucursalUseCases).singleton(),
  findActive:asClass(FindActiveUseCase).singleton(),
  findAll:asClass(FindAllUseCase).singleton(),
  create:asClass(CreateUseCase).singleton(),
  update:asClass(UpdateUseCase).singleton(),
  deleteUseCase:asClass(DeleteUseCase).singleton(),
  activate:asClass(ActivateUseCase).singleton(),
  // VIEW NOMDEL
  sucursalViewModel:asClass(SucursalViewModel).singleton(),
  
})
export {sucursalContainer};