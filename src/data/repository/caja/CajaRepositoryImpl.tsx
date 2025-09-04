import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { CajaResponse } from "../../../domain/models/CajaModel";
import { CajaRepository } from "../../../domain/repository/caja/CajaRepositoty";
import { CajaService } from "../../sources/remote/services/caja/CajaService";
export class CajaRepositoryImpl implements CajaRepository{
  private cajaService:CajaService;
  constructor(
    {
      cajaService,
    }:{
      cajaService:CajaService
    }){
    this.cajaService = cajaService;
  }
  async create(monto:number,id_sucursal:number): Promise<CajaResponse | ErrorResponse> {
    return await this.cajaService.create(monto,id_sucursal);
  }
  async update(id:number,monto:number,id_sucursal:number): Promise<CajaResponse | ErrorResponse> {
    return await this.cajaService.update(id,monto,id_sucursal);
  }
  async delete(id: number): Promise<CajaResponse | ErrorResponse> {
    return await this.cajaService.delete(id);
  }
  async activate(id: number): Promise<CajaResponse | ErrorResponse> {
    return await this.cajaService.activate(id);
  }
  async findAll(): Promise<CajaResponse | ErrorResponse> {
    return await this.cajaService.findAll();
  }
  async findActive(id_sucursal:number): Promise<CajaResponse | ErrorResponse> {
    return await this.cajaService.findActive(id_sucursal);
  }
}