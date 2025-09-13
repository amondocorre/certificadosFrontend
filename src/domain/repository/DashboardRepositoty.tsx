
import { ApiResponseRent, IngresosDiarios} from "../models/DashboardModel";
import { ErrorResponse } from "../models/ErrorResponse";
export interface DashboardRepository{ 
  getIngresosDiarios(id_sucursal:number):Promise<IngresosDiarios[]|ErrorResponse>;
  listEvaMedical(id_sucursal:number,limit:number,page:number):Promise<ApiResponseRent|ErrorResponse>;
  listEvaPsychological(id_sucursal:number,limit:number,page:number):Promise<ApiResponseRent|ErrorResponse>;
}