
import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { EvaluationPsychological, PsychologicalResponse } from "../../../domain/models/EvaluationPsychological";
import { PsychologicalRepository } from "../../../domain/repository/evaluation/PsychologicalRepositoty";
import { PsychologicalService } from "../../sources/remote/services/evaluation/PsychologicalService";
export class PsychologicalRepositoryImpl implements PsychologicalRepository{
  private psychologicalService:PsychologicalService;
  constructor(
    {
      psychologicalService,
    }:{
      psychologicalService:PsychologicalService
    }){
    this.psychologicalService = psychologicalService;
  }

  async create(data:EvaluationPsychological): Promise<PsychologicalResponse | ErrorResponse> {
    return await this.psychologicalService.create(data);
  }
  async update(data:EvaluationPsychological): Promise<PsychologicalResponse | ErrorResponse> {
    return await this.psychologicalService.update(data);
  }
  async search(q:string): Promise<PsychologicalResponse | ErrorResponse> {
    return await this.psychologicalService.search(q);
  }
  async findIdentity(id:number): Promise<PsychologicalResponse | ErrorResponse> {
    return await this.psychologicalService.findIdentity(id);
  }
}