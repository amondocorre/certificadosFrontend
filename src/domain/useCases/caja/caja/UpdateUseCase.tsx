import { ErrorResponse } from "../../../models/ErrorResponse";
import { CajaResponse } from "../../../models/CajaModel";
import { CajaRepository } from "../../../repository/caja/CajaRepositoty";

export class UpdateUseCase {
  private cajaRepository: CajaRepository;
  constructor({cajaRepository}:{cajaRepository:CajaRepository}){
    this.cajaRepository = cajaRepository; 
  }
  async execute(id:number,monto:number,id_sucursal:number):Promise<CajaResponse|ErrorResponse>{
    return await this.cajaRepository.update(id,monto,id_sucursal);
  }
}