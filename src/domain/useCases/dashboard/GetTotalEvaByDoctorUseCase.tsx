import { EvaluationsByDoctor } from "../../models/DashboardModel";
import { ErrorResponse } from "../../models/ErrorResponse";
import { DashboardRepository } from "../../repository/DashboardRepositoty";

export class GetTotalEvaByDoctorUseCase {
  private dashboardRepository: DashboardRepository;
  constructor({dashboardRepository}:{dashboardRepository:DashboardRepository}){
    this.dashboardRepository = dashboardRepository; 
  }
  async execute(id_sucursal:number, fecha?:string):Promise<EvaluationsByDoctor[]|ErrorResponse>{
    return await this.dashboardRepository.getTotalEvaByDoctor(id_sucursal, fecha);
  }
}
