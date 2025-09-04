import { ErrorResponse } from "../../../models/ErrorResponse";
import { MoviCaja, MoviCajaResponse } from "../../../models/MoviCajaModel";
import { MoviCajaRepository } from "../../../repository/caja/MoviCajaRepositoty";

export class UpdateUseCase {
  private moviCajaRepository: MoviCajaRepository;
  constructor({moviCajaRepository}:{moviCajaRepository:MoviCajaRepository}){
    this.moviCajaRepository = moviCajaRepository; 
  }
  async execute(id:number,moviCaja:MoviCaja):Promise<MoviCajaResponse|ErrorResponse>{
    return await this.moviCajaRepository.update(id,moviCaja);
  }
}