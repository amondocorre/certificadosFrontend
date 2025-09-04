import { ErrorResponse } from "../../../models/ErrorResponse";
import { SucursalUserResponse } from "../../../models/SucursalModel";
import { SucursalUserRepository } from "../../../repository/security/SucursalUserRepositoty";

export class FindAllUseCase {
  private sucursalUserRepository: SucursalUserRepository;
  constructor({sucursalUserRepository}:{sucursalUserRepository:SucursalUserRepository}){
    this.sucursalUserRepository = sucursalUserRepository; 
  }
  async execute():Promise<SucursalUserResponse|ErrorResponse>{
    return await this.sucursalUserRepository.findAll();
  }
}