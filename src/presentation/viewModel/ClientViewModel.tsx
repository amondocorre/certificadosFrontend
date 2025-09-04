
import { Client, ClientResponse } from '../../domain/models/ClientModel';
import { ErrorResponse } from '../../domain/models/ErrorResponse';
import { ClientUseCases } from '../../domain/useCases/client/ClientUseCases';
export class ClientViewModel {
  private clientUseCases: ClientUseCases;
  constructor({clientUseCases}:{clientUseCases:ClientUseCases}){
    this.clientUseCases = clientUseCases
  }
  async findAll():Promise<ClientResponse|ErrorResponse>{
    return await this.clientUseCases.findAll.execute()
  }
  async findActive():Promise<ClientResponse|ErrorResponse>{
    return await this.clientUseCases.findActive.execute()
  }
  async create(client:Client):Promise<ClientResponse|ErrorResponse>{
    return await this.clientUseCases.create.execute(client)
  }
  async update(client:Client):Promise<ClientResponse|ErrorResponse>{
    return await this.clientUseCases.update.execute(client)
  }
  async delete(id:number):Promise<ClientResponse|ErrorResponse>{
    return await this.clientUseCases.deleteClient.execute(id)
  }
  async activate(id:number):Promise<ClientResponse|ErrorResponse>{
    return await this.clientUseCases.activate.execute(id)
  }
}