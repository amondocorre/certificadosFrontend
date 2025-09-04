import { MenuItem, MenuResponse, NavigationItem } from "../models/AccesModel";
import { AuthResponse } from "../models/AuthResponse";
import { Company } from "../models/CompanyModel";
import { ErrorResponse } from "../models/ErrorResponse";
import { User } from "../models/User";

export interface AuthRepository{ 
  login(username:string,password:string):Promise<AuthResponse|ErrorResponse>;
  register(user:User):Promise<AuthResponse|ErrorResponse>;
  saveAuthSession(authResponse:AuthResponse):Promise<void>;
  getAuthSession():Promise<AuthResponse>;
  removeAuthSession():Promise<void>; 
  getMenuUser(token:string):Promise<MenuResponse|ErrorResponse>
  getMenuSession():Promise<MenuItem[]>
  saveMenuSesion(menuItem: MenuItem[]):Promise<void>
  removeMenuSesion():Promise<void>
  saveDataCompany(company: Company): Promise<void>
  getDataCompany(): Promise<Company>
}