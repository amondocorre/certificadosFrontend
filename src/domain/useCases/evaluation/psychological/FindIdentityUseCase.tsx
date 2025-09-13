
import { ErrorResponse } from "../../../models/ErrorResponse";
import { PsychologicalResponse } from "../../../models/EvaluationPsychological";
import { PsychologicalRepository } from "../../../repository/evaluation/PsychologicalRepositoty";

export class findIdentityUseCase {
  private psychologicalRepository: PsychologicalRepository;
  constructor({psychologicalRepository}:{psychologicalRepository:PsychologicalRepository}){
    this.psychologicalRepository = psychologicalRepository; 
  }
  async execute(id:number):Promise<PsychologicalResponse|ErrorResponse>{
    return await this.psychologicalRepository.findIdentity(id);
  }
}