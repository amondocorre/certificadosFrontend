import { MenuItem, MenuResponse, NavigationItem } from "../../domain/models/AccesModel";
import { AuthResponse } from "../../domain/models/AuthResponse";
import { Company } from "../../domain/models/CompanyModel";
import { ErrorResponse } from "../../domain/models/ErrorResponse";
import { User } from "../../domain/models/User";
import { AuthRepository } from "../../domain/repository/AuthRepository";
import { LocalStorage } from "../sources/local/LocalStorage";
import { AuthService } from "../sources/remote/services/AuthService";

export class AuthRepositoryImpl implements AuthRepository{
  private authService:AuthService;
  private localStorage: LocalStorage;
  constructor(
    {
      authService,
      localStorage
    }:{
      authService:AuthService
      localStorage:LocalStorage
    }){
    this.authService = authService;
    this.localStorage = localStorage;
  }
  async removeMenuSesion(): Promise<void> {
    await this.localStorage.remove('navigationItem');
  }
  async saveMenuSesion(menuItem: MenuItem[]): Promise<void> {
    await this.localStorage.save("navigationItem", JSON.stringify(menuItem));
  }
  async getMenuSession(): Promise<MenuItem[]> {
    const data = await this.localStorage.getItem("navigationItem");
    const navigationItem: MenuItem[] = JSON.parse(data as any);
    return navigationItem;
  }
  async getMenuUser(token:string): Promise<MenuResponse | ErrorResponse> {
    return await this.authService.getMenuUser(token);
  }
  async saveAuthSession(authResponse: AuthResponse): Promise<void> {
    await this.localStorage.save("auth", JSON.stringify(authResponse));
  }
  async getAuthSession(): Promise<AuthResponse> {
    const data = await this.localStorage.getItem("auth");
    const authData: AuthResponse = JSON.parse(data as any);
    return authData;
  }
  async removeAuthSession(): Promise<void> {
    this.localStorage.remove('auth');
  }
  async saveDataCompany(company: Company): Promise<void> {
    await this.localStorage.save("dataCompany", JSON.stringify(company));
  }
  async getDataCompany(): Promise<Company> {
    const data = await this.localStorage.getItem("dataCompany");
    const company: Company = JSON.parse(data as any);
    return company;
  }
  async login(username: string, password: string): Promise<AuthResponse | ErrorResponse> {
    return await this.authService.login(username,password);
  }
  async register(user: User): Promise<AuthResponse | ErrorResponse> {
    return await this.authService.register(user);
  }
  
}