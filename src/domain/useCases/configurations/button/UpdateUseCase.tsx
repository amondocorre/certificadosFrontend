
import { Button, ButtonsResponse } from "../../../models/ButtonModel";
import { ErrorResponse } from "../../../models/ErrorResponse";
import { ButtonRepository } from "../../../repository/configurations/ButtonRepositoty";

export class UpdateUseCase {
  private buttonRepository: ButtonRepository;
  constructor({buttonRepository}:{buttonRepository:ButtonRepository}){
    this.buttonRepository = buttonRepository; 
  }
  async execute(id:string,button:Button):Promise<ButtonsResponse|ErrorResponse>{
    return await this.buttonRepository.update(id,button);
  }
}