import { PrintRepository } from "../../repository/prints/PrintRepository";

export class printReciboPagosRentUseCase {
  private printRepository: PrintRepository;
  constructor({printRepository}:{printRepository:PrintRepository}){
    this.printRepository = printRepository; 
  }
  async execute(id:number):Promise<void>{
    return await this.printRepository.printReciboPago(id);
  }
}