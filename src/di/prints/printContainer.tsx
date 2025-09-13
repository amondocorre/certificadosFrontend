 import { asClass, createContainer } from "awilix";
import { PrintService } from "../../data/sources/remote/services/prints/PrintService";
import { PrintRepositoryImpl } from "../../data/repository/prints/PrintRepositoryImpl";
import { PrintUseCases } from "../../domain/useCases/prints/PrintUseCases";
import { PrintMovimientoCajaUseCase } from "../../domain/useCases/prints/PrintMovimientoCajaUseCase";
import { PrintViewModel } from "../../presentation/viewModel/prints/PrintViewModel";
import { PrintCierreTurnoUseCase } from "../../domain/useCases/prints/PrintCierreTurno";
import { PrintAperturaTurnoUseCase } from "../../domain/useCases/prints/PrintAperturaTurno";

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
   // VIEW NOMDEL
   printViewModel:asClass(PrintViewModel).singleton(),
   
 })
 export {printContainer};