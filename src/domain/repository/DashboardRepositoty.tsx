
import { ApiResponseRent, IngresosDiarios, ResponseRentDetail, TotalInventario } from "../models/DashboardModel";
import { ErrorResponse } from "../models/ErrorResponse";
export interface DashboardRepository{ 
  getIngresosDiarios(id_sucursal:number):Promise<IngresosDiarios[]|ErrorResponse>;
  getTotalesInventario(id_sucursal:number):Promise<TotalInventario[]|ErrorResponse>;
  listRent(id_sucursal:number,limit:number,page:number):Promise<ApiResponseRent|ErrorResponse>;
  listRentEntrega(id_sucursal:number,limit:number,page:number):Promise<ApiResponseRent|ErrorResponse>;
  getDetailRent(idContrato:number):Promise<ResponseRentDetail|ErrorResponse>;
}