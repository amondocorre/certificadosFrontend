import { ErrorResponse } from "../../../models/ErrorResponse";
import { CajaResponse } from "../../../models/CajaModel";
import { CajaRepository } from "../../../repository/caja/CajaRepositoty";

export class FindActiveUseCase {
  private cajaRepository: CajaRepository;
  constructor({cajaRepository}:{cajaRepository:CajaRepository}){
    this.cajaRepository = cajaRepository; 
  }
  async execute(id_sucursal:number):Promise<CajaResponse|ErrorResponse>{
    return await this.cajaRepository.findActive(id_sucursal);
  }
}