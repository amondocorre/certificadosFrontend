import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { EvaluationMedical, MedicalResponse } from "../../../domain/models/EvaluationMedical";
import { MedicalUseCases } from "../../../domain/useCases/evaluation/medical/MedicalUseCases";

export class MedicalViewModel {
  private medicalUseCases: MedicalUseCases;
  constructor({medicalUseCases}:{medicalUseCases:MedicalUseCases}){
    this.medicalUseCases = medicalUseCases
  }
  async create(data:EvaluationMedical):Promise<MedicalResponse|ErrorResponse>{
    return await this.medicalUseCases.create.execute(data)
  }
  async update(data:EvaluationMedical):Promise<MedicalResponse|ErrorResponse>{
    return await this.medicalUseCases.update.execute(data)
  }
  async search(q:string):Promise<MedicalResponse|ErrorResponse>{
    return await this.medicalUseCases.search.execute(q)
  }
}