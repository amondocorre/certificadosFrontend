
import { ErrorResponse } from "../../../models/ErrorResponse";
import { MedicalResponse } from "../../../models/EvaluationMedical";
import { MedicalRepository } from "../../../repository/evaluation/MedicalRepositoty";

export class ActivateUseCase {
  private medicalRepository: MedicalRepository;
  constructor({medicalRepository}:{medicalRepository:MedicalRepository}){
    this.medicalRepository = medicalRepository; 
  }
  async execute(id:number):Promise<MedicalResponse|ErrorResponse>{
    return await this.medicalRepository.activate(id);
  }
}