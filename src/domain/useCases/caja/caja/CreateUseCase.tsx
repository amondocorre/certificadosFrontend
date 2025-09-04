import { ErrorResponse } from "../../../models/ErrorResponse";
import { CajaResponse } from "../../../models/CajaModel";
import { CajaRepository } from "../../../repository/caja/CajaRepositoty";

export class CreateUseCase {
  private cajaRepository: CajaRepository;
  constructor({cajaRepository}:{cajaRepository:CajaRepository}){
    this.cajaRepository = cajaRepository; 
  }
  async execute(monto:number,id_sucursal:number):Promise<CajaResponse|ErrorResponse>{
    return await this.cajaRepository.create(monto,id_sucursal);
  }
}