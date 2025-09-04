import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { CajaResponse } from "../../../domain/models/CajaModel";
import { CajaUseCases } from "../../../domain/useCases/caja/caja/CajaUseCases";

export class CajaViewModel {
  private cajaUseCases: CajaUseCases;
  constructor({cajaUseCases}:{cajaUseCases:CajaUseCases}){
    this.cajaUseCases = cajaUseCases
  }
  async findAll():Promise<CajaResponse|ErrorResponse>{
    return await this.cajaUseCases.findAll.execute()
  }
  async findActive(id_sucursal:number):Promise<CajaResponse|ErrorResponse>{
    return await this.cajaUseCases.findActive.execute(id_sucursal)
  }
  async create(monto:number,id_sucursal:number):Promise<CajaResponse|ErrorResponse>{
    return await this.cajaUseCases.create.execute(monto,id_sucursal)
  }
  async update(id:number,monto:number,id_sucursal:number):Promise<CajaResponse|ErrorResponse>{
    return await this.cajaUseCases.update.execute(id,monto,id_sucursal)
  }
  async delete(id:number):Promise<CajaResponse|ErrorResponse>{
    return await this.cajaUseCases.deleteUseCase.execute(id)
  }
  async activate(id:number):Promise<CajaResponse|ErrorResponse>{
    return await this.cajaUseCases.activate.execute(id)
  }
}