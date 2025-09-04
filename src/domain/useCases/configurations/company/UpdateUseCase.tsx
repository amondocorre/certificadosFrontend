import { ErrorResponse } from "../../../models/ErrorResponse";
import { Company, CompanyResponse } from "../../../models/CompanyModel";
import { CompanyRepository } from "../../../repository/configurations/CompanyRepositoty";

export class UpdateUseCase {
  private companyRepository: CompanyRepository;
  constructor({companyRepository}:{companyRepository:CompanyRepository}){
    this.companyRepository = companyRepository; 
  }
  async execute(id:number,company:Company):Promise<CompanyResponse|ErrorResponse>{
    return await this.companyRepository.update(id,company);
  }
}