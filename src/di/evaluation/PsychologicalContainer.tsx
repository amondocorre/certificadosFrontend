import { asClass, createContainer } from "awilix";
import { PsychologicalService } from "../../data/sources/remote/services/evaluation/PsychologicalService";
import { PsychologicalRepositoryImpl } from "../../data/repository/evaluation/PsychologicalRepositoryImpl";
import { PsychologicalViewModel } from "../../presentation/viewModel/evaluation/PsychologicalViewModel";
import { PsychologicalUseCases } from "../../domain/useCases/evaluation/psychological/PsychologicalUseCases";
import { CreateUseCase } from "../../domain/useCases/evaluation/psychological/CreateUseCase";
import { UpdateUseCase } from "../../domain/useCases/evaluation/psychological/UpdateUseCase";
import { SearchUseCase } from "../../domain/useCases/evaluation/psychological/SearchUseCase";
import { findIdentityUseCase } from "../../domain/useCases/evaluation/psychological/findIdentityUseCase";

const PsychologicalContainer = createContainer();
PsychologicalContainer.register({
  // SERVICES
  psychologicalService:asClass(PsychologicalService).singleton(),
  //REPOSITORY
  psychologicalRepository:asClass(PsychologicalRepositoryImpl).singleton(),
  //USE CASE
  psychologicalUseCases:asClass(PsychologicalUseCases).singleton(),
  create:asClass(CreateUseCase).singleton(),
  update:asClass(UpdateUseCase).singleton(),
  search:asClass(SearchUseCase).singleton(),
  findIdentity:asClass(findIdentityUseCase).singleton(),
  // VIEW NOMDEL
  psychologicalViewModel:asClass(PsychologicalViewModel).singleton(),
  
})
export {PsychologicalContainer};