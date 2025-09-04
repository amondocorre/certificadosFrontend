import { asClass, createContainer } from "awilix";
import { AuthService } from "../data/sources/remote/services/AuthService";
import { AuthRepositoryImpl } from "../data/repository/AuthRepositoryImpl";
import { LoginUseCase } from "../domain/useCases/auth/LoginUseCase";
import { LoginViewModel } from "../presentation/pages/auth/login/LoginViewModel";
import { RegisterUseCase } from "../domain/useCases/auth/RegisterUseCase";
import { LocalStorage } from "../data/sources/local/LocalStorage";
import { SaveAuthSessionUseCase } from "../domain/useCases/auth/SaveAuthSessionUseCase";
import { GetAuthSessionUseCase } from "../domain/useCases/auth/GetAuthSessionUseCase";
import { RemoveAuthSessionUseCase } from "../domain/useCases/auth/RemoveAuthSessionUseCase";
import { AuthUseCases } from "../domain/useCases/auth/AuthUseCases";
import { GetMenuUserUseCase } from "../domain/useCases/auth/GetMenuUserUseCase";
import { GetMenuSessionUseCase } from "../domain/useCases/auth/GetMenuSessionUseCase";
import { SaveMenuSessionUseCase } from "../domain/useCases/auth/SaveMenuSessionUseCase";
import { RemoveMenuSessionUseCase } from "../domain/useCases/auth/RemoveMenuSessionUseCase";
import { GetDataCompanyUseCase } from "../domain/useCases/auth/GetDataCompanyUseCase";
import { SaveDataCompanyUseCase } from "../domain/useCases/auth/SaveDataCompanyUseCase";

const container = createContainer();
container.register({
  // SERVICES
  authService:asClass(AuthService).singleton(),
  localStorage:asClass(LocalStorage).singleton(),
  //REPOSITORY
  authRepository:asClass(AuthRepositoryImpl).singleton(),
  //USE CASE
  loginUseCase:asClass(LoginUseCase).singleton(),
  registerUseCase:asClass(RegisterUseCase).singleton(),
  saveAuthSession:asClass(SaveAuthSessionUseCase).singleton(),
  getAuthSession:asClass(GetAuthSessionUseCase).singleton(),
  removeAuthSession:asClass(RemoveAuthSessionUseCase).singleton(),
  authUseCases:asClass(AuthUseCases).singleton(),
  getMenuUser:asClass(GetMenuUserUseCase).singleton(),
  getMenuSession:asClass(GetMenuSessionUseCase).singleton(),
  saveMenuSession:asClass(SaveMenuSessionUseCase).singleton(),
  removeMenuSession:asClass(RemoveMenuSessionUseCase).singleton(),
  getDataCompany:asClass(GetDataCompanyUseCase).singleton(),
  saveDataCompany:asClass(SaveDataCompanyUseCase).singleton(),
  // VIEW NOMDEL
  loginViewModel:asClass(LoginViewModel).singleton(),
  //registerViewModel:asClass(RegisterViewModel).singleton(),
})
export {container};