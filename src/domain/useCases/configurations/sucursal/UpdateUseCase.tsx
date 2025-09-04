import { ErrorResponse } from "../../../models/ErrorResponse";
import { Sucursal, SucursalResponse } from "../../../models/SucursalModel";
import { SucursalRepository } from "../../../repository/configurations/SucursalRepositoty";

export class UpdateUseCase {
  private sucursalRepository: SucursalRepository;
  constructor({sucursalRepository}:{sucursalRepository:SucursalRepository}){
    this.sucursalRepository = sucursalRepository; 
  }
  async execute(id:number,sucursal:Sucursal):Promise<SucursalResponse|ErrorResponse>{
    return await this.sucursalRepository.update(id,sucursal);
  }
}