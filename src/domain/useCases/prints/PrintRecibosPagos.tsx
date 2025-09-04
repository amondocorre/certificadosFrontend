import { PrintRepository } from "../../repository/prints/PrintRepository";

export class PrintRecibosPagosUseCase {
  private printRepository: PrintRepository;
  constructor({printRepository}:{printRepository:PrintRepository}){
    this.printRepository = printRepository; 
  }
  async execute(ids:number[]):Promise<void>{
    return await this.printRepository.printRecibosPagos(ids);
  }
}