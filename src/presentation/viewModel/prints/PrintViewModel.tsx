import { PrintUseCases } from "../../../domain/useCases/prints/PrintUseCases";

export class PrintViewModel {
  private printUseCases: PrintUseCases;
  constructor({printUseCases}:{printUseCases:PrintUseCases}){
    this.printUseCases = printUseCases
  }
  async printMovimientoCaja(id:number):Promise<void>{
    return await this.printUseCases.printMovimientoCaja.execute(id);
  }
  async printAperturaTurno(id:number):Promise<void>{
    return await this.printUseCases.printAperturaTurno.execute(id);
  }
  async printCierreTurno(id:number):Promise<void>{
    return await this.printUseCases.printCierreTurno.execute(id);
  }
}