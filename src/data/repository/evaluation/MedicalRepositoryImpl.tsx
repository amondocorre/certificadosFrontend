
import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { EvaluationMedical, MedicalResponse } from "../../../domain/models/EvaluationMedical";
import { MedicalRepository } from "../../../domain/repository/evaluation/MedicalRepositoty";
import { MedicalService } from "../../sources/remote/services/evaluation/MedicalService";
export class MedicalRepositoryImpl implements MedicalRepository{
  private medicalService:MedicalService;
  constructor(
    {
      medicalService,
    }:{
      medicalService:MedicalService
    }){
    this.medicalService = medicalService;
  }

  async create(data:EvaluationMedical): Promise<MedicalResponse | ErrorResponse> {
    return await this.medicalService.create(data);
  }
  async update(data:EvaluationMedical): Promise<MedicalResponse | ErrorResponse> {
    return await this.medicalService.update(data);
  }
  async search(q:string): Promise<MedicalResponse | ErrorResponse> {
    return await this.medicalService.search(q);
  }
}