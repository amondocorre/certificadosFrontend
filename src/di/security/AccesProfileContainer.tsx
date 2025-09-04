import { asClass, createContainer } from "awilix";
import { AccesProfileService } from "../../data/sources/remote/services/security/AccesProfileService";
import { AccesProfileRepositoryImpl } from "../../data/repository/security/AccesProfileRepositoryImpl";
import { AccesProfileUseCases } from "../../domain/useCases/security/accesProfile/AccesProfileUseCases";
import { FindByProfileUseCase } from "../../domain/useCases/security/accesProfile/FindByProfileUseCase";
import { UpdateUseCase } from "../../domain/useCases/security/accesProfile/UpdateUseCase";
import { AccesProfileViewModel } from "../../presentation/viewModel/security/AccesProfileViewModel";


const AccesProfileContainer = createContainer();
AccesProfileContainer.register({
  // SERVICES
  accesProfileService:asClass(AccesProfileService).singleton(),
  //REPOSITORY
  accesProfileRepository:asClass(AccesProfileRepositoryImpl).singleton(),
  //USE CASE
  accesProfileUseCases:asClass(AccesProfileUseCases).singleton(),
  findByProfile:asClass(FindByProfileUseCase).singleton(),
  update:asClass(UpdateUseCase).singleton(),
  // VIEW NOMDEL
  accesProfileViewModel:asClass(AccesProfileViewModel).singleton(),
  
})
export {AccesProfileContainer};