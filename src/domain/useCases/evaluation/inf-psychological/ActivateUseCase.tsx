
import { ErrorResponse } from "../../../models/ErrorResponse";
import { InfPsychologicalResponse } from "../../../models/InfEvaluationPsychological";
import { InfPsychologicalRepository } from "../../../repository/evaluation/InfPsychologicalRepositoty";

export class ActivateUseCase {
  private infPsychologicalRepository: InfPsychologicalRepository;
  constructor({infPsychologicalRepository}:{infPsychologicalRepository:InfPsychologicalRepository}){
    this.infPsychologicalRepository = infPsychologicalRepository; 
  }
  async execute(id:number):Promise<InfPsychologicalResponse|ErrorResponse>{
    return await this.infPsychologicalRepository.activate(id);
  }
}