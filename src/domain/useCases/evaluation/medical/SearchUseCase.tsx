
import { ErrorResponse } from "../../../models/ErrorResponse";
import { MedicalResponse } from "../../../models/EvaluationMedical";
import { MedicalRepository } from "../../../repository/evaluation/MedicalRepositoty";

export class SearchUseCase {
  private medicalRepository: MedicalRepository;
  constructor({medicalRepository}:{medicalRepository:MedicalRepository}){
    this.medicalRepository = medicalRepository; 
  }
  async execute(q:string):Promise<MedicalResponse|ErrorResponse>{
    return await this.medicalRepository.search(q);
  }
}