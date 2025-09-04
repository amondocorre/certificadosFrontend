import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { MoviCaja, MoviCajaFilter, MoviCajaResponse } from "../../../domain/models/MoviCajaModel";
import { MoviCajaRepository } from "../../../domain/repository/caja/MoviCajaRepositoty";
import { MoviCajaService } from "../../sources/remote/services/caja/MoviCajaService";
export class MoviCajaRepositoryImpl implements MoviCajaRepository{
  private moviCajaService:MoviCajaService;
  constructor(
    {
      moviCajaService,
    }:{
      moviCajaService:MoviCajaService
    }){
    this.moviCajaService = moviCajaService;
  }
  async create(moviCaja:MoviCaja): Promise<MoviCajaResponse | ErrorResponse> {
    return await this.moviCajaService.create(moviCaja);
  }
  async update(id:number,moviCaja:MoviCaja): Promise<MoviCajaResponse | ErrorResponse> {
    return await this.moviCajaService.update(id,moviCaja);
  }
  async delete(id: number): Promise<MoviCajaResponse | ErrorResponse> {
    return await this.moviCajaService.delete(id);
  }
  async activate(id: number): Promise<MoviCajaResponse | ErrorResponse> {
    return await this.moviCajaService.activate(id);
  }
  async findAll(): Promise<MoviCajaResponse | ErrorResponse> {
    return await this.moviCajaService.findAll();
  }
  async findFilter(moviCajaFilter:MoviCajaFilter): Promise<MoviCajaResponse | ErrorResponse> {
    return await this.moviCajaService.findFilter(moviCajaFilter);
  }
}