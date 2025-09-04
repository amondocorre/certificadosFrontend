import { ErrorResponse } from "../../models/ErrorResponse";
import { CajaResponse } from "../../models/CajaModel";

export interface CajaRepository{ 
  findActive(id_sucursal:number):Promise<CajaResponse|ErrorResponse>;
  findAll():Promise<CajaResponse|ErrorResponse>;
  create(monto:number,id_sucursal:number):Promise<CajaResponse|ErrorResponse>;
  update(id:number,monto:number,id_sucursal:number):Promise<CajaResponse|ErrorResponse>;
  delete(id:number):Promise<CajaResponse|ErrorResponse>;
  activate(id:number):Promise<CajaResponse|ErrorResponse>;
}