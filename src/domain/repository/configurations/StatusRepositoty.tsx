import { ErrorResponse } from "../../models/ErrorResponse";
import { Status, StatusResponse } from "../../models/StatusModel";

export interface StatusRepository{ 
  findActive():Promise<StatusResponse|ErrorResponse>;
  findAll():Promise<StatusResponse|ErrorResponse>;
  create(status:Status):Promise<StatusResponse|ErrorResponse>;
  update(id:number,status:Status):Promise<StatusResponse|ErrorResponse>;
  delete(id:number):Promise<StatusResponse|ErrorResponse>;
  activate(id:number):Promise<StatusResponse|ErrorResponse>;
}