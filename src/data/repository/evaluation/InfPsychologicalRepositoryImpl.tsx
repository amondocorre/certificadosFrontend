
import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { InfEvaluationPsychological, InfPsychologicalResponse } from "../../../domain/models/InfEvaluationPsychological";
import { InfPsychologicalRepository } from "../../../domain/repository/evaluation/InfPsychologicalRepositoty";
import { InfPsychologicalService } from "../../sources/remote/services/evaluation/InfPsychologicalService";
export class InfPsychologicalRepositoryImpl implements InfPsychologicalRepository{
  private infPsychologicalService:InfPsychologicalService;
  constructor(
    {
      infPsychologicalService,
    }:{
      infPsychologicalService:InfPsychologicalService
    }){
    this.infPsychologicalService = infPsychologicalService;
  }

  async create(data:InfEvaluationPsychological): Promise<InfPsychologicalResponse | ErrorResponse> {
    return await this.infPsychologicalService.create(data);
  }
  async update(data:InfEvaluationPsychological): Promise<InfPsychologicalResponse | ErrorResponse> {
    return await this.infPsychologicalService.update(data);
  }
  async activate(id:number): Promise<InfPsychologicalResponse | ErrorResponse> {
    return await this.infPsychologicalService.activate(id);
  }
  async search(q:string): Promise<InfPsychologicalResponse | ErrorResponse> {
    return await this.infPsychologicalService.search(q);
  }
  async findIdentity(id:number): Promise<InfPsychologicalResponse | ErrorResponse> {
    return await this.infPsychologicalService.findIdentity(id);
  }
}