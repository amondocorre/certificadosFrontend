import { asClass, createContainer } from "awilix";
import { UserService } from "../data/sources/remote/services/UserService";
import { UserRepositoryImpl } from "../data/repository/UserRepositoryImpl";
import { GetButtunsAccessUseCase } from "../domain/useCases/user/GetButtunsAccessUseCase";
import { GetAllUsersUseCase } from "../domain/useCases/user/GetAllUsersUseCase";
import { UserViewModel } from "../presentation/viewModel/UserViewModel";
import { UserUseCases } from "../domain/useCases/user/UserUseCase";
import { CreateUseCase } from "../domain/useCases/user/CreateUseCase";
import { UpdateUseCase } from "../domain/useCases/user/UpdateUseCase";
import { DeleteUseCase } from "../domain/useCases/user/DeleteUseCase";
import { ActivateUseCase } from "../domain/useCases/user/ActivateUseCase";
import { FindActiveUseCase } from "../domain/useCases/user/FindActiveUseCase";
import { ChangePasswordUseCase } from "../domain/useCases/user/ChangePasswordUseCase";
import { ResetPasswordUseCase } from "../domain/useCases/user/ResetPasswordUseCase";

const userContainer = createContainer();
userContainer.register({
  // SERVICES
  userService:asClass(UserService).singleton(),
  //REPOSITORY
  userRepository:asClass(UserRepositoryImpl).singleton(),
  //USE CASE
  userUseCases:asClass(UserUseCases).singleton(),
  getButtunsAccess:asClass(GetButtunsAccessUseCase).singleton(),
  getAllUsers:asClass(GetAllUsersUseCase).singleton(),
  findActive:asClass(FindActiveUseCase).singleton(),
  create:asClass(CreateUseCase).singleton(),
  update:asClass(UpdateUseCase).singleton(),
  deleteUser:asClass(DeleteUseCase).singleton(),
  activate:asClass(ActivateUseCase).singleton(),
  resetPassword:asClass(ResetPasswordUseCase).singleton(),
  changePassword:asClass(ChangePasswordUseCase).singleton(),
  // VIEW NOMDEL
  UserViewModel:asClass(UserViewModel).singleton(),
  
})
export {userContainer};