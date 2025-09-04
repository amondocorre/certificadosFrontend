import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { Status, StatusResponse } from "../../../domain/models/StatusModel";
import { StatusUseCases } from "../../../domain/useCases/configurations/status/StatusUseCases";

export class StatusViewModel {
  private statusUseCases: StatusUseCases;
  constructor({statusUseCases}:{statusUseCases:StatusUseCases}){
    this.statusUseCases = statusUseCases
  }
  async findAll():Promise<StatusResponse|ErrorResponse>{
    return await this.statusUseCases.findAll.execute()
  }
  async findActive():Promise<StatusResponse|ErrorResponse>{
    return await this.statusUseCases.findActive.execute()
  }
  async create(Status:Status):Promise<StatusResponse|ErrorResponse>{
    return await this.statusUseCases.create.execute(Status)
  }
  async update(id:number,Status:Status):Promise<StatusResponse|ErrorResponse>{
    return await this.statusUseCases.update.execute(id,Status)
  }
  async delete(id:number):Promise<StatusResponse|ErrorResponse>{
    return await this.statusUseCases.deleteUseCase.execute(id)
  }
  async activate(id:number):Promise<StatusResponse|ErrorResponse>{
    return await this.statusUseCases.activate.execute(id)
  }
}