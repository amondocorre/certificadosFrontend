import { asClass, createContainer } from "awilix";
import { AccesUserService } from "../../data/sources/remote/services/security/AccesUserService";
import { AccesUserRepositoryImpl } from "../../data/repository/security/AccesUserRepositoryImpl";
import { AccesUserUseCases } from "../../domain/useCases/security/accesUser/AccesUserUseCases";
import { FindByUserUseCase } from "../../domain/useCases/security/accesUser/FindByUserUseCase";
import { UpdateUseCase } from "../../domain/useCases/security/accesUser/UpdateUseCase";
import { AccesUserViewModel } from "../../presentation/viewModel/security/AccesUserViewModel";

const AccesUserContainer = createContainer();
AccesUserContainer.register({
  // SERVICES
  accesUserService:asClass(AccesUserService).singleton(),
  //REPOSITORY
  accesUserRepository:asClass(AccesUserRepositoryImpl).singleton(),
  //USE CASE
  accesUserUseCases:asClass(AccesUserUseCases).singleton(),
  findByUser:asClass(FindByUserUseCase).singleton(),
  update:asClass(UpdateUseCase).singleton(),/*
  findActive:asClass(FindActiveUseCase).singleton(),
  create:asClass(CreateUseCase).singleton(),
  deleteAccesUser:asClass(DeleteUseCase).singleton(),*/
  // VIEW NOMDEL
  accesUserViewModel:asClass(AccesUserViewModel).singleton(),
  
})
export {AccesUserContainer};