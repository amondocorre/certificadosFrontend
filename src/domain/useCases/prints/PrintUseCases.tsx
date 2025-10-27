import { PrintAperturaTurnoUseCase } from "./PrintAperturaTurno";
import { PrintCierreTurnoUseCase } from "./PrintCierreTurno";
import { PrintEvaMedicalUseCase } from "./printEvaMedical";
import { PrintEvaPsychologicalUseCase } from "./printEvaPsychological";
import { PrintInfEvaPsychologicalUseCase } from "./printInfEvaPsychological";
import { PrintMovimientoCajaUseCase } from "./PrintMovimientoCajaUseCase";


export class PrintUseCases{
  printMovimientoCaja :PrintMovimientoCajaUseCase;
  printAperturaTurno:PrintAperturaTurnoUseCase;
  printCierreTurno:PrintCierreTurnoUseCase
  printEvaMedical:PrintEvaMedicalUseCase
  printEvaPsychological:PrintEvaPsychologicalUseCase
  printInfEvaPsychological:PrintInfEvaPsychologicalUseCase
  
  constructor({
      printMovimientoCaja,
      printAperturaTurno,
      printCierreTurno,
      printEvaMedical,
      printEvaPsychological,
      printInfEvaPsychological,
    }:{
      printMovimientoCaja:PrintMovimientoCajaUseCase
      printAperturaTurno:PrintAperturaTurnoUseCase
      printCierreTurno:PrintCierreTurnoUseCase
      printEvaMedical:PrintEvaMedicalUseCase
      printEvaPsychological:PrintEvaPsychologicalUseCase
      printInfEvaPsychological:PrintInfEvaPsychologicalUseCase
    }){
    this.printMovimientoCaja = printMovimientoCaja;
    this.printAperturaTurno = printAperturaTurno;
    this.printCierreTurno = printCierreTurno;
    this.printEvaMedical = printEvaMedical
    this.printEvaPsychological = printEvaPsychological
    this.printInfEvaPsychological = printInfEvaPsychological
  }
}