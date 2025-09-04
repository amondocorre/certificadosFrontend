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
  async printNotaVenta(id:number): Promise<void> {
    return await this.printService.printNotaVenta(id);
  }
  async printReciboPago(id:number): Promise<void> {
    return await this.printService.printReciboPago(id);
  }
  async printRecibosPagos(ids:number[]): Promise<void> {
    return await this.printService.printRecibosPagos(ids);
  }
  async printReciboPagosRent(id:number): Promise<void> {
    return await this.printService.printReciboPagosRent(id);
  }
}