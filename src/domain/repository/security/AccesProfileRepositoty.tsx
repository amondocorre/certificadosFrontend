
import { AccesUserResponse } from "../../models/AccesModel";
import { ErrorResponse } from "../../models/ErrorResponse";
export interface AccesProfileRepository{ 
  findByProfile(idProfile:string):Promise<AccesUserResponse|ErrorResponse>;
  update(idAcces:number,idProfile:string,estado:number,buttons:String[]):Promise<AccesUserResponse|ErrorResponse>;
}