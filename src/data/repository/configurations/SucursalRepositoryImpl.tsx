import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { Sucursal, SucursalResponse } from "../../../domain/models/SucursalModel";
import { SucursalRepository } from "../../../domain/repository/configurations/SucursalRepositoty";
import { SucursalService } from "../../sources/remote/services/configurations/SucursalService";
export class SucursalRepositoryImpl implements SucursalRepository{
  private sucursalService:SucursalService;
  constructor(
    {
      sucursalService,
    }:{
      sucursalService:SucursalService
    }){
    this.sucursalService = sucursalService;
  }
  async create(sucursal: Sucursal): Promise<SucursalResponse | ErrorResponse> {
    return await this.sucursalService.create(sucursal);
  }
  async update(id:number,sucursal: Sucursal): Promise<SucursalResponse | ErrorResponse> {
    return await this.sucursalService.update(id,sucursal);
  }
  async delete(id: number): Promise<SucursalResponse | ErrorResponse> {
    return await this.sucursalService.delete(id);
  }
  async activate(id: number): Promise<SucursalResponse | ErrorResponse> {
    return await this.sucursalService.activate(id);
  }
  async findAll(): Promise<SucursalResponse | ErrorResponse> {
    return await this.sucursalService.findAll();
  }
  async findActive(): Promise<SucursalResponse | ErrorResponse> {
    return await this.sucursalService.findActive();
  }
}