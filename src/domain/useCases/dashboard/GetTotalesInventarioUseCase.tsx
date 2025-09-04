
import { TotalInventario } from "../../models/DashboardModel";
import { ErrorResponse } from "../../models/ErrorResponse";
import { DashboardRepository } from "../../repository/DashboardRepositoty";

export class GetTotalesInventarioUseCase {
  private dashboardRepository: DashboardRepository;
  constructor({dashboardRepository}:{dashboardRepository:DashboardRepository}){
    this.dashboardRepository = dashboardRepository; 
  }
  async execute(id_sucursal:number):Promise<TotalInventario[]|ErrorResponse>{
    return await this.dashboardRepository.getTotalesInventario(id_sucursal);
  }
}