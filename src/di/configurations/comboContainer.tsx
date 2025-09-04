import { asClass, createContainer } from "awilix";
import { ComboService } from "../../data/sources/remote/services/configurations/ComboService";
import { ComboRepositoryImpl } from "../../data/repository/configurations/ComboRepositoryImpl";
import { ComboViewModel } from "../../presentation/viewModel/configurations/ComboViewModel";
import { ComboUseCases } from "../../domain/useCases/configurations/combo/ComboUseCases";
import { FindActiveUseCase } from "../../domain/useCases/configurations/combo/FindActiveUseCase";
import { FindAllUseCase } from "../../domain/useCases/configurations/combo/FindAllUseCase";
import { CreateUseCase } from "../../domain/useCases/configurations/combo/CreateUseCase";
import { UpdateUseCase } from "../../domain/useCases/configurations/combo/UpdateUseCase";
import { DeleteUseCase } from "../../domain/useCases/configurations/combo/DeleteUseCase";
import { ActivateUseCase } from "../../domain/useCases/configurations/combo/ActivateUseCase";

const comboContainer = createContainer();
comboContainer.register({
  // SERVICES
  comboService:asClass(ComboService).singleton(),
  //REPOSITORY
  comboRepository:asClass(ComboRepositoryImpl).singleton(),
  //USE CASE
  comboUseCases:asClass(ComboUseCases).singleton(),
  findActive:asClass(FindActiveUseCase).singleton(),
  findAll:asClass(FindAllUseCase).singleton(),
  create:asClass(CreateUseCase).singleton(),
  update:asClass(UpdateUseCase).singleton(),
  deleteUseCase:asClass(DeleteUseCase).singleton(),
  activate:asClass(ActivateUseCase).singleton(),
  // VIEW NOMDEL
  comboViewModel:asClass(ComboViewModel).singleton(),
  
})
export {comboContainer};