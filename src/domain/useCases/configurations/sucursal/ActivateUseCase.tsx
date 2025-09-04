import { ErrorResponse } from "../../../models/ErrorResponse";
import { SucursalResponse } from "../../../models/SucursalModel";
import { SucursalRepository } from "../../../repository/configurations/SucursalRepositoty";

export class ActivateUseCase {
  private sucursalRepository: SucursalRepository;
  constructor({sucursalRepository}:{sucursalRepository:SucursalRepository}){
    this.sucursalRepository = sucursalRepository; 
  }
  async execute(id:number):Promise<SucursalResponse|ErrorResponse>{
    return await this.sucursalRepository.activate(id);
  }
}