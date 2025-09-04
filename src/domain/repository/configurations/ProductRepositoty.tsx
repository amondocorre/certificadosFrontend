import { ErrorResponse } from "../../models/ErrorResponse";
import { Product, ProductResponse } from "../../models/ProductModel";

export interface ProductRepository{ 
  findActive():Promise<ProductResponse|ErrorResponse>;
  findAll():Promise<ProductResponse|ErrorResponse>;
  create(product:Product):Promise<ProductResponse|ErrorResponse>;
  update(id:number,product:Product):Promise<ProductResponse|ErrorResponse>;
  delete(id:number):Promise<ProductResponse|ErrorResponse>;
  activate(id:number):Promise<ProductResponse|ErrorResponse>;
}