
import { ResponseRentDetail } from "../../models/DashboardModel";
import { ErrorResponse } from "../../models/ErrorResponse";
import { DashboardRepository } from "../../repository/DashboardRepositoty";

export class GetDetailRentUseCase {
  private dashboardRepository: DashboardRepository;
  constructor({dashboardRepository}:{dashboardRepository:DashboardRepository}){
    this.dashboardRepository = dashboardRepository; 
  }
  async execute(idContrato:number):Promise<ResponseRentDetail|ErrorResponse>{
    return await this.dashboardRepository.getDetailRent(idContrato);
  }
}