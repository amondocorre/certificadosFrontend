import { ErrorResponse } from "../../../models/ErrorResponse";
import { Status, StatusResponse } from "../../../models/StatusModel";
import { StatusRepository } from "../../../repository/configurations/StatusRepositoty";

export class CreateUseCase {
  private statusRepository: StatusRepository;
  constructor({statusRepository}:{statusRepository:StatusRepository}){
    this.statusRepository = statusRepository; 
  }
  async execute(status:Status):Promise<StatusResponse|ErrorResponse>{
    return await this.statusRepository.create(status);
  }
}