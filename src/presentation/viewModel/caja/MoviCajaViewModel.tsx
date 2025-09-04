import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { MoviCaja, MoviCajaFilter, MoviCajaResponse } from "../../../domain/models/MoviCajaModel";
import { MoviCajaUseCases } from "../../../domain/useCases/caja/moviCaja/MoviCajaUseCases";

export class MoviCajaViewModel {
  private moviCajaUseCases: MoviCajaUseCases;
  constructor({moviCajaUseCases}:{moviCajaUseCases:MoviCajaUseCases}){
    this.moviCajaUseCases = moviCajaUseCases
  }
  async findAll():Promise<MoviCajaResponse|ErrorResponse>{
    return await this.moviCajaUseCases.findAll.execute()
  }
  async findFilter(moviCajaFilter:MoviCajaFilter):Promise<MoviCajaResponse|ErrorResponse>{
    return await this.moviCajaUseCases.findFilter.execute(moviCajaFilter)
  }
  async create(moviCaja:MoviCaja):Promise<MoviCajaResponse|ErrorResponse>{
    return await this.moviCajaUseCases.create.execute(moviCaja)
  }
  async update(id:number,moviCaja:MoviCaja):Promise<MoviCajaResponse|ErrorResponse>{
    return await this.moviCajaUseCases.update.execute(id,moviCaja)
  }
  async delete(id:number):Promise<MoviCajaResponse|ErrorResponse>{
    return await this.moviCajaUseCases.deleteUseCase.execute(id)
  }
  async activate(id:number):Promise<MoviCajaResponse|ErrorResponse>{
    return await this.moviCajaUseCases.activate.execute(id)
  }
}