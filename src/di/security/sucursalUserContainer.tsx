import { asClass, createContainer } from "awilix";
import { SucursalUserViewModel } from "../../presentation/viewModel/security/SucursalUserViewModel";
import { AddSucursalesUseCase } from "../../domain/useCases/security/sucursalUser/AddSucursalesUseCase";
import { GetSucursalesUserUseCase } from "../../domain/useCases/security/sucursalUser/GetSucursalesUserUseCase";
import { SucursalUserService } from "../../data/sources/remote/services/security/SucursalUserService";
import { SucursalUserUseCases } from "../../domain/useCases/security/sucursalUser/SucursalUserUseCases";
import { FindAllUseCase } from "../../domain/useCases/security/sucursalUser/FindAllUseCase";
import { SucursalUserRepositoryImpl } from "../../data/repository/security/SucursalUserRepositoryImpl";

const sucursalUserContainer = createContainer();
sucursalUserContainer.register({
  // SucursalUserS
  sucursalUserService:asClass(SucursalUserService).singleton(),
  //REPOSITORY
  sucursalUserRepository:asClass(SucursalUserRepositoryImpl).singleton(),
  //USE CASE
  sucursalUserUseCases:asClass(SucursalUserUseCases).singleton(),
  getSucursalesUser:asClass(GetSucursalesUserUseCase).singleton(),
  findAll:asClass(FindAllUseCase).singleton(),
  addSucursales:asClass(AddSucursalesUseCase).singleton(),
  sucursalUserViewModel:asClass(SucursalUserViewModel).singleton(),
  
})
export {sucursalUserContainer};