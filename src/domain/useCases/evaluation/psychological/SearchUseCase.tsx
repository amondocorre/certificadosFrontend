
import { ErrorResponse } from "../../../models/ErrorResponse";
import { PsychologicalResponse } from "../../../models/EvaluationPsychological";
import { PsychologicalRepository } from "../../../repository/evaluation/PsychologicalRepositoty";

export class SearchUseCase {
  private psychologicalRepository: PsychologicalRepository;
  constructor({psychologicalRepository}:{psychologicalRepository:PsychologicalRepository}){
    this.psychologicalRepository = psychologicalRepository; 
  }
  async execute(q:string):Promise<PsychologicalResponse|ErrorResponse>{
    return await this.psychologicalRepository.search(q);
  }
}