import { GetIngresosDiariosUseCase } from "./GetIngresosDiariosUseCase";
import { GetTotalEvaluationsUseCase } from "./GetTotalEvaluationsUseCase";
import { ListEvaMedicalUseCase } from "./ListEvaMedicalUseCase";
import { ListEvaPsychologicalUseCase } from "./ListEvaPsychologicalUseCase";

export class DashboardUseCases{
getIngresosDiarios:GetIngresosDiariosUseCase;
listEvaMedical:ListEvaMedicalUseCase;
listEvaPsychological:ListEvaPsychologicalUseCase
getTotalEvaluations:GetTotalEvaluationsUseCase
  constructor({
    getIngresosDiarios,
    listEvaMedical,
    listEvaPsychological,
    getTotalEvaluations,
  }:{
    getIngresosDiarios:GetIngresosDiariosUseCase,
    listEvaMedical:ListEvaMedicalUseCase,
    listEvaPsychological:ListEvaPsychologicalUseCase,
    getTotalEvaluations:GetTotalEvaluationsUseCase

  }){
  this.getIngresosDiarios = getIngresosDiarios;
  this.listEvaMedical = listEvaMedical;
  this.listEvaPsychological = listEvaPsychological;
  this.getTotalEvaluations = getTotalEvaluations
  }
}