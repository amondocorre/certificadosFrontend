
import { ErrorResponse } from "../../models/ErrorResponse";
import { EvaluationPsychological, PsychologicalResponse } from "../../models/EvaluationPsychological";
export interface PsychologicalRepository{ 
  create(data:EvaluationPsychological):Promise<PsychologicalResponse|ErrorResponse>;
  update(data:EvaluationPsychological):Promise<PsychologicalResponse|ErrorResponse>;
  search(q:string):Promise<PsychologicalResponse|ErrorResponse>;
}