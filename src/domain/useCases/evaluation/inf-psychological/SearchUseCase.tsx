
import { ErrorResponse } from "../../../models/ErrorResponse";
import { InfPsychologicalResponse } from "../../../models/InfEvaluationPsychological";
import { InfPsychologicalRepository } from "../../../repository/evaluation/InfPsychologicalRepositoty";

export class SearchUseCase {
  private infPsychologicalRepository: InfPsychologicalRepository;
  constructor({infPsychologicalRepository}:{infPsychologicalRepository:InfPsychologicalRepository}){
    this.infPsychologicalRepository = infPsychologicalRepository; 
  }
  async execute(q:string):Promise<InfPsychologicalResponse|ErrorResponse>{
    return await this.infPsychologicalRepository.search(q);
  }
}