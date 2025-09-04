import { asClass, createContainer } from "awilix";
import { ButtonService } from "../../data/sources/remote/services/configurations/ButtonService";
import { ButtonRepositoryImpl } from "../../data/repository/configurations/ButtonRepositoryImpl";
import { ButtonUseCases } from "../../domain/useCases/configurations/button/ButtonUseCases";
import { FindAllUseCase } from "../../domain/useCases/configurations/button/FindAllUseCase";
import { FindActiveUseCase } from "../../domain/useCases/configurations/button/FindActiveUseCase";
import { CreateUseCase } from "../../domain/useCases/configurations/button/CreateUseCase";
import { UpdateUseCase } from "../../domain/useCases/configurations/button/UpdateUseCase";
import { DeleteUseCase } from "../../domain/useCases/configurations/button/DeleteUseCase";
import { ButtonViewModel } from "../../presentation/viewModel/configurations/ButtonViewModel";

const buttonContainer = createContainer();
buttonContainer.register({
  // SERVICES
  buttonService:asClass(ButtonService).singleton(),
  //REPOSITORY
  buttonRepository:asClass(ButtonRepositoryImpl).singleton(),
  //USE CASE
  buttonUseCases:asClass(ButtonUseCases).singleton(),
  findAll:asClass(FindAllUseCase).singleton(),
  findActive:asClass(FindActiveUseCase).singleton(),
  create:asClass(CreateUseCase).singleton(),
  update:asClass(UpdateUseCase).singleton(),
  deleteButton:asClass(DeleteUseCase).singleton(),
  // VIEW NOMDEL
  buttonViewModel:asClass(ButtonViewModel).singleton(),
  
})
export {buttonContainer};