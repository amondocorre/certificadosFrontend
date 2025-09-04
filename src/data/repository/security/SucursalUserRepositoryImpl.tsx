import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { SucursalUserResponse } from "../../../domain/models/SucursalModel";
import { SucursalUserRepository } from "../../../domain/repository/security/SucursalUserRepositoty";
import { SucursalUserService } from "../../sources/remote/services/security/SucursalUserService";
export class SucursalUserRepositoryImpl implements SucursalUserRepository{
  private sucursalUserService:SucursalUserService;
  constructor(
    {
      sucursalUserService,
    }:{
      sucursalUserService:SucursalUserService
    }){
    this.sucursalUserService = sucursalUserService;
  }
  async addSucursales(id_usuario:number,sucursales:string[]): Promise<SucursalUserResponse | ErrorResponse> {
    return await this.sucursalUserService.addSucursales(id_usuario,sucursales);
  }
  async findAll(): Promise<SucursalUserResponse | ErrorResponse> {
    return await this.sucursalUserService.findAll();
  }
  async getSucursalesUser(): Promise<SucursalUserResponse | ErrorResponse> {
    return await this.sucursalUserService.getSucursalesUser();
  }
}