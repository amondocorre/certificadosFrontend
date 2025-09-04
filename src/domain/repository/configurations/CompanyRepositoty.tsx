import { ErrorResponse } from "../../models/ErrorResponse";
import { Company, CompanyResponse } from "../../models/CompanyModel";

export interface CompanyRepository{ 
  findActive():Promise<CompanyResponse|ErrorResponse>;
  findAll():Promise<CompanyResponse|ErrorResponse>;
  create(company:Company):Promise<CompanyResponse|ErrorResponse>;
  update(id:number,Company:Company):Promise<CompanyResponse|ErrorResponse>;
  delete(id:number):Promise<CompanyResponse|ErrorResponse>;
  activate(id:number):Promise<CompanyResponse|ErrorResponse>;
}