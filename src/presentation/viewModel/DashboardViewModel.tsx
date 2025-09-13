
import { ApiResponseRent, IngresosDiarios} from '../../domain/models/DashboardModel';
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
  async listEvaMedical(id_sucursal:number,limit:number,page:number):Promise<ApiResponseRent|ErrorResponse>{
    return await this.dashboardUseCases.listEvaMedical.execute(id_sucursal,limit,page)
  }
  async listEvaPsychological(id_sucursal:number,limit:number,page:number):Promise<ApiResponseRent|ErrorResponse>{
    return await this.dashboardUseCases.listEvaPsychological.execute(id_sucursal,limit,page)
  }
}
