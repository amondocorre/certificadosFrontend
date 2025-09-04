import { asClass, createContainer } from "awilix";
import { MenuAccesService } from "../../data/sources/remote/services/configurations/MenuAccesService";
import { MenuAccesRepositoryImpl } from "../../data/repository/configurations/MenuAccesRepositoryImpl";
import { MenuAccesUseCases } from "../../domain/useCases/configurations/menuAcces/MenuAccesUseCases";
import { FindAllUseCase } from "../../domain/useCases/configurations/menuAcces/FindAllUseCase";
import { CreateUseCase } from "../../domain/useCases/configurations/menuAcces/CreateUseCase";
import { UpdateUseCase } from "../../domain/useCases/configurations/menuAcces/UpdateUseCase";
import { MenuAccesViewModel } from "../../presentation/viewModel/configurations/MenuAccesViewModel";
import { FindActiveUseCase } from "../../domain/useCases/configurations/menuAcces/FindActiveUseCase";
import { DeleteUseCase } from "../../domain/useCases/configurations/menuAcces/DeleteUseCase";
import { ActivateUseCase } from "../../domain/useCases/configurations/menuAcces/ActivateUseCase";

const menuAccesContainer = createContainer();
menuAccesContainer.register({
  // SERVICES
  menuAccesService:asClass(MenuAccesService).singleton(),
  //REPOSITORY
  menuAccesRepository:asClass(MenuAccesRepositoryImpl).singleton(),
  //USE CASE
  menuAccesUseCases:asClass(MenuAccesUseCases).singleton(),
  findAll:asClass(FindAllUseCase).singleton(),
  findActive:asClass(FindActiveUseCase).singleton(),
  create:asClass(CreateUseCase).singleton(),
  update:asClass(UpdateUseCase).singleton(),
  deleteUseCase:asClass(DeleteUseCase).singleton(),
  activate:asClass(ActivateUseCase).singleton(),
  // VIEW NOMDEL
  menuAccesViewModel:asClass(MenuAccesViewModel).singleton(),
  
})
export {menuAccesContainer};