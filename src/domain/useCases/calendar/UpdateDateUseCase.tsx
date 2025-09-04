
import { DiaCalendario } from "../../models/CalendarModel";
import { ErrorResponse } from "../../models/ErrorResponse";
import { RentResponse } from "../../models/RentModel";
import { CalendarRepository } from "../../repository/CalendarRepositoty";
export class UpdateDateUseCase {
  private calendarRepository: CalendarRepository;
  constructor({calendarRepository}:{calendarRepository:CalendarRepository}){
    this.calendarRepository = calendarRepository; 
  }
  async execute(diaCalendario:DiaCalendario):Promise<RentResponse|ErrorResponse>{
    return await this.calendarRepository.updateDate(diaCalendario);
  }
}