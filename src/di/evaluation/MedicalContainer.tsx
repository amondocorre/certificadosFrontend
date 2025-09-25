import { asClass, createContainer } from "awilix";
import { MedicalService } from "../../data/sources/remote/services/evaluation/MedicalService";
import { MedicalRepositoryImpl } from "../../data/repository/evaluation/MedicalRepositoryImpl";
import { MedicalViewModel } from "../../presentation/viewModel/evaluation/MedicalViewModel";
import { MedicalUseCases } from "../../domain/useCases/evaluation/medical/MedicalUseCases";
import { CreateUseCase } from "../../domain/useCases/evaluation/medical/CreateUseCase";
import { UpdateUseCase } from "../../domain/useCases/evaluation/medical/UpdateUseCase";
import { SearchUseCase } from "../../domain/useCases/evaluation/medical/SearchUseCase";
import { FindIdentityUseCase } from "../../domain/useCases/evaluation/medical/FindIdentityUseCase";
import { ActivateUseCase } from "../../domain/useCases/evaluation/medical/ActivateUseCase";

const MedicalContainer = createContainer();
MedicalContainer.register({
  // SERVICES
  medicalService:asClass(MedicalService).singleton(),
  //REPOSITORY
  medicalRepository:asClass(MedicalRepositoryImpl).singleton(),
  //USE CASE
  medicalUseCases:asClass(MedicalUseCases).singleton(),
  create:asClass(CreateUseCase).singleton(),
  update:asClass(UpdateUseCase).singleton(),
  search:asClass(SearchUseCase).singleton(),
  findIdentity:asClass(FindIdentityUseCase).singleton(),
  activate:asClass(ActivateUseCase).singleton(),
  // VIEW NOMDEL
  medicalViewModel:asClass(MedicalViewModel).singleton(),
  
})
export {MedicalContainer};