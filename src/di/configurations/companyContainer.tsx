import { asClass, createContainer } from "awilix";
import { CompanyService } from "../../data/sources/remote/services/configurations/CompanyService";
import { CompanyRepositoryImpl } from "../../data/repository/configurations/CompanyRepositoryImpl";
import { CompanyUseCases } from "../../domain/useCases/configurations/company/CompanyUseCases";
import { FindActiveUseCase } from "../../domain/useCases/configurations/company/FindActiveUseCase";
import { FindAllUseCase } from "../../domain/useCases/configurations/company/FindAllUseCase";
import { CreateUseCase } from "../../domain/useCases/configurations/company/CreateUseCase";
import { UpdateUseCase } from "../../domain/useCases/configurations/company/UpdateUseCase";
import { DeleteUseCase } from "../../domain/useCases/configurations/company/DeleteUseCase";
import { ActivateUseCase } from "../../domain/useCases/configurations/company/ActivateUseCase";
import { CompanyViewModel } from "../../presentation/viewModel/configurations/CompanyViewModel";

const companyContainer = createContainer();
companyContainer.register({
  // SERVICES
  companyService:asClass(CompanyService).singleton(),
  //REPOSITORY
  companyRepository:asClass(CompanyRepositoryImpl).singleton(),
  //USE CASE
  companyUseCases:asClass(CompanyUseCases).singleton(),
  findActive:asClass(FindActiveUseCase).singleton(),
  findAll:asClass(FindAllUseCase).singleton(),
  create:asClass(CreateUseCase).singleton(),
  update:asClass(UpdateUseCase).singleton(),
  deleteUseCase:asClass(DeleteUseCase).singleton(),
  activate:asClass(ActivateUseCase).singleton(),
  // VIEW NOMDEL
  companyViewModel:asClass(CompanyViewModel).singleton(),
  
})
export {companyContainer};