import { ErrorResponse } from "../../models/ErrorResponse";
import { Combo, ComboResponse } from "../../models/ComboModel";

export interface ComboRepository{ 
  findActive():Promise<ComboResponse|ErrorResponse>;
  findAll():Promise<ComboResponse|ErrorResponse>;
  create(combo:Combo):Promise<ComboResponse|ErrorResponse>;
  update(id:number,combo:Combo):Promise<ComboResponse|ErrorResponse>;
  delete(id:number):Promise<ComboResponse|ErrorResponse>;
  activate(id:number):Promise<ComboResponse|ErrorResponse>;
}