import { ApiResponseRent, IngresosDiarios, ResponseRentDetail, TotalInventario } from "../../domain/models/DashboardModel";
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
  async getTotalesInventario(id_sucursal:number): Promise<TotalInventario[] | ErrorResponse> {
    return await this.dashboardService.getTotalesInventario(id_sucursal);
  }
  async listRent(id_sucursal:number,limit:number,page:number): Promise<ApiResponseRent | ErrorResponse> {
    return await this.dashboardService.listRent(id_sucursal,limit,page);
  }
  async listRentEntrega(id_sucursal:number,limit:number,page:number): Promise<ApiResponseRent | ErrorResponse> {
    return await this.dashboardService.listRentEntrega(id_sucursal,limit,page);
  }
  async getDetailRent(idContrato:number): Promise<ResponseRentDetail | ErrorResponse> {
    return await this.dashboardService.getDetailRent(idContrato);
  }
}
