import { PrintRepository } from "../../../domain/repository/prints/PrintRepository";
import { PrintService } from "../../sources/remote/services/prints/PrintService";

export class PrintRepositoryImpl implements PrintRepository{
  private printService:PrintService;
  constructor({printService,}:{printService:PrintService}){
      this.printService = printService;
  }
  async printMovimientoCaja(id:number): Promise<void> {
    return await this.printService.printMovimientoCaja(id);
  }
  async printAperturaTurno(id:number): Promise<void> {
    return await this.printService.printAperturaTurno(id);
  }
  async printCierreTurno(id:number): Promise<void> {
    return await this.printService.printCierreTurno(id);
  }
  async printEvaMedical(id:number): Promise<void> {
    return await this.printService.printEvaMedical(id);
  }
  async printEvaPsychological(id:number): Promise<void> {
    return await this.printService.printEvaPsychological(id);
  }
  async printInfEvaPsychological(id:number): Promise<void> {
    return await this.printService.printInfEvaPsychological(id);
  }
}