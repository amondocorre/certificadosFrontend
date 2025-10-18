
import { ErrorResponse } from "../../models/ErrorResponse";
import { InfEvaluationPsychological, InfPsychologicalResponse } from "../../models/InfEvaluationPsychological";
export interface InfPsychologicalRepository{ 
  create(data:InfEvaluationPsychological):Promise<InfPsychologicalResponse|ErrorResponse>;
  update(data:InfEvaluationPsychological):Promise<InfPsychologicalResponse|ErrorResponse>;
  activate(id:number):Promise<InfPsychologicalResponse|ErrorResponse>;
  search(q:string):Promise<InfPsychologicalResponse|ErrorResponse>;
  findIdentity(id:number):Promise<InfPsychologicalResponse|ErrorResponse>;
}