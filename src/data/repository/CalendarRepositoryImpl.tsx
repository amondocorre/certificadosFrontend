import { ErrorResponse } from "../../domain/models/ErrorResponse";
import { CalendarResponse, DiaCalendario} from "../../domain/models/CalendarModel";
import { CalendarRepository } from "../../domain/repository/CalendarRepositoty";
import { CalendarService } from "../sources/remote/services/CalendarService";

export class CalendarRepositoryImpl implements CalendarRepository{
  private calendarService:CalendarService;
  constructor({calendarService,}:{calendarService:CalendarService}){
    this.calendarService = calendarService;
  }
  async getFeriadosMes(): Promise<CalendarResponse | ErrorResponse> {
    return await this.calendarService.getFeriadosMes();
  }
  async getCalendarioByAnio(anio:number): Promise<CalendarResponse | ErrorResponse> {
    return await this.calendarService.getCalendarioByAnio(anio);
  }
  async poblarCalendarioPorAnio(anio:number): Promise<CalendarResponse | ErrorResponse> {
    return await this.calendarService.poblarCalendarioPorAnio(anio);
  }
  async poblarCalendarioPorMes(anio:number,mes:string): Promise<CalendarResponse | ErrorResponse> {
    return await this.calendarService.poblarCalendarioPorMes(anio,mes);
  }
  async updateDate(diaCalendario:DiaCalendario): Promise<CalendarResponse | ErrorResponse> {
    return await this.calendarService.updateDate(diaCalendario);
  }
}
