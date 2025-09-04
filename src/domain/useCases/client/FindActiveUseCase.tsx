
import { ClientResponse } from "../../models/ClientModel";
import { ErrorResponse } from "../../models/ErrorResponse";
import { ClientRepository } from "../../repository/ClientRepositoty";

export class FindActiveUseCase {
  private clientRepository: ClientRepository;
  constructor({clientRepository}:{clientRepository:ClientRepository}){
    this.clientRepository = clientRepository; 
  }
  async execute():Promise<ClientResponse|ErrorResponse>{
    return await this.clientRepository.findActive();
  }
}