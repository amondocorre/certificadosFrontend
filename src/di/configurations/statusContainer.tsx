import { asClass, createContainer } from "awilix";
import { StatusService } from "../../data/sources/remote/services/configurations/StatusService";
import { StatusRepositoryImpl } from "../../data/repository/configurations/StatusRepositoryImpl";
import { StatusUseCases } from "../../domain/useCases/configurations/status/StatusUseCases";
import { FindActiveUseCase } from "../../domain/useCases/configurations/status/FindActiveUseCase";
import { FindAllUseCase } from "../../domain/useCases/configurations/status/FindAllUseCase";
import { CreateUseCase } from "../../domain/useCases/configurations/status/CreateUseCase";
import { UpdateUseCase } from "../../domain/useCases/configurations/status/UpdateUseCase";
import { DeleteUseCase } from "../../domain/useCases/configurations/status/DeleteUseCase";
import { ActivateUseCase } from "../../domain/useCases/configurations/status/ActivateUseCase";
import { StatusViewModel } from "../../presentation/viewModel/configurations/StatusViewModel";

const statusContainer = createContainer();
statusContainer.register({
  // SERVICES
  statusService:asClass(StatusService).singleton(),
  //REPOSITORY
  statusRepository:asClass(StatusRepositoryImpl).singleton(),
  //USE CASE
  statusUseCases:asClass(StatusUseCases).singleton(),
  findActive:asClass(FindActiveUseCase).singleton(),
  findAll:asClass(FindAllUseCase).singleton(),
  create:asClass(CreateUseCase).singleton(),
  update:asClass(UpdateUseCase).singleton(),
  deleteUseCase:asClass(DeleteUseCase).singleton(),
  activate:asClass(ActivateUseCase).singleton(),
  // VIEW NOMDEL
  StatusViewModel:asClass(StatusViewModel).singleton(),
  
})
export {statusContainer};