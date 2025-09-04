import { asClass, createContainer } from "awilix";
import { CalendarService } from "../data/sources/remote/services/CalendarService";
import { CalendarRepositoryImpl } from "../data/repository/CalendarRepositoryImpl";
import { CalendarUseCases } from "../domain/useCases/calendar/CalendarCases";
import { CalendarViewModel } from "../presentation/viewModel/CalendarViewModel";
import { getFeriadosMesUseCase } from "../domain/useCases/calendar/GetFeriadosMesUseCase";
import { getCalendarioByAnioUseCase } from "../domain/useCases/calendar/GetCalendarioByAnioUseCase";
import { poblarCalendarioPorAnioUseCase } from "../domain/useCases/calendar/PoblarCalendarioPorAñoUseCase";
import { poblarCalendarioPorMesUseCase } from "../domain/useCases/calendar/PoblarCalendarioPorMesUseCase";
import { UpdateDateUseCase } from "../domain/useCases/calendar/UpdateDateUseCase";

const calendarContainer = createContainer();
calendarContainer.register({
  // SERVICES
  calendarService:asClass(CalendarService).singleton(),
  //REPOSITORY
  calendarRepository:asClass(CalendarRepositoryImpl).singleton(),
  //USE CASE
  calendarUseCases:asClass(CalendarUseCases).singleton(),
  getFeriadosMes:asClass(getFeriadosMesUseCase).singleton(),
  getCalendarioByAnio:asClass(getCalendarioByAnioUseCase).singleton(),
  poblarCalendarioPorAnio:asClass(poblarCalendarioPorAnioUseCase).singleton(),
  poblarCalendarioPorMes:asClass(poblarCalendarioPorMesUseCase).singleton(),
  updateDate:asClass(UpdateDateUseCase).singleton(),
  // VIEW NOMDEL
  calendarViewModel:asClass(CalendarViewModel).singleton(),
  
})
export {calendarContainer};