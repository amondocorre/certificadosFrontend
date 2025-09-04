import { Company } from "../../models/CompanyModel";
import { AuthRepository } from "../../repository/AuthRepository";

export class GetDataCompanyUseCase {
  private authRepository: AuthRepository;
  constructor({authRepository}:{authRepository:AuthRepository}){
    this.authRepository = authRepository; 
  }
  async execute():Promise<Company>{
    return await this.authRepository.getDataCompany();
  }
}