import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { Company, CompanyResponse } from "../../../domain/models/CompanyModel";
import { CompanyUseCases } from "../../../domain/useCases/configurations/company/CompanyUseCases";

export class CompanyViewModel {
  private companyUseCases: CompanyUseCases;
  constructor({companyUseCases}:{companyUseCases:CompanyUseCases}){
    this.companyUseCases = companyUseCases
  }
  async findAll():Promise<CompanyResponse|ErrorResponse>{
    return await this.companyUseCases.findAll.execute()
  }
  async findActive():Promise<CompanyResponse|ErrorResponse>{
    return await this.companyUseCases.findActive.execute()
  }
  async create(Company:Company):Promise<CompanyResponse|ErrorResponse>{
    return await this.companyUseCases.create.execute(Company)
  }
  async update(id:number,Company:Company):Promise<CompanyResponse|ErrorResponse>{
    return await this.companyUseCases.update.execute(id,Company)
  }
  async delete(id:number):Promise<CompanyResponse|ErrorResponse>{
    return await this.companyUseCases.deleteUseCase.execute(id)
  }
  async activate(id:number):Promise<CompanyResponse|ErrorResponse>{
    return await this.companyUseCases.activate.execute(id)
  }
}