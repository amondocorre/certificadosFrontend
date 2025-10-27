
import { ApiResponse, IngresosDiarios, ResponseEvaluations} from "../models/DashboardModel";
import { ErrorResponse } from "../models/ErrorResponse";
export interface DashboardRepository{ 
  getIngresosDiarios(id_sucursal:number):Promise<IngresosDiarios[]|ErrorResponse>;
  listEvaMedical(id_sucursal:number,limit:number,page:number):Promise<ApiResponse|ErrorResponse>;
  listEvaPsychological(id_sucursal:number,limit:number,page:number):Promise<ApiResponse|ErrorResponse>;
  listInfEvaPsychological(id_sucursal:number,limit:number,page:number):Promise<ApiResponse|ErrorResponse>;
  getTotalEvaluations(id_sucursal:number):Promise<ResponseEvaluations|ErrorResponse>;
}