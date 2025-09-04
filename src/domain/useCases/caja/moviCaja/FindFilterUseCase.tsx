import { ErrorResponse } from "../../../models/ErrorResponse";
import { MoviCajaFilter, MoviCajaResponse } from "../../../models/MoviCajaModel";
import { MoviCajaRepository } from "../../../repository/caja/MoviCajaRepositoty";

export class FindFilterUseCase {
  private moviCajaRepository: MoviCajaRepository;
  constructor({moviCajaRepository}:{moviCajaRepository:MoviCajaRepository}){
    this.moviCajaRepository = moviCajaRepository; 
  }
  async execute(moviCajaFilter:MoviCajaFilter):Promise<MoviCajaResponse|ErrorResponse>{
    return await this.moviCajaRepository.findFilter(moviCajaFilter);
  }
}