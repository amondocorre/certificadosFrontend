import { ErrorResponse } from "../../models/ErrorResponse";
import { Supplier, SupplierResponse } from "../../models/SupplierModel";

export interface SupplierRepository{ 
  findActive():Promise<SupplierResponse|ErrorResponse>;
  findAll():Promise<SupplierResponse|ErrorResponse>;
  create(supplier:Supplier):Promise<SupplierResponse|ErrorResponse>;
  update(id:number,supplier:Supplier):Promise<SupplierResponse|ErrorResponse>;
  delete(id:number):Promise<SupplierResponse|ErrorResponse>;
  activate(id:number):Promise<SupplierResponse|ErrorResponse>;
}