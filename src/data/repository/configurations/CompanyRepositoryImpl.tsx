import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { Company, CompanyResponse } from "../../../domain/models/CompanyModel";
import { CompanyRepository } from "../../../domain/repository/configurations/CompanyRepositoty";
import { CompanyService } from "../../sources/remote/services/configurations/CompanyService";
export class CompanyRepositoryImpl implements CompanyRepository{
  private companyService:CompanyService;
  constructor(
    {
      companyService,
    }:{
      companyService:CompanyService
    }){
    this.companyService = companyService;
  }
  async create(company: Company): Promise<CompanyResponse | ErrorResponse> {
    return await this.companyService.create(company);
  }
  async update(id:number,company: Company): Promise<CompanyResponse | ErrorResponse> {
    return await this.companyService.update(id,company);
  }
  async delete(id: number): Promise<CompanyResponse | ErrorResponse> {
    return await this.companyService.delete(id);
  }
  async activate(id: number): Promise<CompanyResponse | ErrorResponse> {
    return await this.companyService.activate(id);
  }
  async findAll(): Promise<CompanyResponse | ErrorResponse> {
    return await this.companyService.findAll();
  }
  async findActive(): Promise<CompanyResponse | ErrorResponse> {
    return await this.companyService.findActive();
  }
}