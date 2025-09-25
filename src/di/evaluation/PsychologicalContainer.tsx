import { asClass, createContainer } from "awilix";
import { PsychologicalService } from "../../data/sources/remote/services/evaluation/PsychologicalService";
import { PsychologicalRepositoryImpl } from "../../data/repository/evaluation/PsychologicalRepositoryImpl";
import { PsychologicalViewModel } from "../../presentation/viewModel/evaluation/PsychologicalViewModel";
import { PsychologicalUseCases } from "../../domain/useCases/evaluation/psychological/PsychologicalUseCases";
import { CreateUseCase } from "../../domain/useCases/evaluation/psychological/CreateUseCase";
import { UpdateUseCase } from "../../domain/useCases/evaluation/psychological/UpdateUseCase";
import { SearchUseCase } from "../../domain/useCases/evaluation/psychological/SearchUseCase";
import { findIdentityUseCase } from "../../domain/useCases/evaluation/psychological/FindIdentityUseCase";
import { ActivateUseCase } from "../../domain/useCases/evaluation/psychological/ActivateUseCase";

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
  activate:asClass(ActivateUseCase).singleton(),
  // VIEW NOMDEL
  psychologicalViewModel:asClass(PsychologicalViewModel).singleton(),
  
})
export {PsychologicalContainer};