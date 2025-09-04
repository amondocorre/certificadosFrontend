import { ErrorResponse } from "../../../models/ErrorResponse";
import { Combo, ComboResponse } from "../../../models/ComboModel";
import { ComboRepository } from "../../../repository/configurations/ComboRepositoty";

export class CreateUseCase {
  private comboRepository: ComboRepository;
    constructor({comboRepository}:{comboRepository:ComboRepository}){
      this.comboRepository = comboRepository; 
    }
  async execute(combo:Combo):Promise<ComboResponse|ErrorResponse>{
    return await this.comboRepository.create(combo);
  }
}