import { asClass, createContainer } from "awilix";
import { ExplorationService } from "../../data/sources/remote/services/evaluation/ExplorationService";
import { ExplorationRepositoryImpl } from "../../data/repository/evaluation/ExplorationRepositoryImpl";
import { ExplorationUseCases } from "../../domain/useCases/evaluation/exploration/ExplorationUseCases";
import { ExplorationViewModel } from "../../presentation/viewModel/evaluation/ExplorationViewModel";
import { CreateUseCase } from "../../domain/useCases/evaluation/exploration/CreateUseCase";
import { SearchUseCase } from "../../domain/useCases/evaluation/exploration/SearchUseCase";

const ExplorationContainer = createContainer();
ExplorationContainer.register({
  // SERVICES
  explorationService:asClass(ExplorationService).singleton(),
  //REPOSITORY
  explorationRepository:asClass(ExplorationRepositoryImpl).singleton(),
  //USE CASE
  explorationUseCases:asClass(ExplorationUseCases).singleton(),
  create:asClass(CreateUseCase).singleton(),
  search:asClass(SearchUseCase).singleton(),
  // VIEW NOMDEL
  explorationViewModel:asClass(ExplorationViewModel).singleton(),
  
})
export {ExplorationContainer};