import { GetIngresosDiariosUseCase } from "./GetIngresosDiariosUseCase";
import { ListEvaMedicalUseCase } from "./ListEvaMedicalUseCase";
import { ListEvaPsychologicalUseCase } from "./listEvaPsychologicalUseCase";

export class DashboardUseCases{
getIngresosDiarios:GetIngresosDiariosUseCase;
listEvaMedical:ListEvaMedicalUseCase;
listEvaPsychological:ListEvaPsychologicalUseCase
  constructor({
    getIngresosDiarios,
    listEvaMedical,
    listEvaPsychological,
  }:{
    getIngresosDiarios:GetIngresosDiariosUseCase,
    listEvaMedical:ListEvaMedicalUseCase,
    listEvaPsychological:ListEvaPsychologicalUseCase,

  }){
  this.getIngresosDiarios = getIngresosDiarios;
  this.listEvaMedical = listEvaMedical;
  this.listEvaPsychological = listEvaPsychological;
  }
}