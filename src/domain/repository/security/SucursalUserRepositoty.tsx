import { ErrorResponse } from "../../models/ErrorResponse";
import { SucursalUserResponse } from "../../models/SucursalModel";

export interface SucursalUserRepository{ 
  getSucursalesUser():Promise<SucursalUserResponse|ErrorResponse>
  findAll():Promise<SucursalUserResponse|ErrorResponse>
  addSucursales(id_usuario:number,sucursales:string[]):Promise<SucursalUserResponse|ErrorResponse>
}