
import { ResponseEvaluations, } from "../../models/DashboardModel";
import { ErrorResponse } from "../../models/ErrorResponse";
import { DashboardRepository } from "../../repository/DashboardRepositoty";

export class GetTotalEvaluationsUseCase {
  private dashboardRepository: DashboardRepository;
  constructor({dashboardRepository}:{dashboardRepository:DashboardRepository}){
    this.dashboardRepository = dashboardRepository; 
  }
  async execute(id_sucursal:number):Promise<ResponseEvaluations|ErrorResponse>{
    return await this.dashboardRepository.getTotalEvaluations(id_sucursal);
  }
}