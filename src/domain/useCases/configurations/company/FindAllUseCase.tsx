import { ErrorResponse } from "../../../models/ErrorResponse";
import { CompanyResponse } from "../../../models/CompanyModel";
import { CompanyRepository } from "../../../repository/configurations/CompanyRepositoty";

export class FindAllUseCase {
  private companyRepository: CompanyRepository;
  constructor({companyRepository}:{companyRepository:CompanyRepository}){
    this.companyRepository = companyRepository; 
  }
  async execute():Promise<CompanyResponse|ErrorResponse>{
    return await this.companyRepository.findAll();
  }
}