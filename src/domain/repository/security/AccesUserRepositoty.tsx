
import { AccesUserResponse } from "../../models/AccesModel";
import { ErrorResponse } from "../../models/ErrorResponse";
export interface AccesUserRepository{ 
  findByUser(id:number):Promise<AccesUserResponse|ErrorResponse>;
  update(idAcces:number,idUser:number,estado:number,buttons:String[]):Promise<AccesUserResponse|ErrorResponse>;
  /*findAll():Promise<AccesUserResponse|ErrorResponse>;
  create(button:Button):Promise<AccesUserResponse|ErrorResponse>;
  delete(id:string):Promise<AccesUserResponse|ErrorResponse>;*/
}