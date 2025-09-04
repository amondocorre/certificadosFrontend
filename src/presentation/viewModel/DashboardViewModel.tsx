
import { ApiResponseRent, IngresosDiarios, ResponseRentDetail, TotalInventario } from '../../domain/models/DashboardModel';
import { ErrorResponse } from '../../domain/models/ErrorResponse';
import { DashboardUseCases } from '../../domain/useCases/dashboard/DashboardUseCases';
export class DashboardViewModel {
  private dashboardUseCases: DashboardUseCases;
  constructor({dashboardUseCases}:{dashboardUseCases:DashboardUseCases}){
    this.dashboardUseCases = dashboardUseCases
  }
  async getIngresosDiarios(id_sucursal:number):Promise<IngresosDiarios[]|ErrorResponse>{
    return await this.dashboardUseCases.getIngresosDiarios.execute(id_sucursal)
  }
  async getTotalesInventario(id_sucursal:number):Promise<TotalInventario[]|ErrorResponse>{
    return await this.dashboardUseCases.getTotalesInventario.execute(id_sucursal)
  }
  async listRent(id_sucursal:number,limit:number,page:number):Promise<ApiResponseRent|ErrorResponse>{
    return await this.dashboardUseCases.listRent.execute(id_sucursal,limit,page)
  }
  async listRentEntrega(id_sucursal:number,limit:number,page:number):Promise<ApiResponseRent|ErrorResponse>{
    return await this.dashboardUseCases.listRentEntrega.execute(id_sucursal,limit,page)
  }
  async getDetailRent(idContrato:number):Promise<ResponseRentDetail|ErrorResponse>{
    return await this.dashboardUseCases.getDetailRent.execute(idContrato)
  }
}
