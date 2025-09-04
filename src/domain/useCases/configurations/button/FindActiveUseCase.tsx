
import { ButtonsResponse } from "../../../models/ButtonModel";
import { ErrorResponse } from "../../../models/ErrorResponse";
import { ButtonRepository } from "../../../repository/configurations/ButtonRepositoty";

export class FindActiveUseCase {
  private buttonRepository: ButtonRepository;
    constructor({buttonRepository}:{buttonRepository:ButtonRepository}){
      this.buttonRepository = buttonRepository; 
    }
    async execute():Promise<ButtonsResponse|ErrorResponse>{
      return await this.buttonRepository.findActive();
    }
}