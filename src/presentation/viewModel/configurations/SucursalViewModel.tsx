import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { Sucursal, SucursalResponse } from "../../../domain/models/SucursalModel";
import { SucursalUseCases } from "../../../domain/useCases/configurations/sucursal/SucursalUseCases";

export class SucursalViewModel {
  private sucursalUseCases: SucursalUseCases;
  constructor({sucursalUseCases}:{sucursalUseCases:SucursalUseCases}){
    this.sucursalUseCases = sucursalUseCases
  }
  async findAll():Promise<SucursalResponse|ErrorResponse>{
    return await this.sucursalUseCases.findAll.execute()
  }
  async findActive():Promise<SucursalResponse|ErrorResponse>{
    return await this.sucursalUseCases.findActive.execute()
  }
  async create(sucursal:Sucursal):Promise<SucursalResponse|ErrorResponse>{
    return await this.sucursalUseCases.create.execute(sucursal)
  }
  async update(id:number,sucursal:Sucursal):Promise<SucursalResponse|ErrorResponse>{
    return await this.sucursalUseCases.update.execute(id,sucursal)
  }
  async delete(id:number):Promise<SucursalResponse|ErrorResponse>{
    return await this.sucursalUseCases.deleteUseCase.execute(id)
  }
  async activate(id:number):Promise<SucursalResponse|ErrorResponse>{
    return await this.sucursalUseCases.activate.execute(id)
  }
}