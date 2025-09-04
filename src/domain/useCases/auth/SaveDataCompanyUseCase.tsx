import { Company } from "../../models/CompanyModel";
import { AuthRepository } from "../../repository/AuthRepository";

export class SaveDataCompanyUseCase {
  private authRepository: AuthRepository;
  constructor({authRepository}:{authRepository:AuthRepository}){
    this.authRepository = authRepository; 
  }
  async execute(company:Company):Promise<void>{
    await this.authRepository.saveDataCompany(company);
  }
}