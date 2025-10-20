import { GetIngresosDiariosUseCase } from "./GetIngresosDiariosUseCase";
import { GetTotalEvaluationsUseCase } from "./GetTotalEvaluationsUseCase";
import { ListEvaMedicalUseCase } from "./ListEvaMedicalUseCase";
import { ListEvaPsychologicalUseCase } from "./ListEvaPsychologicalUseCase";
import { ListInfEvaPsychologicalUseCase } from "./ListInfEvaPsychologicalUseCase";

export class DashboardUseCases{
getIngresosDiarios:GetIngresosDiariosUseCase;
listEvaMedical:ListEvaMedicalUseCase;
listEvaPsychological:ListEvaPsychologicalUseCase
getTotalEvaluations:GetTotalEvaluationsUseCase
listInfEvaPsychological:ListInfEvaPsychologicalUseCase
  constructor({
    getIngresosDiarios,
    listEvaMedical,
    listEvaPsychological,
    getTotalEvaluations,
    listInfEvaPsychological,
  }:{
    getIngresosDiarios:GetIngresosDiariosUseCase,
    listEvaMedical:ListEvaMedicalUseCase,
    listEvaPsychological:ListEvaPsychologicalUseCase,
    getTotalEvaluations:GetTotalEvaluationsUseCase,
    listInfEvaPsychological:ListInfEvaPsychologicalUseCase,
  }){
  this.getIngresosDiarios = getIngresosDiarios;
  this.listEvaMedical = listEvaMedical;
  this.listEvaPsychological = listEvaPsychological;
  this.getTotalEvaluations = getTotalEvaluations;
  this.listInfEvaPsychological = listInfEvaPsychological;
  }
}