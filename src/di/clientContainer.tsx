import { asClass, createContainer } from "awilix";
import { ClientService } from "../data/sources/remote/services/ClientService";
import { ClientRepositoryImpl } from "../data/repository/ClientRepositoryImpl";
import { ClientUseCases } from "../domain/useCases/client/ClientUseCases";
import { FindAllUseCase } from "../domain/useCases/client/FindAllUseCase";
import { ClientViewModel } from "../presentation/viewModel/ClientViewModel";
import { CreateUseCase } from "../domain/useCases/client/CreateUseCase";
import { DeleteUseCase } from "../domain/useCases/client/DeleteUseCase";
import { UpdateUseCase } from "../domain/useCases/client/UpdateUseCase";
import { ActivateUseCase } from "../domain/useCases/client/ActivateUseCase";
import { FindActiveUseCase } from "../domain/useCases/client/FindActiveUseCase";

const clientContainer = createContainer();
clientContainer.register({
  // SERVICES
  clientService:asClass(ClientService).singleton(),
  //REPOSITORY
  clientRepository:asClass(ClientRepositoryImpl).singleton(),
  //USE CASE
  clientUseCases:asClass(ClientUseCases).singleton(),
  findAll:asClass(FindAllUseCase).singleton(),
  findActive:asClass(FindActiveUseCase).singleton(),
  create:asClass(CreateUseCase).singleton(),
  update:asClass(UpdateUseCase).singleton(),
  deleteClient:asClass(DeleteUseCase).singleton(),
  activate:asClass(ActivateUseCase).singleton(),
  // VIEW NOMDEL
  clientViewModel:asClass(ClientViewModel).singleton(),
  
})
export {clientContainer};