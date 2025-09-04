
import { Client, ClientResponse } from "../../models/ClientModel";
import { ErrorResponse } from "../../models/ErrorResponse";
import { ClientRepository } from "../../repository/ClientRepositoty";

export class UpdateUseCase {
  private clientRepository: ClientRepository;
  constructor({clientRepository}:{clientRepository:ClientRepository}){
    this.clientRepository = clientRepository; 
  }
  async execute(client:Client):Promise<ClientResponse|ErrorResponse>{
    return await this.clientRepository.update(client);
  }
}