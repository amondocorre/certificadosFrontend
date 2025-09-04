
import { ErrorResponse } from "../../models/ErrorResponse";
import { CalendarResponse } from "../../models/CalendarModel";
import { CalendarRepository } from "../../repository/CalendarRepositoty";

export class getFeriadosMesUseCase {
  private calendarRepository: CalendarRepository;
  constructor({calendarRepository}:{calendarRepository:CalendarRepository}){
    this.calendarRepository = calendarRepository; 
  }
  async execute():Promise<CalendarResponse|ErrorResponse>{
    return await this.calendarRepository.getFeriadosMes();
  }
}