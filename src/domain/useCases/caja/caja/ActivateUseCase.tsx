import { ErrorResponse } from "../../../models/ErrorResponse";
import { CajaResponse } from "../../../models/CajaModel";
import { CajaRepository } from "../../../repository/caja/CajaRepositoty";

export class ActivateUseCase {
  private cajaRepository: CajaRepository;
  constructor({cajaRepository}:{cajaRepository:CajaRepository}){
    this.cajaRepository = cajaRepository; 
  }
  async execute(id:number):Promise<CajaResponse|ErrorResponse>{
    return await this.cajaRepository.activate(id);
  }
}