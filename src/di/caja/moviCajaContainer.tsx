import { asClass, createContainer } from "awilix";
import { MoviCajaService } from "../../data/sources/remote/services/caja/MoviCajaService";
import { MoviCajaRepositoryImpl } from "../../data/repository/caja/MoviCajaRepositoryImpl";
import { MoviCajaUseCases } from "../../domain/useCases/caja/moviCaja/MoviCajaUseCases";
import { FindFilterUseCase } from "../../domain/useCases/caja/moviCaja/FindFilterUseCase";
import { FindAllUseCase } from "../../domain/useCases/caja/moviCaja/FindAllUseCase";
import { CreateUseCase } from "../../domain/useCases/caja/moviCaja/CreateUseCase";
import { UpdateUseCase } from "../../domain/useCases/caja/moviCaja/UpdateUseCase";
import { DeleteUseCase } from "../../domain/useCases/caja/moviCaja/DeleteUseCase";
import { ActivateUseCase } from "../../domain/useCases/caja/moviCaja/ActivateUseCase";
import { MoviCajaViewModel } from "../../presentation/viewModel/caja/MoviCajaViewModel";

const moviCajaContainer = createContainer();
moviCajaContainer.register({
  // SERVICES
  moviCajaService:asClass(MoviCajaService).singleton(),
  //REPOSITORY
  moviCajaRepository:asClass(MoviCajaRepositoryImpl).singleton(),
  //USE CASE
  moviCajaUseCases:asClass(MoviCajaUseCases).singleton(),
  findFilter:asClass(FindFilterUseCase).singleton(),
  findAll:asClass(FindAllUseCase).singleton(),
  create:asClass(CreateUseCase).singleton(),
  update:asClass(UpdateUseCase).singleton(),
  deleteUseCase:asClass(DeleteUseCase).singleton(),
  activate:asClass(ActivateUseCase).singleton(),
  // VIEW NOMDEL
  moviCajaViewModel:asClass(MoviCajaViewModel).singleton(),
  
})
export {moviCajaContainer};