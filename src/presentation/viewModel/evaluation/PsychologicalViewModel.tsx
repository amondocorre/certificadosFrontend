import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { EvaluationPsychological, PsychologicalResponse } from "../../../domain/models/EvaluationPsychological";
import { PsychologicalUseCases } from "../../../domain/useCases/evaluation/psychological/PsychologicalUseCases";

export class PsychologicalViewModel {
  private psychologicalUseCases: PsychologicalUseCases;
  constructor({psychologicalUseCases}:{psychologicalUseCases:PsychologicalUseCases}){
    this.psychologicalUseCases = psychologicalUseCases
  }
  async create(data:EvaluationPsychological):Promise<PsychologicalResponse|ErrorResponse>{
    return await this.psychologicalUseCases.create.execute(data)
  }
  async update(data:EvaluationPsychological):Promise<PsychologicalResponse|ErrorResponse>{
    return await this.psychologicalUseCases.update.execute(data)
  }
  async search(q:string):Promise<PsychologicalResponse|ErrorResponse>{
    return await this.psychologicalUseCases.search.execute(q)
  }
}