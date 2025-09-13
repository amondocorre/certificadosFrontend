
import { ErrorResponse } from "../../models/ErrorResponse";
import { EvaluationMedical, MedicalResponse } from "../../models/EvaluationMedical";
export interface MedicalRepository{ 
  create(data:EvaluationMedical):Promise<MedicalResponse|ErrorResponse>;
  update(data:EvaluationMedical):Promise<MedicalResponse|ErrorResponse>;
  search(q:string):Promise<MedicalResponse|ErrorResponse>;
  findIdentity(id:number):Promise<MedicalResponse|ErrorResponse>;
}