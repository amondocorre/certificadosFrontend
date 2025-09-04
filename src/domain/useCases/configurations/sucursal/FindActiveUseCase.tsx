import { ErrorResponse } from "../../../models/ErrorResponse";
import { SucursalResponse } from "../../../models/SucursalModel";
import { SucursalRepository } from "../../../repository/configurations/SucursalRepositoty";

export class FindActiveUseCase {
  private sucursalRepository: SucursalRepository;
  constructor({sucursalRepository}:{sucursalRepository:SucursalRepository}){
    this.sucursalRepository = sucursalRepository; 
  }
  async execute():Promise<SucursalResponse|ErrorResponse>{
    return await this.sucursalRepository.findActive();
  }
}