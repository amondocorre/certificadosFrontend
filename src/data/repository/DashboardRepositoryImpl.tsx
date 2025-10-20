import { ApiResponse, IngresosDiarios, ResponseEvaluations} from "../../domain/models/DashboardModel";
import { ErrorResponse } from "../../domain/models/ErrorResponse";
import { DashboardRepository } from "../../domain/repository/DashboardRepositoty";
import { DashboardService } from "../sources/remote/services/DashboardService";

export class DashboardRepositoryImpl implements DashboardRepository{
  private dashboardService:DashboardService;
  constructor({dashboardService,}:{dashboardService:DashboardService}){
    this.dashboardService = dashboardService;
  }
  async getIngresosDiarios(id_sucursal: number): Promise<IngresosDiarios[] | ErrorResponse> {
    return await this.dashboardService.getIngresosDiarios(id_sucursal);
  }
  async listEvaMedical(id_sucursal:number,limit:number,page:number): Promise<ApiResponse | ErrorResponse> {
    return await this.dashboardService.listEvaMedical(id_sucursal,limit,page);
  }
  async listEvaPsychological(id_sucursal:number,limit:number,page:number): Promise<ApiResponse | ErrorResponse> {
    return await this.dashboardService.listEvaPsychological(id_sucursal,limit,page);
  }
  async listInfEvaPsychological(id_sucursal:number,limit:number,page:number): Promise<ApiResponse | ErrorResponse> {
    return await this.dashboardService.listInfEvaPsychological(id_sucursal,limit,page);
  }
  async getTotalEvaluations(id_sucursal:number): Promise<ResponseEvaluations | ErrorResponse> {
    return await this.dashboardService.getTotalEvaluations(id_sucursal);
  }
}
