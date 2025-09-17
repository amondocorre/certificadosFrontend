
import { ApiResponse, } from "../../models/DashboardModel";
import { ErrorResponse } from "../../models/ErrorResponse";
import { DashboardRepository } from "../../repository/DashboardRepositoty";

export class ListEvaPsychologicalUseCase {
  private dashboardRepository: DashboardRepository;
  constructor({dashboardRepository}:{dashboardRepository:DashboardRepository}){
    this.dashboardRepository = dashboardRepository; 
  }
  async execute(id_sucursal:number,limit:number,page:number):Promise<ApiResponse|ErrorResponse>{
    return await this.dashboardRepository.listEvaPsychological(id_sucursal,limit,page);
  }
}