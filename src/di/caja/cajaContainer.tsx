import { asClass, createContainer } from "awilix";
import { CajaService } from "../../data/sources/remote/services/caja/CajaService";
import { CajaRepositoryImpl } from "../../data/repository/caja/CajaRepositoryImpl";
import { CajaUseCases } from "../../domain/useCases/caja/caja/CajaUseCases";
import { FindActiveUseCase } from "../../domain/useCases/caja/caja/FindActiveUseCase";
import { FindAllUseCase } from "../../domain/useCases/caja/caja/FindAllUseCase";
import { CreateUseCase } from "../../domain/useCases/caja/caja/CreateUseCase";
import { UpdateUseCase } from "../../domain/useCases/caja/caja/UpdateUseCase";
import { DeleteUseCase } from "../../domain/useCases/caja/caja/DeleteUseCase";
import { ActivateUseCase } from "../../domain/useCases/caja/caja/ActivateUseCase";
import { CajaViewModel } from "../../presentation/viewModel/caja/CajaViewModel";

const cajaContainer = createContainer();
cajaContainer.register({
  // SERVICES
  cajaService:asClass(CajaService).singleton(),
  //REPOSITORY
  cajaRepository:asClass(CajaRepositoryImpl).singleton(),
  //USE CASE
  cajaUseCases:asClass(CajaUseCases).singleton(),
  findActive:asClass(FindActiveUseCase).singleton(),
  findAll:asClass(FindAllUseCase).singleton(),
  create:asClass(CreateUseCase).singleton(),
  update:asClass(UpdateUseCase).singleton(),
  deleteUseCase:asClass(DeleteUseCase).singleton(),
  activate:asClass(ActivateUseCase).singleton(),
  // VIEW NOMDEL
  cajaViewModel:asClass(CajaViewModel).singleton(),
  
})
export {cajaContainer};