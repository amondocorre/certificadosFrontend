import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { Combo, ComboResponse } from "../../../domain/models/ComboModel";
import { ComboUseCases } from "../../../domain/useCases/configurations/combo/ComboUseCases";
export class ComboViewModel {
  private comboUseCases: ComboUseCases;
  constructor({comboUseCases}:{comboUseCases:ComboUseCases}){
    this.comboUseCases = comboUseCases
  }
  async findAll():Promise<ComboResponse|ErrorResponse>{
    return await this.comboUseCases.findAll.execute()
  }
  async findActive():Promise<ComboResponse|ErrorResponse>{
    return await this.comboUseCases.findActive.execute()
  }
  async create(combo:Combo):Promise<ComboResponse|ErrorResponse>{
    return await this.comboUseCases.create.execute(combo)
  }
  async update(id:number,combo:Combo):Promise<ComboResponse|ErrorResponse>{
    return await this.comboUseCases.update.execute(id,combo)
  }
  async delete(id:number):Promise<ComboResponse|ErrorResponse>{
    return await this.comboUseCases.deleteUseCase.execute(id)
  }
  async activate(id:number):Promise<ComboResponse|ErrorResponse>{
    return await this.comboUseCases.activate.execute(id)
  }
}