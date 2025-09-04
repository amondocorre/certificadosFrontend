import { ErrorResponse } from "../../../models/ErrorResponse";
import { Company, CompanyResponse } from "../../../models/CompanyModel";
import { CompanyRepository } from "../../../repository/configurations/CompanyRepositoty";

export class CreateUseCase {
  private companyRepository: CompanyRepository;
  constructor({companyRepository}:{companyRepository:CompanyRepository}){
    this.companyRepository = companyRepository; 
  }
  async execute(company:Company):Promise<CompanyResponse|ErrorResponse>{
    return await this.companyRepository.create(company);
  }
}