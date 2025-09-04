import { ButtonsResponse } from "../models/ButtonModel";
import { ErrorResponse } from "../models/ErrorResponse";
import { DataChangePassword, User, userResponse } from "../models/User";

export interface UserRepository{
  getAllUsers():Promise<userResponse|ErrorResponse>
  findActive():Promise<userResponse|ErrorResponse>
  getButtunsAccess(idAcces:number):Promise<ButtonsResponse|ErrorResponse>
  update(user:User,id_usuario:number):Promise<userResponse|ErrorResponse>
  create(user:User):Promise<userResponse|ErrorResponse>
  delete(id_usuario:number):Promise<userResponse|ErrorResponse>
  activate(id_usuario:number):Promise<userResponse|ErrorResponse>
  resetPassword(id_usuario:number):Promise<userResponse|ErrorResponse>
  changePassword(data:DataChangePassword):Promise<userResponse|ErrorResponse>
}