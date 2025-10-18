import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { InfEvaluationPsychological, InfPsychologicalResponse } from "../../../domain/models/InfEvaluationPsychological";
import { InfPsychologicalUseCases } from "../../../domain/useCases/evaluation/inf-psychological/InfPsychologicalUseCases";

export class InfPsychologicalViewModel {
  private infPsychologicalUseCases: InfPsychologicalUseCases;
  constructor({infPsychologicalUseCases}:{infPsychologicalUseCases:InfPsychologicalUseCases}){
    this.infPsychologicalUseCases = infPsychologicalUseCases
  }
  async create(data:InfEvaluationPsychological):Promise<InfPsychologicalResponse|ErrorResponse>{
    return await this.infPsychologicalUseCases.create.execute(data)
  }
  async update(data:InfEvaluationPsychological):Promise<InfPsychologicalResponse|ErrorResponse>{
    return await this.infPsychologicalUseCases.update.execute(data)
  }
  
  async activate(id:number):Promise<InfPsychologicalResponse|ErrorResponse>{
    return await this.infPsychologicalUseCases.activate.execute(id)
  }
  async search(q:string):Promise<InfPsychologicalResponse|ErrorResponse>{
    return await this.infPsychologicalUseCases.search.execute(q)
  }
  async findIdentity(id:number):Promise<InfPsychologicalResponse|ErrorResponse>{
    return await this.infPsychologicalUseCases.findIdentity.execute(id)
  }
}