import { ActivateUseCase } from "./ActivateUseCase";
import { ChangePasswordUseCase } from "./ChangePasswordUseCase";
import { CreateUseCase } from "./CreateUseCase";
import { DeleteUseCase } from "./DeleteUseCase";
import { FindActiveUseCase } from "./FindActiveUseCase";
import { GetAllUsersUseCase } from "./GetAllUsersUseCase";
import { GetButtunsAccessUseCase } from "./GetButtunsAccessUseCase";
import { ResetPasswordUseCase } from "./ResetPasswordUseCase";
import { UpdateUseCase } from "./UpdateUseCase";

export class UserUseCases{
  getAllUsers :GetAllUsersUseCase;
  getButtunsAccess: GetButtunsAccessUseCase;
  create: CreateUseCase;
  update: UpdateUseCase;
  deleteUser:DeleteUseCase;
  activate:ActivateUseCase;
  findActive:FindActiveUseCase;
  changePassword:ChangePasswordUseCase;
  resetPassword:ResetPasswordUseCase;
  constructor({
    getAllUsers,
    getButtunsAccess,
    create,
    update,
    deleteUser,
    activate,
    findActive,
    resetPassword,
    changePassword,
  }:{
    getAllUsers:GetAllUsersUseCase,
    getButtunsAccess:GetButtunsAccessUseCase,
    create: CreateUseCase;
    update: UpdateUseCase;
    deleteUser:DeleteUseCase;
    activate:ActivateUseCase;
    findActive:FindActiveUseCase;
    resetPassword:ResetPasswordUseCase;
    changePassword:ChangePasswordUseCase;
  }){
  this.getAllUsers = getAllUsers;
  this.getButtunsAccess = getButtunsAccess;
  this.create =create;
  this.update = update;
  this.deleteUser = deleteUser;
  this.activate = activate;
  this.findActive = findActive;
  this.resetPassword = resetPassword;
  this.changePassword = changePassword;


}
}