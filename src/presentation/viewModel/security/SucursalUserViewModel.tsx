import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { SucursalUserResponse } from "../../../domain/models/SucursalModel";
import { SucursalUserUseCases } from "../../../domain/useCases/security/sucursalUser/SucursalUserUseCases";

export class SucursalUserViewModel {
  private sucursalUserUseCases: SucursalUserUseCases;
  constructor({sucursalUserUseCases}:{sucursalUserUseCases:SucursalUserUseCases}){
    this.sucursalUserUseCases = sucursalUserUseCases
  }
  async findAll():Promise<SucursalUserResponse|ErrorResponse>{
    return await this.sucursalUserUseCases.findAll.execute()
  }
  async getSucursalesUser():Promise<SucursalUserResponse|ErrorResponse>{
    return await this.sucursalUserUseCases.getSucursalesUser.execute()
  }
  async addSucursales(id_usuario:number,sucursales:string[]):Promise<SucursalUserResponse|ErrorResponse>{
    return await this.sucursalUserUseCases.addSucursales.execute(id_usuario,sucursales)
  }
}