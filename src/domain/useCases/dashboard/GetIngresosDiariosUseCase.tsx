
import { IngresosDiarios } from "../../models/DashboardModel";
import { ErrorResponse } from "../../models/ErrorResponse";
import { DashboardRepository } from "../../repository/DashboardRepositoty";

export class GetIngresosDiariosUseCase {
  private dashboardRepository: DashboardRepository;
  constructor({dashboardRepository}:{dashboardRepository:DashboardRepository}){
    this.dashboardRepository = dashboardRepository; 
  }
  async execute(id_sucursal:number):Promise<IngresosDiarios[]|ErrorResponse>{
    return await this.dashboardRepository.getIngresosDiarios(id_sucursal);
  }
}