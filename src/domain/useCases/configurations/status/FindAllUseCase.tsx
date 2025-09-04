import { ErrorResponse } from "../../../models/ErrorResponse";
import { StatusResponse } from "../../../models/StatusModel";
import { StatusRepository } from "../../../repository/configurations/StatusRepositoty";

export class FindAllUseCase {
  private statusRepository: StatusRepository;
  constructor({statusRepository}:{statusRepository:StatusRepository}){
    this.statusRepository = statusRepository; 
  }
  async execute():Promise<StatusResponse|ErrorResponse>{
    return await this.statusRepository.findAll();
  }
}