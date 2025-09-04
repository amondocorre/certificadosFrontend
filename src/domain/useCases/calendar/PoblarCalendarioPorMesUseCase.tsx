
import { ErrorResponse } from "../../models/ErrorResponse";
import { RentResponse } from "../../models/RentModel";
import { CalendarRepository } from "../../repository/CalendarRepositoty";
export class poblarCalendarioPorMesUseCase {
  private calendarRepository: CalendarRepository;
  constructor({calendarRepository}:{calendarRepository:CalendarRepository}){
    this.calendarRepository = calendarRepository; 
  }
  async execute(anio:number,mes:string):Promise<RentResponse|ErrorResponse>{
    return await this.calendarRepository.poblarCalendarioPorMes(anio,mes);
  }
}