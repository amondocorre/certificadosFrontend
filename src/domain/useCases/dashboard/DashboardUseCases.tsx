import { GetIngresosDiariosUseCase } from "./GetIngresosDiariosUseCase";
import { GetTotalEvaluationsUseCase } from "./GetTotalEvaluationsUseCase";
import { GetTotalEvaByDoctorUseCase } from "./GetTotalEvaByDoctorUseCase";

import { ListEvaMedicalUseCase } from "./ListEvaMedicalUseCase";
import { ListEvaPsychologicalUseCase } from "./ListEvaPsychologicalUseCase";
import { ListInfEvaPsychologicalUseCase } from "./ListInfEvaPsychologicalUseCase";

export class DashboardUseCases{
  getIngresosDiarios:GetIngresosDiariosUseCase;
  listEvaMedical:ListEvaMedicalUseCase;
  listEvaPsychological:ListEvaPsychologicalUseCase
  getTotalEvaluations:GetTotalEvaluationsUseCase
  listInfEvaPsychological:ListInfEvaPsychologicalUseCase
  getTotalEvaByDoctor:GetTotalEvaByDoctorUseCase

  constructor({
    getIngresosDiarios,
    listEvaMedical,
    listEvaPsychological,
    getTotalEvaluations,
    listInfEvaPsychological,
    getTotalEvaByDoctor,
  }:{
    getIngresosDiarios:GetIngresosDiariosUseCase,
    listEvaMedical:ListEvaMedicalUseCase,
    listEvaPsychological:ListEvaPsychologicalUseCase,
    getTotalEvaluations:GetTotalEvaluationsUseCase,
    listInfEvaPsychological:ListInfEvaPsychologicalUseCase,
    getTotalEvaByDoctor:GetTotalEvaByDoctorUseCase,
  }){
    this.getIngresosDiarios = getIngresosDiarios;
    this.listEvaMedical = listEvaMedical;
    this.listEvaPsychological = listEvaPsychological;
    this.getTotalEvaluations = getTotalEvaluations;
    this.listInfEvaPsychological = listInfEvaPsychological;
    this.getTotalEvaByDoctor = getTotalEvaByDoctor;
  }
}