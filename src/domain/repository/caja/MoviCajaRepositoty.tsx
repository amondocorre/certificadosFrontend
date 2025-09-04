import { ErrorResponse } from "../../models/ErrorResponse";
import { MoviCajaFilter, MoviCajaResponse } from "../../models/MoviCajaModel";
import { MoviCaja } from "../../models/MoviCajaModel";

export interface MoviCajaRepository{ 
  findFilter(moviCajaFilter:MoviCajaFilter):Promise<MoviCajaResponse|ErrorResponse>;
  findAll():Promise<MoviCajaResponse|ErrorResponse>;
  create(moviCaja:MoviCaja):Promise<MoviCajaResponse|ErrorResponse>;
  update(id:number,moviCaja:MoviCaja):Promise<MoviCajaResponse|ErrorResponse>;
  delete(id:number):Promise<MoviCajaResponse|ErrorResponse>;
  activate(id:number):Promise<MoviCajaResponse|ErrorResponse>;
}