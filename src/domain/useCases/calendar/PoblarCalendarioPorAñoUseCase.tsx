
import { ErrorResponse } from "../../models/ErrorResponse";
import { CalendarResponse } from "../../models/CalendarModel";
import { CalendarRepository } from "../../repository/CalendarRepositoty";

export class poblarCalendarioPorAnioUseCase {
  private calendarRepository: CalendarRepository;
  constructor({calendarRepository}:{calendarRepository:CalendarRepository}){
    this.calendarRepository = calendarRepository; 
  }
  async execute(anio:number):Promise<CalendarResponse|ErrorResponse>{
    return await this.calendarRepository.poblarCalendarioPorAnio(anio);
  }
}