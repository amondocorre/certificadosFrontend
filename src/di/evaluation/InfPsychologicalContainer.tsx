import { asClass, createContainer } from "awilix";
import { InfPsychologicalService } from "../../data/sources/remote/services/evaluation/InfPsychologicalService";
import { InfPsychologicalRepositoryImpl } from "../../data/repository/evaluation/InfPsychologicalRepositoryImpl";
import { InfPsychologicalViewModel } from "../../presentation/viewModel/evaluation/InfPsychologicalViewModel";
import { InfPsychologicalUseCases } from "../../domain/useCases/evaluation/inf-psychological/InfPsychologicalUseCases";
import { CreateUseCase } from "../../domain/useCases/evaluation/inf-psychological/CreateUseCase";
import { UpdateUseCase } from "../../domain/useCases/evaluation/inf-psychological/UpdateUseCase";
import { SearchUseCase } from "../../domain/useCases/evaluation/inf-psychological/SearchUseCase";
import { findIdentityUseCase } from "../../domain/useCases/evaluation/inf-psychological/FindIdentityUseCase";
import { ActivateUseCase } from "../../domain/useCases/evaluation/inf-psychological/ActivateUseCase";

const InfPsychologicalContainer = createContainer();
InfPsychologicalContainer.register({
  // SERVICES
  infPsychologicalService:asClass(InfPsychologicalService).singleton(),
  //REPOSITORY
  infPsychologicalRepository:asClass(InfPsychologicalRepositoryImpl).singleton(),
  //USE CASE
  infPsychologicalUseCases:asClass(InfPsychologicalUseCases).singleton(),
  create:asClass(CreateUseCase).singleton(),
  update:asClass(UpdateUseCase).singleton(),
  search:asClass(SearchUseCase).singleton(),
  findIdentity:asClass(findIdentityUseCase).singleton(),
  activate:asClass(ActivateUseCase).singleton(),
  // VIEW NOMDEL
  infPsychologicalViewModel:asClass(InfPsychologicalViewModel).singleton(),
  
})
export {InfPsychologicalContainer};