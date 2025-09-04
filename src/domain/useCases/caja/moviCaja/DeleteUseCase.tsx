import { ErrorResponse } from "../../../models/ErrorResponse";
import { MoviCajaResponse } from "../../../models/MoviCajaModel";
import { MoviCajaRepository } from "../../../repository/caja/MoviCajaRepositoty";

export class DeleteUseCase {
  private moviCajaRepository: MoviCajaRepository;
  constructor({moviCajaRepository}:{moviCajaRepository:MoviCajaRepository}){
    this.moviCajaRepository = moviCajaRepository; 
  }
  async execute(id:number):Promise<MoviCajaResponse|ErrorResponse>{
    return await this.moviCajaRepository.delete(id);
  }
}