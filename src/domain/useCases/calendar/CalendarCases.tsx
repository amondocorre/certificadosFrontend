import { getCalendarioByAnioUseCase } from "./GetCalendarioByAnioUseCase";
import { getFeriadosMesUseCase } from "./GetFeriadosMesUseCase";
import { poblarCalendarioPorAnioUseCase } from "./poblarCalendarioPorAnioUseCase";
import { poblarCalendarioPorMesUseCase } from "./PoblarCalendarioPorMesUseCase";
import { UpdateDateUseCase } from "./UpdateDateUseCase";

export class CalendarUseCases{
getFeriadosMes:getFeriadosMesUseCase;
getCalendarioByAnio:getCalendarioByAnioUseCase
poblarCalendarioPorAnio:poblarCalendarioPorAnioUseCase;
poblarCalendarioPorMes:poblarCalendarioPorMesUseCase;
updateDate:UpdateDateUseCase
  constructor({
    getFeriadosMes,
    getCalendarioByAnio,
    poblarCalendarioPorAnio,
    poblarCalendarioPorMes,
    updateDate
  }:{
    getFeriadosMes:getFeriadosMesUseCase,
    getCalendarioByAnio:getCalendarioByAnioUseCase,
    poblarCalendarioPorAnio:poblarCalendarioPorAnioUseCase,
    poblarCalendarioPorMes:poblarCalendarioPorMesUseCase,
    updateDate:UpdateDateUseCase
  }){
  this.getFeriadosMes = getFeriadosMes;
  this.getCalendarioByAnio = getCalendarioByAnio;
  this.poblarCalendarioPorAnio = poblarCalendarioPorAnio;
  this.poblarCalendarioPorMes = poblarCalendarioPorMes;
  this.updateDate = updateDate;
  }
}