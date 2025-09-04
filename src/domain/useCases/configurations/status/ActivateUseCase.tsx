import { ErrorResponse } from "../../../models/ErrorResponse";
import { StatusResponse } from "../../../models/StatusModel";
import { StatusRepository } from "../../../repository/configurations/StatusRepositoty";

export class ActivateUseCase {
  private statusRepository: StatusRepository;
  constructor({statusRepository}:{statusRepository:StatusRepository}){
    this.statusRepository = statusRepository; 
  }
  async execute(id:number):Promise<StatusResponse|ErrorResponse>{
    return await this.statusRepository.activate(id);
  }
}