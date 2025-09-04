
import { Client, ClientResponse } from "../../models/ClientModel";
import { ErrorResponse } from "../../models/ErrorResponse";
import { ClientRepository } from "../../repository/ClientRepositoty";

export class CreateUseCase {
  private clientRepository: ClientRepository;
  constructor({clientRepository}:{clientRepository:ClientRepository}){
    this.clientRepository = clientRepository; 
  }
  async execute(client:Client):Promise<ClientResponse|ErrorResponse>{
    return await this.clientRepository.create(client);
  }
}