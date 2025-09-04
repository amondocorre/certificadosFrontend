import { ErrorResponse } from "../../../models/ErrorResponse";
import { ComboResponse } from "../../../models/ComboModel";
import { ComboRepository } from "../../../repository/configurations/ComboRepositoty";

export class DeleteUseCase {
  private comboRepository: ComboRepository;
    constructor({comboRepository}:{comboRepository:ComboRepository}){
      this.comboRepository = comboRepository; 
    }
  async execute(id:number):Promise<ComboResponse|ErrorResponse>{
    return await this.comboRepository.delete(id);
  }
}