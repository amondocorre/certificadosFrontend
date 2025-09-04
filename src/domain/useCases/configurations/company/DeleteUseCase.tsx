import { ErrorResponse } from "../../../models/ErrorResponse";
import { CompanyResponse } from "../../../models/CompanyModel";
import { CompanyRepository } from "../../../repository/configurations/CompanyRepositoty";

export class DeleteUseCase {
  private companyRepository: CompanyRepository;
  constructor({companyRepository}:{companyRepository:CompanyRepository}){
    this.companyRepository = companyRepository; 
  }
  async execute(id:number):Promise<CompanyResponse|ErrorResponse>{
    return await this.companyRepository.delete(id);
  }
}