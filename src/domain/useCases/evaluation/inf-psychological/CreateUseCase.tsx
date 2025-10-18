
import { ErrorResponse } from "../../../models/ErrorResponse";
import { InfEvaluationPsychological, InfPsychologicalResponse } from "../../../models/InfEvaluationPsychological";
import { InfPsychologicalRepository } from "../../../repository/evaluation/InfPsychologicalRepositoty";

export class CreateUseCase {
  private infPsychologicalRepository: InfPsychologicalRepository;
  constructor({infPsychologicalRepository}:{infPsychologicalRepository:InfPsychologicalRepository}){
    this.infPsychologicalRepository = infPsychologicalRepository; 
  }
  async execute(data:InfEvaluationPsychological):Promise<InfPsychologicalResponse|ErrorResponse>{
    return await this.infPsychologicalRepository.create(data);
  }
}