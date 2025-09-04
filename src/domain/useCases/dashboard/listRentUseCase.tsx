
import { ApiResponseRent } from "../../models/DashboardModel";
import { ErrorResponse } from "../../models/ErrorResponse";
import { DashboardRepository } from "../../repository/DashboardRepositoty";

export class listRentUseCase {
  private dashboardRepository: DashboardRepository;
  constructor({dashboardRepository}:{dashboardRepository:DashboardRepository}){
    this.dashboardRepository = dashboardRepository; 
  }
  async execute(id_sucursal:number,limit:number,page:number):Promise<ApiResponseRent|ErrorResponse>{
    return await this.dashboardRepository.listRent(id_sucursal,limit,page);
  }
}