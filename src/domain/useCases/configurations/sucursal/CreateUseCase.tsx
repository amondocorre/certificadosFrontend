import { ErrorResponse } from "../../../models/ErrorResponse";
import { Sucursal, SucursalResponse } from "../../../models/SucursalModel";
import { SucursalRepository } from "../../../repository/configurations/SucursalRepositoty";

export class CreateUseCase {
  private sucursalRepository: SucursalRepository;
  constructor({sucursalRepository}:{sucursalRepository:SucursalRepository}){
    this.sucursalRepository = sucursalRepository; 
  }
  async execute(sucursal:Sucursal):Promise<SucursalResponse|ErrorResponse>{
    return await this.sucursalRepository.create(sucursal);
  }
}