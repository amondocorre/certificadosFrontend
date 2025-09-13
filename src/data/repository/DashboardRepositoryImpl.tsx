import { ApiResponseRent, IngresosDiarios} from "../../domain/models/DashboardModel";
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
  async listEvaMedical(id_sucursal:number,limit:number,page:number): Promise<ApiResponseRent | ErrorResponse> {
    return await this.dashboardService.listEvaMedical(id_sucursal,limit,page);
  }
  async listEvaPsychological(id_sucursal:number,limit:number,page:number): Promise<ApiResponseRent | ErrorResponse> {
    return await this.dashboardService.listEvaPsychological(id_sucursal,limit,page);
  }
}
