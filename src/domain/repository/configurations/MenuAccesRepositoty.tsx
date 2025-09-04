
import { MenuItem, MenuResponse } from "../../models/AccesModel";
import { ErrorResponse } from "../../models/ErrorResponse";
export interface MenuAccesRepository{ 
  findActive():Promise<MenuResponse|ErrorResponse>;
  findAll():Promise<MenuResponse|ErrorResponse>;
  create(acces:MenuItem):Promise<MenuResponse|ErrorResponse>;
  update(id:string,acces:MenuItem):Promise<MenuResponse|ErrorResponse>;
  delete(id:string):Promise<MenuResponse|ErrorResponse>;
  activate(id:string):Promise<MenuResponse|ErrorResponse>;
}