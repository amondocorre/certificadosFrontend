import { PrintAperturaTurnoUseCase } from "./PrintAperturaTurno";
import { PrintCierreTurnoUseCase } from "./PrintCierreTurno";
import { PrintEvaMedicalUseCase } from "./printEvaMedical";
import { PrintEvaPsychologicalUseCase } from "./printEvaPsychological";
import { PrintMovimientoCajaUseCase } from "./PrintMovimientoCajaUseCase";


export class PrintUseCases{
  printMovimientoCaja :PrintMovimientoCajaUseCase;
  printAperturaTurno:PrintAperturaTurnoUseCase;
  printCierreTurno:PrintCierreTurnoUseCase
  printEvaMedical:PrintEvaMedicalUseCase
  printEvaPsychological:PrintEvaPsychologicalUseCase
  
  constructor({
      printMovimientoCaja,
      printAperturaTurno,
      printCierreTurno,
      printEvaMedical,
      printEvaPsychological,
    }:{
      printMovimientoCaja:PrintMovimientoCajaUseCase
      printAperturaTurno:PrintAperturaTurnoUseCase
      printCierreTurno:PrintCierreTurnoUseCase
      printEvaMedical:PrintEvaMedicalUseCase
      printEvaPsychological:PrintEvaPsychologicalUseCase
    }){
    this.printMovimientoCaja = printMovimientoCaja;
    this.printAperturaTurno = printAperturaTurno;
    this.printCierreTurno = printCierreTurno;
    this.printEvaMedical = printEvaMedical
    this.printEvaPsychological = printEvaPsychological
  }
}