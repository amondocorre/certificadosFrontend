
import { ErrorResponse } from "../../../models/ErrorResponse";
import { EvaluationMedical, MedicalResponse } from "../../../models/EvaluationMedical";
import { MedicalRepository } from "../../../repository/evaluation/MedicalRepositoty";

export class UpdateUseCase {
  private medicalRepository: MedicalRepository;
  constructor({medicalRepository}:{medicalRepository:MedicalRepository}){
    this.medicalRepository = medicalRepository; 
  }
  async execute(data:EvaluationMedical):Promise<MedicalResponse|ErrorResponse>{
    return await this.medicalRepository.update(data);
  }
}