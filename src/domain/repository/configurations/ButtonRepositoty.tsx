
import { Button, ButtonsResponse } from "../../models/ButtonModel";
import { ErrorResponse } from "../../models/ErrorResponse";
export interface ButtonRepository{ 
  findActive():Promise<ButtonsResponse|ErrorResponse>;
  findAll():Promise<ButtonsResponse|ErrorResponse>;
  create(button:Button):Promise<ButtonsResponse|ErrorResponse>;
  update(id:string,button:Button):Promise<ButtonsResponse|ErrorResponse>;
  delete(id:string):Promise<ButtonsResponse|ErrorResponse>;
}