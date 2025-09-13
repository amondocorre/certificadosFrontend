
import { ErrorResponse } from "../../../models/ErrorResponse";
import { EvaluationPsychological, PsychologicalResponse } from "../../../models/EvaluationPsychological";
import { PsychologicalRepository } from "../../../repository/evaluation/PsychologicalRepositoty";

export class CreateUseCase {
  private psychologicalRepository: PsychologicalRepository;
  constructor({psychologicalRepository}:{psychologicalRepository:PsychologicalRepository}){
    this.psychologicalRepository = psychologicalRepository; 
  }
  async execute(data:EvaluationPsychological):Promise<PsychologicalResponse|ErrorResponse>{
    return await this.psychologicalRepository.create(data);
  }
}