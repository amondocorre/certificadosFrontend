import { ErrorResponse } from "../../models/ErrorResponse";
import { Sucursal, SucursalResponse } from "../../models/SucursalModel";

export interface SucursalRepository{ 
  findActive():Promise<SucursalResponse|ErrorResponse>;
  findAll():Promise<SucursalResponse|ErrorResponse>;
  create(sucursal:Sucursal):Promise<SucursalResponse|ErrorResponse>;
  update(id:number,sucursal:Sucursal):Promise<SucursalResponse|ErrorResponse>;
  delete(id:number):Promise<SucursalResponse|ErrorResponse>;
  activate(id:number):Promise<SucursalResponse|ErrorResponse>;
}