import { PrintAperturaTurnoUseCase } from "./PrintAperturaTurno";
import { PrintCierreTurnoUseCase } from "./PrintCierreTurno";
import { PrintMovimientoCajaUseCase } from "./PrintMovimientoCajaUseCase";
import { PrintNotaVentaUseCase } from "./PrintNotaVenta";
import { PrintReciboPagoUseCase } from "./PrintReciboPago";
import { printReciboPagosRentUseCase } from "./printReciboPagosRent";
import { PrintRecibosPagosUseCase } from "./printRecibosPagos";


export class PrintUseCases{
  printMovimientoCaja :PrintMovimientoCajaUseCase;
  printAperturaTurno:PrintAperturaTurnoUseCase;
  printCierreTurno:PrintCierreTurnoUseCase
  printNotaVenta:PrintNotaVentaUseCase
  printReciboPago:PrintReciboPagoUseCase
  printReciboPagosRent:printReciboPagosRentUseCase
  printRecibosPagos:PrintRecibosPagosUseCase
  constructor({
      printMovimientoCaja,
      printAperturaTurno,
      printCierreTurno,
      printNotaVenta,
      printReciboPago,
      printReciboPagosRent,
      printRecibosPagos,
    }:{
      printMovimientoCaja:PrintMovimientoCajaUseCase
      printAperturaTurno:PrintAperturaTurnoUseCase
      printCierreTurno:PrintCierreTurnoUseCase
      printNotaVenta:PrintNotaVentaUseCase
      printReciboPago:PrintReciboPagoUseCase
      printReciboPagosRent:printReciboPagosRentUseCase
      printRecibosPagos:PrintRecibosPagosUseCase
    }){
    this.printMovimientoCaja = printMovimientoCaja;
    this.printAperturaTurno = printAperturaTurno;
    this.printCierreTurno = printCierreTurno;
    this.printNotaVenta = printNotaVenta;
    this.printReciboPago = printReciboPago;
    this.printReciboPagosRent = printReciboPagosRent;
    this.printRecibosPagos = printRecibosPagos
  }
}