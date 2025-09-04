 import { asClass, createContainer } from "awilix";
import { PrintService } from "../../data/sources/remote/services/prints/PrintService";
import { PrintRepositoryImpl } from "../../data/repository/prints/PrintRepositoryImpl";
import { PrintUseCases } from "../../domain/useCases/prints/PrintUseCases";
import { PrintMovimientoCajaUseCase } from "../../domain/useCases/prints/PrintMovimientoCajaUseCase";
import { PrintViewModel } from "../../presentation/viewModel/prints/PrintViewModel";
import { PrintCierreTurnoUseCase } from "../../domain/useCases/prints/PrintCierreTurno";
import { PrintAperturaTurnoUseCase } from "../../domain/useCases/prints/PrintAperturaTurno";
import { PrintNotaVentaUseCase } from "../../domain/useCases/prints/PrintNotaVenta";
import { PrintReciboPagoUseCase } from "../../domain/useCases/prints/PrintReciboPago";
import { printReciboPagosRentUseCase } from "../../domain/useCases/prints/printReciboPagosRent";
import { PrintRecibosPagosUseCase } from "../../domain/useCases/prints/printRecibosPagos";

 const printContainer = createContainer();
 printContainer.register({
   // SERVICES
   printService:asClass(PrintService).singleton(),
   //REPOSITORY
   printRepository:asClass(PrintRepositoryImpl).singleton(),
   //USE CASE
   printUseCases:asClass(PrintUseCases).singleton(),
   printMovimientoCaja:asClass(PrintMovimientoCajaUseCase).singleton(),
   printAperturaTurno:asClass(PrintAperturaTurnoUseCase).singleton(),
   printCierreTurno:asClass(PrintCierreTurnoUseCase).singleton(),
   printNotaVenta:asClass(PrintNotaVentaUseCase).singleton(),
   printReciboPago:asClass(PrintReciboPagoUseCase).singleton(),
   printRecibosPagos:asClass(PrintRecibosPagosUseCase).singleton(),
   printReciboPagosRent:asClass(printReciboPagosRentUseCase).singleton(),
   // VIEW NOMDEL
   printViewModel:asClass(PrintViewModel).singleton(),
   
 })
 export {printContainer};