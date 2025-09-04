import { ErrorResponse } from "../../../models/ErrorResponse";
import { Status, StatusResponse } from "../../../models/StatusModel";
import { StatusRepository } from "../../../repository/configurations/StatusRepositoty";

export class UpdateUseCase {
  private statusRepository: StatusRepository;
  constructor({statusRepository}:{statusRepository:StatusRepository}){
    this.statusRepository = statusRepository; 
  }
  async execute(id:number,status:Status):Promise<StatusResponse|ErrorResponse>{
    return await this.statusRepository.update(id,status);
  }
}