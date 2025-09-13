import { PrintAperturaTurnoUseCase } from "./PrintAperturaTurno";
import { PrintCierreTurnoUseCase } from "./PrintCierreTurno";
import { PrintMovimientoCajaUseCase } from "./PrintMovimientoCajaUseCase";


export class PrintUseCases{
  printMovimientoCaja :PrintMovimientoCajaUseCase;
  printAperturaTurno:PrintAperturaTurnoUseCase;
  printCierreTurno:PrintCierreTurnoUseCase
  constructor({
      printMovimientoCaja,
      printAperturaTurno,
      printCierreTurno,
    }:{
      printMovimientoCaja:PrintMovimientoCajaUseCase
      printAperturaTurno:PrintAperturaTurnoUseCase
      printCierreTurno:PrintCierreTurnoUseCase
    }){
    this.printMovimientoCaja = printMovimientoCaja;
    this.printAperturaTurno = printAperturaTurno;
    this.printCierreTurno = printCierreTurno;
  }
}