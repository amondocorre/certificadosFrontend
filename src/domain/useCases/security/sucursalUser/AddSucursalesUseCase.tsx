import { ErrorResponse } from "../../../models/ErrorResponse";
import { SucursalUserResponse } from "../../../models/SucursalModel";
import { SucursalUserRepository } from "../../../repository/security/SucursalUserRepositoty";

export class AddSucursalesUseCase {
  private sucursalUserRepository: SucursalUserRepository;
  constructor({sucursalUserRepository}:{sucursalUserRepository:SucursalUserRepository}){
    this.sucursalUserRepository = sucursalUserRepository; 
  }
  async execute(id_usuario:number,sucursales:string[]):Promise<SucursalUserResponse|ErrorResponse>{
    return await this.sucursalUserRepository.addSucursales(id_usuario,sucursales);
  }
}