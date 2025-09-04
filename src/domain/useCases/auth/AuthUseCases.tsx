import { GetAuthSessionUseCase } from "./GetAuthSessionUseCase";
import { GetDataCompanyUseCase } from "./GetDataCompanyUseCase";
import { GetMenuSessionUseCase } from "./GetMenuSessionUseCase";
import { GetMenuUserUseCase } from "./GetMenuUserUseCase";
import { LoginUseCase } from "./LoginUseCase";
import { RegisterUseCase } from "./RegisterUseCase";
import { RemoveAuthSessionUseCase } from "./RemoveAuthSessionUseCase";
import { RemoveMenuSessionUseCase } from "./RemoveMenuSessionUseCase";
import { SaveAuthSessionUseCase } from "./SaveAuthSessionUseCase";
import { SaveDataCompanyUseCase } from "./SaveDataCompanyUseCase";
import { SaveMenuSessionUseCase } from "./SaveMenuSessionUseCase";

export class AuthUseCases{
  login :LoginUseCase;
  register: RegisterUseCase;
  saveAuthSession: SaveAuthSessionUseCase;
  getAuthSession: GetAuthSessionUseCase;
  removeAuthSession: RemoveAuthSessionUseCase;
  getMenuUser:GetMenuUserUseCase;
  getMenuSession:GetMenuSessionUseCase;
  saveMenuSession:SaveMenuSessionUseCase;
  removeMenuSession:RemoveMenuSessionUseCase;
  getDataCompany:GetDataCompanyUseCase
  saveDataCompany:SaveDataCompanyUseCase
  constructor({
    loginUseCase,
    registerUseCase,
    saveAuthSession,
    getAuthSession,
    removeAuthSession,
    getMenuUser,
    getMenuSession,
    saveMenuSession,
    removeMenuSession,
    getDataCompany,
    saveDataCompany
  }:{
    loginUseCase:LoginUseCase,
    registerUseCase:RegisterUseCase,
    saveAuthSession:SaveAuthSessionUseCase,
    getAuthSession:GetAuthSessionUseCase,
    removeAuthSession:RemoveAuthSessionUseCase,
    getMenuUser:GetMenuUserUseCase
    getMenuSession:GetMenuSessionUseCase
    saveMenuSession:SaveMenuSessionUseCase,
    removeMenuSession:RemoveMenuSessionUseCase,
    getDataCompany:GetDataCompanyUseCase
    saveDataCompany:SaveDataCompanyUseCase
  }){
  this.login = loginUseCase;
  this.register = registerUseCase;
  this.saveAuthSession = saveAuthSession;
  this.getAuthSession = getAuthSession;
  this.removeAuthSession = removeAuthSession;
  this.getMenuUser = getMenuUser;
  this.getMenuSession = getMenuSession;
  this.saveMenuSession = saveMenuSession;
  this.removeMenuSession = removeMenuSession;
  this.getDataCompany = getDataCompany;
  this.saveDataCompany = saveDataCompany

}
}