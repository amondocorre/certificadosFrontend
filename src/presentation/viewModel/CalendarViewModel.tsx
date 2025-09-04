
import { ErrorResponse } from '../../domain/models/ErrorResponse';
import { CalendarResponse, DiaCalendario} from '../../domain/models/CalendarModel';
import { CalendarUseCases } from '../../domain/useCases/calendar/CalendarCases';
export class CalendarViewModel {
  private calendarUseCases: CalendarUseCases;
  constructor({calendarUseCases}:{calendarUseCases:CalendarUseCases}){
    this.calendarUseCases = calendarUseCases
  }
  async getFeriadosMes():Promise<CalendarResponse|ErrorResponse>{
    return await this.calendarUseCases.getFeriadosMes.execute()
  }
  async getCalendarioByAnio(anio:number):Promise<CalendarResponse|ErrorResponse>{
    return await this.calendarUseCases.getCalendarioByAnio.execute(anio)
  }
  async poblarCalendarioPorAnio(anio:number):Promise<CalendarResponse|ErrorResponse>{
    return await this.calendarUseCases.poblarCalendarioPorAnio.execute(anio)
  }
  async poblarCalendarioPorMes(anio:number,mes:string):Promise<CalendarResponse|ErrorResponse>{
    return await this.calendarUseCases.poblarCalendarioPorMes.execute(anio,mes)
  }
  async updateDate(diaCalendario:DiaCalendario):Promise<CalendarResponse|ErrorResponse>{
    return await this.calendarUseCases.updateDate.execute(diaCalendario)
  }
}
